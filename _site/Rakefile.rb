require 'yaml'
require 'uri'
require 'json'
require 'nokogiri'
require 'kramdown'
# use Jekyll configuration file
CONFIG = YAML.load_file("_config.yml")
URL_LAYOUT_DEFAULT = "../_layouts/default.html"
URL_LAYOUT_HOME = "../_layouts/home.html"
URL_MENU_FILE = "_Sidebar.md"
task default: :build_dev


#-----------------------------------------
#                TOOLS
#-----------------------------------------
def check_configuration
  if CONFIG['wikiToJekyll'].nil? or CONFIG['wikiToJekyll'].empty?
    raise "Please set your configuration in _config.yml. See the readme."
  end
end
def build_jekyll
  system 'jekyll build'
end

def deploy
    puts "deploying"
    open(".gitignore", 'w') do |gitPage|
        gitPage.puts "vendor/*"
    end
    system 'git remote add origin https://hqnghi88:$HQN_KEY@github.com/gama-platform/gama-platform.github.io.git'
    system 'git config user.name "Travis CI"'
    system 'git config user.email "travis@travis-ci.org"'
    system "git add -A"
    message = "Site wiki update #{Time.now.utc}"
    puts "\n## :Committing => #{message}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing website"
    system "git push origin --quiet"
    puts "\n## Github Pages deploy complete"
end

