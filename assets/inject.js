function isUrl(data){
  try{
    new URL(data);
    return true;
  }catch(e){
    return false;
  };
};

function urlParse(data){
  var m = data.match(/^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/),
        r = {
            hash: m[10] || "",
            host: m[3] || "",
            hostname: m[6] || "",
            href: m[0] || "",
            origin: m[1] || "",
            pathname: m[8] || (m[1] ? "/" : ""),
            port: m[7] || "",
            protocol: m[2] || "",
            search: m[9] || "",
            username: m[4] || "",
            password: m[5] || "" 
        };
    if (r.protocol.length == 2) {
        r.protocol = "file:///" + r.protocol.toUpperCase();
        r.origin = r.protocol + "//" + r.host;
    }
    r.href = r.origin + r.pathname + r.search + r.hash;
    return r;
};

function maketextnumber(n) {
    for (var r = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], e = n, t = new Array, a = 0; a <= e - 1; a++) {
        t[a] = r[parseInt(Math.random() * r.length)];
        t = t;
    }
    return t.join("");
}

function removeImg(data){
  let targetImg=document.querySelector(`[pick-image="`+data+`"]`);
  if(targetImg!=null){
    targetImg.remove();
  };
};
document.querySelectorAll("img").forEach(function(a){
  try{
    let dataUrl=a.getAttribute("src");
    let uriOrigin=window.location.origin;
    if(dataUrl!=null&&dataUrl.indexOf("//")==0){
      dataUrl=dataUrl.replace("//","https://");
    };
    if(isUrl(dataUrl)){
    }else{
      if(window.location.href.indexOf("/host-")>0){
        let urlReal=window.location.href.split("/host-")[1];
        urlReal=urlReal.replace("https-","https://").replace("http-","http://");
        urlReal=urlParse(urlReal).origin+dataUrl;
        urlReal=uriOrigin+urlReal.replace("https://","/host-https-").replace("http://","/host-http-");
        a.setAttribute("src",urlReal);
      };
    };
  }catch(e){

  };
});
let dbAds=[
  {
    "target-selector":[
      ".container",
      "#container",
      ".content",
      ".pa15.bgwhite"
    ],
    "position":"out-top", //out-top, out-bottom, in-top, in-bottom
    "data" :`
    <!-- Iklan Header -->
    `,
    "style":`
      width: 90%;
      margin: auto;
      margin-bottom: 10px;
      margin-top: 10px;
    `
  }
];

dbAds.forEach(function(a){
  let createElDom=document.createElement("div");
  createElDom.setAttribute("style",a["style"]);
  createElDom.innerHTML=a["data"];
  let dataScript=[];
  createElDom.querySelectorAll("script").forEach(function(b){
    let createElCostom=document.createElement("script");
    createElCostom.innerHTML=b.innerHTML;
    dataScript.push(createElCostom);
    b.remove();
  });
  a["target-selector"].forEach(function(b){
    let targetEl=document.querySelector(b);
    if(targetEl){
      if(a["position"]=="out-bottom"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
      }else if(a["position"]=="out-top"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
        createElDom.after(targetEl);
      }else if(a["position"]=="in-top"){

      }else if(a["position"]=="in-top"){
        
      };
      dataScript.forEach(function(b){
        createElDom.append(b); 
      });
    }else{
      console.log("target "+a["target-selector"]+" tidak ditemukan"); 
    };
  });
});


let elImg=document.querySelectorAll("img");
elImg.forEach(function(a){
  a.setAttribute("style","max-width:100%");
  let classImg=a.getAttribute("class");
  let getSrcSet=a.getAttribute("srcset");
  if(classImg==null==false){
    a.classList.remove("lazyload");
  };
  if(getSrcSet==null==false){
    getSrcSet=getSrcSet.split(",");
    if(getSrcSet.length>1){
      a.setAttribute("src",getSrcSet);
    };
  };
});

