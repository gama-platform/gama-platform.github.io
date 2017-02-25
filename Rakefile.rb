require 'yaml'
require 'uri'

# use Jekyll configuration file
CONFIG = YAML.load_file("_config.yml")
URL_LAYOUT_DEFAULT = "../_layouts/default.html"
URL_MENU_FILE = "./WebsiteTreeStructure.txt"
task default: :build_dev

# == Helpers ===========================================
def check_configuration
  if CONFIG['wikiToJekyll'].nil? or CONFIG['wikiToJekyll'].empty?
    raise "Please set your configuration in _config.yml. See the readme."
  end
end

# shortener to get configuration parameter
def g(key)
  CONFIG['wikiToJekyll'][ key ]
end

def get_wiki_repository_url
  
  derived_url = ':https =>//github.com/' + g('user_name') + '/' + g('repository_name') + '.wiki.git'
  
  url = g('wiki_repository_url') || derived_url
  
end

# IMPORTANT ++++++++++++++++
# you submodule MUST be added with the :https =>// scheme
# git add submoudle :https =>//github.com/userName/RepositoryName.wiki.git
# otherwise you will have github errors
def update_wiki_submodule
  cd g('wiki_source') do
    pullCommand = 'git pull origin master'
    puts "Updating wiki submodule"
    output = `#{pullCommand}`

    if output.include? 'Already up-to-date'
      abort("No update necessary") # exit
    end
  end
end

def clean_wiki_folders
  if File.exist?(g('wiki_dest'))
    removeFolder("")    
  end
  puts "create the dest dir for wiki pages"
  FileUtils.mkdir(g('wiki_dest'))
end

def removeFolder(folder)
  puts "removing "+File.join("#{g('wiki_dest')}",folder)
  subdir_list=Dir.entries(File.join("#{g('wiki_source')}",folder)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folder,entry) and !(entry =='.'||entry =='.git' || entry == '..') }
  subdir_list.each do |subfolder| 
    removeFolder(File.join(folder,subfolder))
  end
  Dir.glob(File.join("#{g('wiki_dest')}",folder,"/*.md")) do |wikiPage|
    rm_rf wikiPage
  end
  FileUtils.rm_rf(File.join("#{g('wiki_dest')}",folder))
end

def copy_wiki_pages
  findPages("")
  copyResources()
  defineLayoutMenu()
  FileUtils.cp(File.join("#{g('wiki_dest')}","Home.md"),"index.md")
  rm_rf File.join("#{g('wiki_dest')}","Home.md")
end
def copyResources()
  folderResources = "resources"
  FileUtils.mkdir(File.join("#{g('wiki_dest')}",folderResources))
  subdir_list = Dir.entries(File.join("#{g('wiki_source')}",folderResources)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folderResources,entry) and !(entry =='.'||entry =='.git' || entry == '..' || entry =="resources") }
  subdir_list.each do |subfolder|
    findResources(File.join(folderResources,subfolder))
  end
end
def findResources(folder)
  FileUtils.mkdir(File.join("#{g('wiki_dest')}",folder))
  subdir_list = Dir.entries(File.join("#{g('wiki_source')}",folder)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folder,entry) and !(entry =='.'||entry =='.git' || entry == '..') }
  subdir_list.each do |subfolder|
    findResources(File.join(folder,subfolder))
  end
  Dir.glob(File.join("#{g('wiki_source')}",folder,"[A-Za-z]*.*")) do |aResource|
    FileUtils.cp(aResource,File.join("#{g('wiki_dest')}",folder,File.basename(aResource)))
  end
end
def findPages(folder)
  subdir_list = Dir.entries(File.join("#{g('wiki_source')}",folder)).select {|entry| File.directory? File.join("#{g('wiki_source')}",folder,entry) and !(entry =='.'||entry =='.git' || entry == '..' || entry =="resources") }
  subdir_list.each do |subfolder|
    findPages(File.join(folder,subfolder))
  end
  Dir.glob(File.join("#{g('wiki_source')}",folder,"[A-Za-z]*.*")) do |aFile|
    wikiPageFileName = File.basename(aFile).gsub(" ","-")
    wikiPagePath     = File.join("#{g('wiki_dest')}", wikiPageFileName)
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
        newWikiPage.puts ""
        newWikiPage.puts fileContent
      end
    else
      FileUtils.cp(aFile,wikiPagePath)
    end
  end
