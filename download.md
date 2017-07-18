---
layout: home
title: Download
---
<div class="w3-row-padding w3-padding-64 w3-container">
  <div class="w3-content">
  	<div id="releasesquotes" class="w3-medium w3-text-blue">
	</div>
   </div>
</div>
<script>
	$(document).ready(function(){
		$.getJSON('https://api.github.com/repos/gama-platform/gama/releases', function(data) {
			var ahtml="";
			$.each(data,function()
			{
				ahtml=ahtml+"<h5 class='w3-medium w3-text-white w3-blue w3-wide w3-center' style='margin-left:10px'><b>"+this["name"]+"</b></h5><ul>";
				$.each(this["assets"],function()
				{
					ahtml=ahtml+"<li><a href='"+this["browser_download_url"]+"'>"+this["name"]+"</a></li>";
				});
				ahtml=ahtml+"</ul>";
			});
			$("#releasesquotes").html(ahtml);
			$("#releasesquotes").linkify();
		});	
	});
</script>