def count_em(string, substring)
  string.scan(/(?=#{substring})/).count
end
def g(key)
  CONFIG['wikiToJekyll'][ key ]
end
def wikisubfunction
  puts "adding wiki as submodule"
  check_configuration
  wiki_repository = get_wiki_repository_url
  command = 'git submodule add ' + wiki_repository + ' ' + g('wiki_source')
  command += ' && git submodule init'
  command += ' && git submodule update'

  output = `#{command}`
  puts output
  if output.include? 'failed'
    abort("submodule add failed : verify you configuration and that your wiki is public") # exit
  end

  puts "wiki submodule OK"
end
def get_wiki_repository_url
  
  #derived_url = ':https =>//github.com/' + g('user_name') + '/' + g('repository_name') + '.wiki.git'
  
  url = g('wiki_repository_url') #|| derived_url
  
end

def update_wiki_submodule
#  cd g('wiki_source') do
    pullCommand = 'git submodule foreach git pull origin master'
    puts "Updating wiki submodule"
    output = `#{pullCommand}`

    if output.include? 'Already up-to-date'
      puts "No update necessary" # exit
    end
    puts output
  end
#end
def wikibuildfunction
  clean_wiki_folders
  copy_wiki_pages
  build_jekyll
end

#-----------------------------------------
#     Clean the destination folder
#-----------------------------------------
def clean_wiki_folders
  puts "Trying to clean the wiki"
  if File.exist?(g('wiki_dest'))
    #puts "Removing Folder "+g('wiki_dest')
    removeFolder("")    
  end
  #puts "Creating Folder "+g('wiki_dest')
  FileUtils.mkdir(g('wiki_dest'))
end

def removeFolder(folder)
  puts "Inside "+folder
  Dir.glob(File.join("#{g('wiki_dest')}",folder,"/*.md")) do |wikiPage|
    #puts "Removing Page : "+wikiPage
    FileUtils.rm_rf(wikiPage)
  end
  FileUtils.rm_rf(File.join("#{g('wiki_dest')}",folder))
  #puts "Removing Folder : "+folder
end


#-----------------------------------------
#    Copy the wiki pages and resources
#-----------------------------------------
def copy_wiki_pages
  index = []
  puts "--------------------FINDING PAGES--------------------"
  findPages("",index)
  puts "--------------------COPYING RESOURCES--------------------"
  copyResources()
  puts "--------------------GENERATING MENU--------------------"
  defineLayoutMenu()
  
  File.open("./indexes/lunr.json","w") do |f|
    f.write(JSON.generate(index))
  end
end
def copyResources()
  folderResources = "resources"
  findResources(folderResources)
end
def findResources(folder)
  #puts "Looking for resources in "+folder
  FileUtils.mkdir(File.join("#{g('wiki_dest')}",folder))
  subdir_list = Dir.entries(File.join("#{g('wiki_source')}",folder)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folder,entry) and !(entry =='.'||entry =='.git' || entry == '..') }
  subdir_list.each do |subfolder|
    findResources(File.join(folder,subfolder))
  end
  Dir.glob(File.join("#{g('wiki_source')}",folder,"[A-Za-z]*.*")) do |aResource|
    #puts "Copying Resource : "+aResource+" to "+File.join("#{g('wiki_dest')}",folder,File.basename(aResource))
    FileUtils.chmod(0777, aResource)
    FileUtils.cp_r(aResource,File.join("#{g('wiki_dest')}",folder,File.basename(aResource)))
  end
end
def findPages(folder,index)
  #puts "Looking for pages in "+folder
  subdir_list = Dir.entries(File.join("#{g('wiki_source')}",folder)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folder,entry) and !(entry =='.'||entry =='.git' || entry == '..' || entry =="resources") }
  subdir_list.each do |subfolder|
    findPages(File.join(folder,subfolder),index)
  end
  Dir.glob(File.join("#{g('wiki_source')}",folder,"*.*")) do |aFile|
    wikiPageFileName = File.basename(aFile).gsub(" ","-")
    wikiPagePath     = File.join("#{g('wiki_dest')}", wikiPageFileName)
    #puts "Copying Page :  "+aFile+" to "+wikiPagePath
    if(File.extname(aFile)==".md")
          
          # remove extension
          wikiPageName    = wikiPageFileName.sub(/.[^.]+\z/,'')
          wikiPageTitle = File.basename(wikiPageName)
          File.foreach(aFile) do |line|
            if(line.include? "#")and(line[0]=="#")
              wikiPageTitle = line.gsub("\#","")
              wikiPageTitle = wikiPageTitle.gsub("\n","")
              if(wikiPageTitle[0]!=" ")
                wikiPageTitle=" "+wikiPageTitle
              end
              break
            end
          end 
          fileContent      = File.read(aFile)
          fileHTML=Kramdown::Document.new(fileContent).to_html
          doc = Nokogiri::HTML(fileHTML)
          text = doc.xpath("//text()").text.to_s
          text = text.encode('UTF-8', :invalid => :replace, :undef => :replace)
          text = text.gsub("\\t"," ")
          text = text.gsub("\"","")
          text = text.gsub("\n"," ")
          text = text.gsub("\r"," ")
          text = text.gsub("\""," ")
          text = text.gsub("\'"," ")
          text = text.gsub("'"," ")
          text = text.gsub("\\r"," ")
          text = text.gsub("           "," ")
          text = text.gsub("        "," ")
          text = text.gsub("*.\s.*"," ")
          text = text.gsub("\t"," ")
          text = text.gsub("\“"," ")
          text = text.gsub("\‘"," ")
          text = text.gsub("\’"," ")
          text = text.gsub("\”"," ")
          text = text.gsub("\`"," ")
          index<<{"id"=>wikiPagePath,"title"=>wikiPageTitle,"content"=>text,"url"=>wikiPagePath}
          folderString = File.join("#{g('wiki_dest')}",folder)
          # write the new file with yaml front matter
          open(wikiPagePath, 'w') do |newWikiPage|
            newWikiPage.puts "---"
            newWikiPage.puts "layout: default"
            newWikiPage.puts "title:#{wikiPageTitle}"
            # used to transform links
            newWikiPage.puts "wikiPageName: #{wikiPageName}"
            newWikiPage.puts "wikiPagePath: #{wikiPagePath}"
            # used to generate a wiki specific menu. see readme
            newWikiPage.puts "---"
            newWikiPage.puts fileContent
          end
          if(File.basename(aFile)=="Operators.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|operator\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"operator_")
                tmp_index<<{"id"=>strOcc,"title"=>"operator : "+strOcc, "url"=>"/wiki/Operators#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.operators.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="BuiltInArchitectures.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|architecture\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"architecture_")
                tmp_index<<{"id"=>strOcc,"title"=>"architecture : "+strOcc, "url"=>"/wiki/BuiltInArchitectures#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.architectures.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="BuiltInSkills.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|skill\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"skill_")
                tmp_index<<{"id"=>strOcc,"title"=>"skill : "+strOcc, "url"=>"/wiki/BuiltInSkills#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.skills.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="BuiltInSpecies.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|species\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"species_")
                tmp_index<<{"id"=>strOcc,"title"=>"species : "+strOcc, "url"=>"/wiki/BuiltInSpecies#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.species.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="DataTypes.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|type\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"type_")
                tmp_index<<{"id"=>strOcc,"title"=>"type : "+strOcc, "url"=>"/wiki/DataTypes#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.types.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="Literals.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|concept\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"concept_")
                tmp_index<<{"id"=>strOcc,"title"=>"concept : "+strOcc, "url"=>"/wiki/Literals#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.literals.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="Statements.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|statement\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"statement_")
                tmp_index<<{"id"=>strOcc,"title"=>"statement : "+strOcc, "url"=>"/wiki/Statements#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.statements.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
          if(File.basename(aFile)=="UnitsAndConstants.md")
            tmp_index=[]
            fileContent.scan(/.*(\[\/\/\]:\s\#\s\(keyword\|constant\_.*\))/) do |anOccurence|
                strOcc = clearFromCharacterForJson(anOccurence,"constant_")
                tmp_index<<{"id"=>strOcc,"title"=>"constant : "+strOcc, "url"=>"/wiki/UnitsAndConstants#"+strOcc, "content"=>strOcc}
            end
            File.open("./indexes/lunr.constants.json","w") do |f|
                f.write(tmp_index.to_json)
            end
          end
    else
      FileUtils.cp(aFile,wikiPagePath)
    end
  end
end
def clearFromCharacterForJson(anOccurence,removable)
    strOcc = anOccurence.to_s
    strOcc = strOcc.sub("\"","")
    strOcc = strOcc.sub("\"","")
    strOcc = strOcc.sub("\[","")
    strOcc = strOcc.sub("\[","")
    strOcc = strOcc.sub("\]","")
    strOcc = strOcc.sub("\]","")
    strOcc = strOcc.sub("\(","")
    strOcc = strOcc.sub("\)","")
    strOcc = strOcc.sub("\#","")
    strOcc = strOcc.sub("\:","")
    strOcc = strOcc.sub("\/","")
    strOcc = strOcc.sub("\/","")
    strOcc = strOcc.sub(" ","")
    strOcc = strOcc.sub(" ","")
    strOcc = strOcc.sub("keyword","")
    strOcc = strOcc.sub(removable,"")
    strOcc = strOcc.sub("|","")
    return strOcc
end
#-----------------------------------------
#      Creation of the Menu Layout
#-----------------------------------------
def defineLayoutMenu
  #puts "Removing Old Menu and Home Layout"
  rm_rf File.join("#{g('wiki_source')}",URL_LAYOUT_DEFAULT)
  #puts "Generating New Menu"
  open(File.join("#{g('wiki_source')}",URL_LAYOUT_DEFAULT), 'w') do |newLayout|
    newLayout.puts '
    <!doctype html><html lang="en"><head><meta charset="utf-8"><title>{{ page.title }}</title></head>
    <body>
    {% include style.html %}
    {% include menu.html %}
    '
    oldUnder=-1
    File.foreach(File.join("#{g('wiki_source')}",URL_MENU_FILE)) do |line|
      currentUnder = count_em(line,"#")
      #Fils du courant
      if(currentUnder>0)
        if(oldUnder==-1)
          newLayout.puts '
    <div class="w3-row-padding w3-container">
        <div>
             <div class="w3-quarter">
                <div class="w3-twothird">
		<nav class="w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left w3-small w3-round w3-blue"  style="z-index:3;margin-left:10px" id="mySidebar">
                    <div class="w3-medium w3-text-white w3-margin-left" style="font-weight:bold"><div id="sub" class="w3-padding-small w3-bar-block w3-small">'
          
          title=line.gsub("#","")
          newLayout.puts "<h4>"+linkup(title)+"</h4><br/>"
          oldUnder=1
        else
          newLayout.puts "</div>      <div id='sub' class=' w3-padding-small w3-bar-block w3-small'>"
          title=line.gsub("#","")
          newLayout.puts "<h4>"+linkup(title)+"</h4><br/>"
        end
      else
          title=line.gsub("#","")
          ind = 0
          strSpace =""
          while ind < getNbWSpacesBeforeCharacter(title)  do
            ind=ind+1
            strSpace=strSpace+"-"
          end
          newLayout.puts strSpace+" "+linkup(title)+"<br/>"
      end
      
    end
    newLayout.puts '</div></div></div></nav></div>
    <div class="w3-twothird w3-margin-left">
    <div class="w3-threequarter">
        {{ content }}
    </div>
    </div>
    </div>
    </div>
    </body></html>'
  end
  
 
end
def getNbWSpacesBeforeCharacter(str)
    nbSpace=0
    str.split("").each do |i|
        if(i==" ")
            nbSpace=nbSpace+1
        else
            break
        end
    end
    return nbSpace
end
def linkup( str )
    nbBrackets=-1
    posStarting=-1
    posEnding=-1
    nbCount=-1
    str.split("").each do |i|
        nbCount=nbCount+1
        if(i=="[")
            nbBrackets=nbBrackets+1
            if(nbBrackets==0)
                posStarting=nbCount
            end
        end
        if(i=="]")
            nbBrackets=nbBrackets-1
            if(nbBrackets==-1)
                posEnding=nbCount
            end
        end
    end
    label = str[posStarting+1..posEnding-1]
    
    nbParenthesis=-1
    posParenthesisStarting=posEnding+1
    posParenthesisEnding=-1
    nbCount=posEnding+1
    
    str[posEnding+1..str.length()].split("").each do |i|
        nbCount=nbCount+1
        if(i=="(")
            nbParenthesis=nbParenthesis+1
            if(nbParenthesis==0)
                posParenthesisStarting=nbCount
            end
        end
        if(i==")")
            nbParenthesis=nbParenthesis-1
            if(nbParenthesis==-1)
                posParenthesisEnding=nbCount
            end
        end
    end
    link = str[posParenthesisStarting..posParenthesisEnding-2]
    if(posStarting==-1)
        str=label
    else
        str='<a href="/wiki/'+link+'">'+label+'</a>'
    end
end
#-----------------------------------------
#               Tasks
#-----------------------------------------
#Function to synchronise the git
task :wiki do |t|
    puts "Checking Configuration"
    check_configuration
    puts "Adding Submodule"
    wikisubfunction
    puts "Updating Submodule"
    update_wiki_submodule
    puts "Executing Wikibuild"
    wikibuildfunction
    command = 'git rm -r --cached _wiki'
    output = `#{command}` 
    
    #puts "Deploying"
    #deploy
    open(".gitignore", 'w') do |gitPage|
        gitPage.puts "vendor/*"
        gitPage.puts ".bundle/*"
    end
    puts "Wiki synchronisation success !"
end
#Function to add the git of the wiki to a folder
task :wikisub do |t|
  wikisubfunction
end

task :wikiupdate do |t|
    update_wiki_submodule
end

#Function to build the wiki
task :wikibuild do |t|
  puts ':rake =>wikibuild'
  wikibuildfunction
end



task :prod do |t|
  puts "Building with production parameters"
  sh 'jekyll build'
end

task :deploy do |t|
    deploy
end
