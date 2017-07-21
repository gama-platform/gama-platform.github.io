---
layout: other
title: News
---

<div  class="w3-quarter w3-round-large w3-margin-left w3-padding-16">
        <div class="w3-white w3-border w3-border-grey w3-margin-left w3-twothird">
                <div class="w3-row" id="tabMenuNews">
                    <div class="w3-col l3 m3 s3 w3-center  w3-white">
                        <i id="facebook" class='fa fa-2x fa-facebook-official w3-text-blue' aria-hidden='true' onclick='facebook();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i id="commits" class='fa fa-2x fa-git w3-text-white' aria-hidden='true' onclick='commits();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i id="issues" class='fa fa-2x fa-github w3-text-white' aria-hidden='true' onclick='issues();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i id="google" class='fa fa-2x fa-google w3-text-white' aria-hidden='true' onclick='google();'></i>
                    </div>
               </div>
               <div id="quotes" class="w3-white w3-small w3-margin">
               </div>
        </div>
        <div class="w3-white w3-border w3-border-grey w3-margin w3-twothird w3-padding-16">
            <span class="w3-center  w3-margin"><h3>Mailing list</h3></span>
                <p class="w3-small">Users - gama-platform@googlegroups.com<br/>
                Developers - gama-dev@googlegroups.com</p>
        </div>
    
        <div class="w3-white w3-border w3-border-grey w3-margin w3-twothird w3-padding-16">
            <span class="w3-center"><h3>Follow Us</h3></span>
                <p class="w3-small w3-margin">Facebook - gama-platform@googlegroups.com<br/>
                    Youtube - gama-dev@googlegroups.com <br/>
                    LinkedIn - <br/>
                    Twitter <br/>
                </p>
        </div>
 </div>
<div class="w3-row-padding w3-container w3-threequarter w3-content">
    <h2> News </h2>
    <div >
    	{% for post in site.posts %}
            
        <div class="w3-margin-left w3-margin-bottom">
          <table>
            <tr>
              <td>
          <img src="{{post.image}}" alt="Gama Post" style="width:100px; height:100px" >
            </td><td><a href="{{ post.url }}">{{ post.title }}</a><small>   <strong><span class="w3-border w3-border-light-gray w3-text-deep-purple w3-light-gray w3-round-small">{{ post.date | date: "%B %e, %Y" }} -  {{ post.author }}</span></strong> </small>			
          </td>
            </tr>
        </table><div class=" w3-margin span10 w3-text-black w3-white w3-round-large w3-border w3-border-blue">
                <p class="w3-margin"><small>{{ post.content | strip_html | truncatewords: 80 }} <a href="{{ post.url }}">See more</a></small>
                </p>
          </div>
        </div>	
        {% endfor %}	
    </div>