let dataLazy=document.querySelectorAll(".lazy-image.lazy-image-udf");
dataLazy.forEach(function(a){
  let dataHref=a.getAttribute("data-src");
  if(dataHref){
    let targetLazy=a.querySelector(".loadingPlaceholder");
    let targetDiv=a.querySelector(".lazy-image__loadingPlaceholder")
    if(targetLazy){
      targetLazy.setAttribute("src",dataHref);
      targetDiv.setAttribute("class","show")
    };
  };
});
//---- Popup --//
(function(){injectScript([{"attr":[{"name":"type","value":"text/css"}],"tag":"style","inner":"\n#mtc-sub-popup\n{\ntext-shadow: none;\nposition: absolute;\n}\n#mtc-popup\n{\ndisplay: block;\ntop: 0px;\nleft: 0px;\nwidth: 100%;\nheight: 100%;\nposition: fixed;\nbackground: rgba(12, 12, 12, 0.63);\nmargin: 0;\n-ms-overflow-y: auto;\noverflow-y: auto;\n}\n#mtc-style-popup\n{\nbackground-color: #fff;\noverflow: none;\n}\n#mtc-style-popup\n{\nbackground-color: #fff;\noverflow: none;\n}\n.mtc-style-popup\n{\nwidth: 300px;\nheight: 250px;\nposition: fixed;\ntop: 50%;\nleft: 50%;\nmargin-top: -100px;\nmargin-left: -160px;\nborder: 2px solid red;\npadding: 0px;\n}\n"},{"attr":[{"name":"id","value":"mtc-popup"}],"tag":"div","inner":"\n<code onmouseup=\"document.getElementById('mtc-popup').style.display='none'\" style=\"color:#000;cursor:pointer;float:right;margin-right:-20px;margin-top:-20px; font-size: 9px;\">\n<div class=\"mtc-style-popup\" id=\"mtc-style-popup\">\n<center> <b><span style=\"background-color:#ff0000\">CLOSE</span></b>  </center>\n\n<a title=\"Shopee\" href=\"https://ritualwants.com/rw353cdh?key=69e75578e32a074c78e4edd177aaef7d"><img alt=\"\" src=\"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbNi0diLBXzrpd_nC0xw2w05f2T47bwyEJz54RC792Y4HrgBTFxnAbrnNBOPyV9pFirKeEEd5oD5FUc22EgKHCfMGnLJEM0tYiESoXPswbXfXVgXQ8FNovZapcTr-cvraviGDvlHxUke-gHz5aK_OwPjUEIDQoyaa7S7JDI6bcOhLUk19YPG6lefaZ/s300/welcome.png\" width=\"300px\" height=\"250px\"></a>\n\n</div>\n</code>\n"},{"attr":[{"name":"class","value":"clear"}],"tag":"div","inner":""},{"attr":[{"name":"class","value":"widget-item-control"}],"tag":"span","inner":"\n<span class=\"item-control blog-admin\">\n<a class=\"quickedit\" href=\"//www.blogger.com/rearrange?blogID=5186279221005593446&amp;widgetType=HTML&amp;widgetId=HTML3&amp;action=editWidget&amp;sectionId=main\" onclick=\"return _WidgetManager._PopupConfig(document.getElementById(&quot;HTML3&quot;));\" target=\"configHTML3\" title=\"Edit\">\n<img alt=\"\" height=\"18\" src=\"https://resources.blogblog.com/img/icon18_wrench_allbkg.png\" width=\"18\">\n</a>\n</span>\n"},{"attr":[{"name":"class","value":"clear"}],"tag":"div","inner":""},{"attr":[{"name":"class","value":"clear"}],"tag":"div","inner":""}],{"target":"body"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();
(function(){injectScript([{"attr":[{"name":"type","value":"text/javascript"},{"name":"src","value":"//ritualwants.com/30/12/85/30128563328ebf78fec41d709196a39b.js"}],"tag":"script","inner":""}],{"target":"head"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();
<body onclick='open_popup()'>
