/*
  BLOG
 */

if( document.URL.includes("blog") ){
  // Doc : https://developers.facebook.com/docs/plugins/page-plugin/
  
  // Load SDK
  //document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend', '<div id="fb-root"></div><script async defer crossorigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v5.0"></script>');

  // When page ready
  window.addEventListener('load', function () {
    // Load pre-loaded iframe
    // Not the "normal" way => Can break at next Fb API update
    document.getElementsByTagName("nav")[1].insertAdjacentHTML('beforeend','<div class="fb-page fb_iframe_widget" data-href="https://www.facebook.com/GamaPlatform/" data-tabs="timeline, events" data-width="225" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="adapt_container_width=true&amp;container_width=0&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FGamaPlatform%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=true&amp;tabs=timeline%2C%20events&amp;width=225"><span style="vertical-align: bottom; width: 225px; height: 500px;"><iframe name="f379555b4e85f84" width="225px" height="1000px" title="fb:page Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D44%23cb%3Df1bf407761c6da%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff1fa2751bea77c%26relation%3Dparent.parent&amp;container_width=0&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FGamaPlatform%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=true&amp;tabs=timeline%2C%20events&amp;width=225" style="border: none; visibility: visible; width: 225px; height: 500px;" class=""></iframe></span></div>'); 
  })
}