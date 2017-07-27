---
layout: other
title: Download
---
{% include news_side.html %}
<div class="w3-row-padding w3-container w3-threequarter w3-content">
  <div class="w3-content">
        <h3><b>Downloads</b></h3>
  	<div id="releasesquotes" class="w3-medium w3-text-black">
	</div>
   </div>
</div>
<script>
	$(document).ready(function(){
		$.getJSON('https://api.github.com/repos/gama-platform/gama/releases', function(data) {
			var ahtml="";
			$.each(data,function()
			{
            
				ahtml=ahtml+"<h4 id='div_"+this["name"].replace(/\s/g, '')+"' class='w3-medium w3-text-black' style=' margin-left:10px'> <b>"+this["name"]+"</b></h4> <a onclick='toggleDownloads(\""+this["name"].replace(/\s/g, '')+"\");' href='#'>See more...</a><div id='"+this["name"].replace(/\s/g, '',"")+"' style='display: none;'>";
				$.each(this["assets"],function()
				{
					ahtml=ahtml+"<div class='w3-panel w3-light-grey w3-animate-opacity w3-hover-text-blue'><span><a href='"+this["browser_download_url"]+"'>"+this["name"]+" ("+(this["size"]/1000000).toFixed(1)+" Mb ) </a></span><a href='"+this["browser_download_url"]+"'><i class='fa fa-2x fa-download w3-text-black w3-right'></i></a></div>";
				});
				ahtml=ahtml+"</div>";
			});
			$("#releasesquotes").html(ahtml);
			$("#releasesquotes").linkify();
		});	
	});
        function toggleDownloads(theId) {
            var lTable = document.getElementById(theId);
            lTable.style.display = (lTable.style.display == "block") ? "none" : "block";
        }
</script>