</div>
<script>
   var nbWords = 20
   function truncate(str, no_words) 
   {
        return str.split(" ").splice(0,no_words).join(" ");
   }
  $( document ).ready(function() 
  {
    facebook();
  });
  function facebook()
  {
        $.getJSON('https://graph.facebook.com/238065426321929/feed?access_token=229040647557399|MQKFlFYX7YW25XGj4GUYZ7B1lcY', function(data) 
        {
		var ahtml="";
		for(var i = 0; i < 5; i++) 
                {
		
			var d = new Date(data["data"][i]["created_time"]);
			ahtml=ahtml+"<div class=''>";
			if("message" in data["data"][i])
			{
				ahtml=ahtml+"<small><strong class='w3-light-gray w3-text-deep-purple'> "+d.toDateString() + "</strong></small><p>"+truncate(data["data"][i]["message"] , nbWords)+"...<a href='https://facebook.com/"+data["data"][i]["id"].replace("_","/posts/")+ "'>See more</a>";
			}
			else
			{
				ahtml=ahtml+"<small><strong class='w3-light-gray w3-text-deep-purple'> "+d.toDateString() + "</strong></small><p>"+truncate(data["data"][i]["story"] , nbWords)+"...<a href='https://facebook.com/"+data["data"][i]["id"].replace("_","/posts/")+ "'>See more</a>";
			}
			ahtml=ahtml+"</p></div>";
		}
		ahtml=ahtml+"";
		$("#quotes").html(ahtml);
		$("#quotes").linkify();
                $("#tabMenuNews").html("<div class=\"w3-col l3 m3 s3 w3-white w3-center\"><i id=\"facebook\" class=\"fa fa-2x fa-facebook-official w3-text-blue\" aria-hidden=\"true\" onclick=\"facebook();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"commits\" class=\"fa fa-2x fa-git w3-text-white\" aria-hidden=\"true\" onclick=\"commits();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"issues\" class=\"fa fa-2x fa-github w3-text-white\" aria-hidden=\"true\" onclick=\"issues();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center  w3-blue\"><i id=\"google\" class=\"fa fa-2x fa-google w3-text-white\" aria-hidden=\"true\" onclick=\"google();\"></i></div>");
        
	});
  }
  
  function issues()
  {
       		
        $.getJSON('https://api.github.com/repos/gama-platform/gama/issues', function(data) 
        {
                var ahtml="";
                for(var i = 0; i < 5; i++) {
                        ahtml=ahtml+"<div class=''>";
                        var d = new Date(data[i]["created_at"]);
                        ahtml=ahtml+"<small><strong class='w3-light-gray w3-text-deep-purple'> "+d.toDateString() + "</strong></small><p>"+data[i]["title"]+" by "+data[i]["user"]["login"]+" <a href='"+data[i]["html_url"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";
                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
                $("#tabMenuNews").html("<div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"facebook\" class=\"fa fa-2x fa-facebook-official w3-text-white\" aria-hidden=\"true\" onclick=\"facebook();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"commits\" class=\"fa fa-2x fa-git w3-text-white\" aria-hidden=\"true\" onclick=\"commits();\"></i></div><div class=\"w3-col l3 m3 s3 w3-white w3-center\"><i id=\"issues\" class=\"fa fa-2x fa-github w3-text-blue\" aria-hidden=\"true\" onclick=\"issues();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center  w3-blue\"><i id=\"google\" class=\"fa fa-2x fa-google w3-text-white\" aria-hidden=\"true\" onclick=\"google();\"></i></div>");
        
        });
  }
  function commits()
  {
       		
        $.getJSON('https://api.github.com/repos/gama-platform/gama/commits', function(data) 
        {
                var ahtml="";
                for(var i = 0; i < 5; i++) 
                {
                        ahtml=ahtml+"<div class=''>";
                        var d = new Date(data[i]["commit"]["author"]["date"]);
                        ahtml=ahtml+"<small><strong class='w3-light-gray w3-text-deep-purple'> "+d.toDateString() + "</strong></small><p>"+data[i]["commit"]["message"]+" by "+data[i]["commit"]["author"]["name"]+" <a href='"+data[i]["html_url"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";
                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
                $("#tabMenuNews").html("<div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"facebook\" class=\"fa fa-2x fa-facebook-official w3-text-white\" aria-hidden=\"true\" onclick=\"facebook();\"></i></div><div class=\"w3-col l3 m3 s3 w3-white w3-center\"><i id=\"commits\" class=\"fa fa-2x fa-git w3-text-blue\" aria-hidden=\"true\" onclick=\"commits();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"issues\" class=\"fa fa-2x fa-github w3-text-white\" aria-hidden=\"true\" onclick=\"issues();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center  w3-blue\"><i id=\"google\" class=\"fa fa-2x fa-google w3-text-white\" aria-hidden=\"true\" onclick=\"google();\"></i></div>");
        
        });
  }
  
  function google()
  {
       		
        $.getJSON('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fgroups.google.com%2Fforum%2Ffeed%2Fgama-platform%2Ftopics%2Frss.xml%3Fnum%3D15', function(data) 
        {
                var ahtml="";
                for(var i = 0; i < 5; i++) {
                        ahtml=ahtml+"<div class=''>";
                        var d = new Date(data["items"][i]["pubDate"]);
                        ahtml=ahtml+"<small><strong class='w3-light-gray w3-text-deep-purple'> "+d.toDateString() + "</strong></small><p>"+data["items"][i]["title"]+" by "+data["items"][i]["author"]+" <a href='"+data["items"][i]["link"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";

                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
                $("#tabMenuNews").html("<div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"facebook\" class=\"fa fa-2x fa-facebook-official w3-text-white\" aria-hidden=\"true\" onclick=\"facebook();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"commits\" class=\"fa fa-2x fa-git w3-text-white\" aria-hidden=\"true\" onclick=\"commits();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center\"><i id=\"issues\" class=\"fa fa-2x fa-github w3-text-white\" aria-hidden=\"true\" onclick=\"issues();\"></i></div><div class=\"w3-col l3 m3 s3 w3-blue w3-center  w3-white\"><i id=\"google\" class=\"fa fa-2x fa-google w3-text-blue\" aria-hidden=\"true\" onclick=\"google();\"></i></div>");
        });
  }
  
</script>