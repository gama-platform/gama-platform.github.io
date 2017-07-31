---
layout: with_news
title: News
---
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