end
def count_em(string, substring)
  string.scan(/(?=#{substring})/).count
end
def defineLayoutMenu
  
  rm_rf File.join("#{g('wiki_source')}",URL_LAYOUT_DEFAULT)
  open(File.join("#{g('wiki_source')}",URL_LAYOUT_DEFAULT), 'w') do |newLayout|
    newLayout.puts '
    <!doctype html><html lang="en"><head><meta charset="utf-8"><title>{{ page.title }}</title></head>
    <body>
    {% include style.html %}
      <div id="left">'
    oldUnder=-1
    File.foreach(File.join("#{g('wiki_source')}",URL_MENU_FILE)) do |line|
      currentUnder = count_em(line,"-")
      #Fils du courant
      if(currentUnder>oldUnder)
        if(oldUnder==-1)
          newLayout.puts '
		<ul class="mcd-menu"><li><a href="/">Home</a></li><li><a href="/">Discussions</a></li>'
        else
          newLayout.puts "<ul class='sub'>"
        end
        oldUnder=currentUnder
      else
        #Père du courant
        if(currentUnder<oldUnder)
          loop do 
            newLayout.puts "</ul>"
            oldUnder = oldUnder -1
            break if oldUnder==currentUnder
          end
        end
      end
      fileWithName = File.join("#{g('wiki_dest')}","/"+line.gsub("-","")).gsub("\n","")
      title=line
      if(File.exists?(fileWithName+".md"))
        File.foreach(fileWithName+".md") do |row|
          if(row.include? "title:")
            title = row
            break
          end
        end 
        newLayout.puts "<li><a href='/"+fileWithName+"'>"+title.gsub("title: ","")+"</a>"+"</li>"
      else
        newLayout.puts "<li>"+title.gsub("-","")+"</li>"
      end
    end
    newLayout.puts '</ul></ul></div><div id="right">
<h3>Facebook Activities</h3>
<ul id="fbquotes">
</ul>
<h3>Commit Activities</h3>
<ul id="commitquotes">
</ul>
<h3>Issue Activities</h3>
<ul id="issuequotes">
</ul>
<h3>Gama Platform Users Activities</h3>
<ul id="googleusersquotes">
</ul>
</div><div id="content">{{ content }}</div></body></html>'
  end
  
 
end
def build_jekyll
  system 'jekyll build'
end

def deploy
    puts "deploying"
    system "git add -A"
    message = "Site wiki update #{Time.now.utc}"
    puts "\n## :Committing => #{message}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing website"
    system "git push #{g('deploy_remote')} #{g('deploy_branch')}"
    puts "\n## Github Pages deploy complete"
end

# synch repository wiki pages with Jekyll
# needs a public wiki
task :wiki do |t|
    check_configuration
    update_wiki_submodule
    :Rake ::Task[:wikibuild].execute
    if g('commit_and_push') == true
        deploy
    end
    puts "Wiki synchronisation success !"
end

# add wiki as a submodule
task :wikisub do |t|

  puts "adding wiki as submodule"
  check_configuration
  wiki_repository = get_wiki_repository_url
  command = 'git submodule add ' + wiki_repository + ' ' + g('wiki_source')
  command += ' && git submodule init'
  command += ' && git submodule update'
  puts 'command : ' + command

  output = `#{command}`

  if output.include? 'failed'
    abort("submodule add failed : verify you configuration and that your wiki is public") # exit
  end

  puts "wiki submodule OK"
end


task :wikibuild do |t|
  puts ':rake =>wikibuild'
  clean_wiki_folders
  copy_wiki_pages
  build_jekyll
end

task :build_dev do |t|
  puts "Building with dev parameters"
  sh 'jekyll build --config _config.yml,_config_dev.yml --trace'
end

task :prod do |t|
  puts "Building with production parameters"
  sh 'jekyll build'
end

task :deploy do |t|
    deploy
end
