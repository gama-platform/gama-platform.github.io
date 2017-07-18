---
layout: other
title: News
---
<div class="w3-row-padding w3-container w3-twothird w3-content w3-center">
    <div >
    	{% for post in site.posts %}
            {% capture modulo %}{{ forloop.index0 | modulo :3 }}{% endcapture %}
            {% if modulo == '0' and forloop.index0>0%}
            </div>
            <div>
            {% endif %}
        <div class="w3-quarter  w3-margin-left w3-margin-bottom w3-round-large w3-text-white w3-blue w3-border w3-border-blue">
          <img src="{{post.image}}" alt="Gama Post" style="width:100px; height:100px" >
          <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
          <p><small><strong>{{ post.date | date: "%B %e, %Y" }} - {{ post.author }}</strong> -  {{ post.categories| join: ' '  }}  <a href="http://dphilippon.github.io{{ post.url }}"></a></small></p>			
          <div class="span10 w3-text-black w3-white">
                <p>{{ post.content | strip_html | truncatewords: 20 }}
                </p>
          </div>
        </div>	
        {% endfor %}	
    </div>
</div>
<div  class="w3-third w3-round-large w3-white w3-border w3-border-grey">
        
                <div class="w3-row">
                	   <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i class='fa fa-2x fa-facebook-official w3-text-white' aria-hidden='true' onclick='facebook();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i class='fa fa-2x fa-git w3-text-white' aria-hidden='true' onclick='commits();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i class='fa fa-2x fa-github w3-text-white' aria-hidden='true' onclick='issues();'></i>
                    </div>
                    <div class="w3-col l3 m3 s3 w3-blue w3-center">
                        <i class='fa fa-2x fa-google w3-text-white' aria-hidden='true' onclick='google();'></i>
                    </div>
               </div>
               <div id="quotes" class="w3-white">
               </div>
 </div>
<script>
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
				ahtml=ahtml+"<i class='fa  fa-2x fa-facebook-official w3-text-red' aria-hidden='true'></i><small><strong> - "+d.toUTCString() + "</strong></small><p>"+data["data"][i]["message"]+" ";
			}
			else
			{
				ahtml=ahtml+"<i class='fa  fa-2x fa-facebook-official w3-text-red' aria-hidden='true'></i><small><strong> - "+d.toUTCString() + "</strong></small><p>"+data["data"][i]["story"]+" ";
			}
			ahtml=ahtml+"</p></div>";
		}
		ahtml=ahtml+"";
		$("#quotes").html(ahtml);
		$("#quotes").linkify();
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
                        ahtml=ahtml+"<i class='fa  fa-2x fa-github w3-text-red' aria-hidden='true'></i><small><strong> - "+d.toUTCString() + "</strong></small><p>"+data[i]["title"]+" by "+data[i]["user"]["login"]+" <a href='"+data[i]["html_url"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";
                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
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
                        ahtml=ahtml+"<i class='fa  fa-2x fa-git w3-text-red' aria-hidden='true'></i><small><strong> - "+d.toUTCString() + "</strong></small><p>"+data[i]["commit"]["message"]+" by "+data[i]["commit"]["author"]["name"]+" <a href='"+data[i]["html_url"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";
                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
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
                        ahtml=ahtml+"<i class='fa  fa-2x fa-google w3-text-red' aria-hidden='true'></i><small><strong> - "+d.toUTCString() + "</strong></small><p>"+data["items"][i]["title"]+" by "+data["items"][i]["author"]+" <a href='"+data["items"][i]["link"]+"'> See more</a>";
                        ahtml=ahtml+"</p></div>";

                }
                ahtml=ahtml+"";
                $("#quotes").html(ahtml);
                $("#quotes").linkify();
        });
  }
  
</script>