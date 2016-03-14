!function e(t,a,r){function n(i,o){if(!a[i]){if(!t[i]){var c="function"==typeof require&&require;if(!o&&c)return c(i,!0);if(s)return s(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var d=a[i]={exports:{}};t[i][0].call(d.exports,function(e){var a=t[i][1][e];return n(a?a:e)},d,d.exports,e,t,a,r)}return a[i].exports}for(var s="function"==typeof require&&require,i=0;i<r.length;i++)n(r[i]);return n}({1:[function(e,t,a){(function(t){"use strict";var a="undefined"!=typeof window?window.React:"undefined"!=typeof t?t.React:null,r="undefined"!=typeof window?window.ReactDOM:"undefined"!=typeof t?t.ReactDOM:null,n=e("./header/Header.jsx"),s=e("./container/Container.jsx"),i=e("./sidebar/Sidebar.jsx"),o=a.createClass({displayName:"photo-layout-editor",saveWidth:0,$editor:null,$sidebar:null,show_sidebar:"false"!=localStorage.getItem("sidebar"),getInitialState:function(){return{}},componentDidMount:function(){var e=this;this.$editor=$(r.findDOMNode(this.refs.editor)),this.$sidebar=$(r.findDOMNode(this.refs.sidebar)),$(window).on("scroll",function(t){e.refs.container.refs.navTop.scrollEvent()}),this.show_sidebar&&this.$editor.addClass("on-sidebar"),this.refs.container.actGridster()},attachImages:function(e){this.refs.container.refs.gridster.attachImages(e)},toggleSidebar:function(){var e=!this.show_sidebar;localStorage.setItem("sidebar",e),this.show_sidebar=e,this.saveWidth=e?this.saveWidth+this.$sidebar.width():this.saveWidth-this.$sidebar.width(),this.$editor.toggleClass("on-sidebar"),this.$editor.css("min-width",this.saveWidth)},resizeWidth:function(e){this.saveWidth=this.show_sidebar?e:e-this.$sidebar.width(),this.$editor.css("min-width",this.saveWidth)},render:function(){return a.createElement("div",{ref:"editor",className:"ple-editor"},a.createElement(n,{ref:"header"}),a.createElement(s,{ref:"container",resizeWidth:this.resizeWidth}),a.createElement(i,{ref:"sidebar",uploadScript:preference.uploadScript,show:this.state.show_sidebar,toggleSidebar:this.toggleSidebar,attachImages:this.attachImages,defaultUploadFiles:preference.defaultUploadFiles}))}});window.app=r.render(a.createElement(o,null),document.getElementById("app"))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./container/Container.jsx":2,"./header/Header.jsx":7,"./sidebar/Sidebar.jsx":11}],2:[function(e,t,a){"use strict";var r=e("./NavTop.jsx"),n=e("./Gridster.jsx"),s=e("./NavBottom.jsx");t.exports=React.createClass({displayName:"Container",originalPreference:{},getInitialState:function(){return{preference:{width:100,height:100,max_col:5,max_scale:2,outer_margin:10,inner_margin:10},action:null,dynamicParameter:{}}},componentDidMount:function(){this.originalPreference=this.state.preference,this.gridster=this.refs.gridster},updatePreference:function(e){this.setState({preference:e,action:"updatePreference"}),this.refs.navTop.closeSetting()},resetPreference:function(){this.setState({preference:this.originalPreference,action:null})},actAddBlcok:function(){this.refs.gridster.addBlock()},actShuffleBlocks:function(){this.refs.gridster.shuffleBlocks()},actGridster:function(){this.setState({action:"init"})},generate:function(){log("generate output")},render:function(){return React.createElement("div",{className:"ple-container"},React.createElement(r,{ref:"navTop",update:this.updatePreference,reset:this.resetPreference,actAddBlock:this.actAddBlcok,actShuffleBlocks:this.actShuffleBlocks,preference:this.state.preference}),React.createElement(n,{ref:"gridster",preference:this.state.preference,action:this.state.action,resizeWidth:this.props.resizeWidth,dynamicParameter:this.state.dynamicParameter}),React.createElement(s,{generate:this.generate}))}})},{"./Gridster.jsx":3,"./NavBottom.jsx":4,"./NavTop.jsx":6}],3:[function(e,t,a){"use strict";var r=e("../lib/util.js");t.exports=React.createClass({displayName:"Gridster",$gridster:null,gridster:null,saveBlocks:null,componentDidMount:function(){this.$gridster=$(ReactDOM.findDOMNode(this.refs.gridster))},create:function(){var e=this.props.preference,t=.5*e.inner_margin,a=t+e.outer_margin;this.$gridster.css("padding",a+"px").append("<ul/>"),this.saveBlocks&&(this.saveBlocks.each(function(t,a){parseInt($(a).attr("data-col"))>e.max_col&&$(a).attr("data-col",e.max_col),parseInt($(a).attr("data-sizex"))>e.max_scale&&$(a).attr("data-sizex",e.max_scale),parseInt($(a).attr("data-sizey"))>e.max_scale&&$(a).attr("data-sizey",e.max_scale)}),this.$gridster.children("ul").append(this.saveBlocks)),this.resizeWrapWidth(),this.gridster=this.$gridster.children("ul").gridster({widget_margins:[t,t],widget_base_dimensions:[e.width,e.height],max_cols:e.max_col,resize:{enabled:!0,max_size:[e.max_scale,e.max_scale]}}).data("gridster")},resizeWrapWidth:function(){var e=this.props.preference,t=e.width*e.max_col+e.max_col*e.inner_margin;this.$gridster.width(t);var a=2*parseInt(this.$gridster.parent().css("padding-left")),r=2*parseInt($(".ple-editor").css("padding")),n=$(".ple-sidebar").width(),s=this.$gridster.outerWidth()+a+r+n;this.props.resizeWidth(s)},clear:function(){this.$gridster.find("li").removeAttr("style class"),this.saveBlocks=$(this.$gridster.children("ul").html()),this.gridster.destroy(!0),this.$gridster.children().remove(),this.$gridster.removeClass("ready").removeAttr("style")},init:function(){this.create(),this.randomAddBlocks(5,this.props.preference.max_scale,this.props.preference.max_scale)},updatePreference:function(){this.clear(),this.create()},block:function(e){if(!e.sizeX||!e.sizeY)return!1;var t=$("<li>"+(e.text?e.text:"")+"</li>");this.gridster.add_widget(t,e.sizeX,e.sizeY,!1)},randomAddBlocks:function(e,t,a){for(var n=0;e>n;n++)this.block({sizeX:r.getRandomRange(1,t),sizeY:r.getRandomRange(1,a)})},addBlock:function(e,t){e=e||1,t=t||1,e=e>this.props.preference.max_scale?this.props.preference.max_scale:e,t=t>this.props.preference.max_scale?this.props.preference.max_scale:t,this.block({sizeX:e,sizeY:t})},shuffleBlocks:function(){var e=this;this.clear(),this.saveBlocks.each(function(t,a){$(a).attr({"data-col":r.getRandomRange(1,e.props.preference.max_col),"data-row":r.getRandomRange(1,2),"data-sizex":r.getRandomRange(1,e.props.preference.max_scale),"data-sizey":r.getRandomRange(1,e.props.preference.max_scale)})}),this.create()},attachImages:function(e){var t=this,a=this.$gridster.find("li").not(".attached");if(e.length>a.length){for(var r=e.length-a.length,n=0;r>n;n++)this.addBlock();a=this.$gridster.find("li").not(".attached")}var s=[];a.each(function(t,a){!$(a).children("figure").length&&t<e.length&&s.push(a)}),s.forEach(function(a,r){t.assignImage($(a),e[r])})},assignImage:function(e,t){var a=$("<figure/>");a.css({"background-image":"url("+t+")","background-position":"50% 50%","background-size":"cover"}),e.addClass("attached").prepend(a)},render:function(){return"function"==typeof this[this.props.action]&&this[this.props.action](),React.createElement("div",{className:"gridster-wrap"},React.createElement("div",{ref:"gridster",className:"gridster",id:"gridster"}))}})},{"../lib/util.js":9}],4:[function(e,t,a){"use strict";t.exports=React.createClass({displayName:"Nav-bottom",actGenerator:function(){log("ACTION GENERATE")},render:function(){return React.createElement("nav",{className:"nav-bottom"},React.createElement("button",{type:"button",title:"Generate export",onClick:this.props.generate},React.createElement("i",{className:"sp-ico ico-check"}),React.createElement("span",null,"Generate")))}})},{}],5:[function(e,t,a){"use strict";t.exports=React.createClass({displayName:"NavTop-Form",form:null,propTypes:{update:React.PropTypes.func},getInitialState:function(){return{}},componentDidMount:function(){this.form=ReactDOM.findDOMNode(this.refs.form)},update:function(e){e.preventDefault(),this.props.update({width:parseInt(this.form.width.value),height:parseInt(this.form.height.value),max_col:parseInt(this.form.max_col.value),max_scale:parseInt(this.form.max_scale.value),outer_margin:parseInt(this.form.outer_margin.value),inner_margin:parseInt(this.form.inner_margin.value)})},render:function(){return React.createElement("article",{className:"form",id:"settings"},React.createElement("form",{method:"post",ref:"form",onSubmit:this.update},React.createElement("fieldset",null,React.createElement("legend",{className:"blind"},"Settings form"),React.createElement("h1",null,"Settings"),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlhtmlFor:"frm_name"},"Min Width")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"width",id:"frm_name",min:"1",max:"999",maxLength:"3",defaultValue:this.props.preference.width,required:!0}),React.createElement("span",null,"px"))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"frm_height"},"Min Height")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"height",id:"frm_height",min:"1",max:"999",defaultValue:this.props.preference.height}),React.createElement("span",null,"px"))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"frm_max_col"},"Max Column")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"max_col",id:"frm_max_col",min:"1",max:"99",defaultValue:this.props.preference.max_col}),React.createElement("span",null,"ea"))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"frm_max_scale"},"Max Scale")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"max_scale",id:"frm_max_scale",min:"1",max:"99",defaultValue:this.props.preference.max_scale}),React.createElement("span",null,"x"))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"frm_outer_margin"},"Outer Margin")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"outer_margin",id:"frm_outer_margin",min:"1",max:"500",defaultValue:this.props.preference.outer_margin}),React.createElement("span",null,"px"))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"frm_inner_margin"},"Inner Margin")),React.createElement("dd",null,React.createElement("input",{type:"number",name:"inner_margin",id:"frm_inner_margin",min:"1",max:"500",defaultValue:this.props.preference.inner_margin}),React.createElement("span",null,"px")))),React.createElement("nav",null,React.createElement("span",null,React.createElement("button",{type:"reset",onClick:this.props.reset},"Reset")),React.createElement("span",null,React.createElement("button",{type:"submit",className:"submit"},"Apply")))))}})},{}],6:[function(e,t,a){"use strict";var r=e("./NavTop.Form.jsx");t.exports=React.createClass({displayName:"NavTop",getInitialState:function(){return{show_form:!1,fix:!1}},toggleSetting:function(){var e=this;1==!this.state.show_form&&$(document).on("click",function(t){$(t.target).closest("#settings").length||(t.preventDefault(),$(this).off("click"),e.setState({show_form:!1}))}),this.setState({show_form:!this.state.show_form})},closeSetting:function(){$(document).off("click"),this.setState({show_form:!1})},scrollEvent:function(){var e=$(window).scrollTop(),t=$(ReactDOM.findDOMNode(this));t.offset().top<e?this.setState({fix:!0}):this.setState({fix:!1})},render:function(){return React.createElement("div",{className:"nav-top-wrap"},React.createElement("nav",{className:"nav-top"+(this.state.fix?" fix":"")},React.createElement("div",{className:"block"+(this.state.show_form?" is-active":"")},React.createElement("button",{type:"button",title:"Edit preference",onClick:this.toggleSetting},React.createElement("i",{className:"sp-ico ico-setting abs"},"Setting")),React.createElement(r,{update:this.props.update,reset:this.props.reset,preference:this.props.preference})),React.createElement("div",{className:"block"},React.createElement("button",{type:"button",title:"Shuffle block",onClick:this.props.actShuffleBlocks},React.createElement("i",{className:"sp-ico ico-arrow-random abs"},"Random block"))),React.createElement("div",{className:"block"},React.createElement("button",{type:"button",title:"Add block",onClick:this.props.actAddBlock},React.createElement("i",{className:"sp-ico ico-plus abs"},"Add block")))))}})},{"./NavTop.Form.jsx":5}],7:[function(e,t,a){"use strict";t.exports=React.createClass({displayName:"Header",componentDidMount:function(){},render:function(){return React.createElement("header",{className:"ple-header"},React.createElement("h1",null,"Photo Layout Editor"),React.createElement("p",null,"사진 레이아웃 에디터입니다. 처음 시작하면 먼저 문서설정을 해주세요!"))}})},{}],8:[function(e,t,a){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.exports=function(){this.local=function(e,t){var a=new FileReader,r=0,n=[];a.onload=function(s){n.push(s.target.result),r==e.length-1?t(n):(r++,a.readAsDataURL(e[r]))},a.readAsDataURL(e[r])},this.external=function(e,t,a,n,s){var i=new XMLHttpRequest;if("function"==typeof FormData||"object"===("undefined"==typeof FormData?"undefined":r(FormData))){for(var o=new FormData,c=0;c<n.length;c++)o.append("files[]",n[c]);o.append("dir",t),o.append("url",a),i.open("post",e,!0),i.addEventListener("load",function(e){var t=null;if(4==e.target.readyState)switch(e.target.status){case 200:try{var a=JSON.parse(decodeURIComponent(e.target.responseText.replace(/\+/g,"%20")));s(a)}catch(e){s({state:"error",message:e.target.responseText})}break;case 404:t={state:"error",message:"404 - File not found"};break;case 403:t={state:"error",message:"403 - Forbidden file type"};break;default:t={state:"error",message:"Unknown Error"}}else t={state:"error",message:"Unknown Error"}}),i.send(o)}return null}}},{}],9:[function(e,t,a){"use strict";t.exports={shuffle:function(e){for(var t,a,r=e.length;r;t=Math.floor(Math.random()*r),a=e[--r],e[r]=e[t],e[t]=a);return e},getRandomRange:function(e,t){return t+=1,Math.floor(Math.random()*(t-e)+e)}}},{}],10:[function(e,t,a){"use strict";t.exports=React.createClass({displayName:"Navigation",getInitialState:function(){return{inputFile:React.createElement("input",{type:"file",onChange:this.upload,multiple:!0})}},attachImages:function(){log("attach image to grid block")},upload:function(e){this.props.upload(e.target.files);var t=$(this.refs.inputFile);t.replaceWith(t.val("").clone(!0))},render:function(){return React.createElement("nav",{className:"nav-top"},React.createElement("div",{className:"wrap"},React.createElement("button",{type:"button",title:"attach images",onClick:this.props.attach},React.createElement("i",{className:"sp-ico ico-arrow-left abs"},"Moving the image to grid block")),React.createElement("button",{type:"button",title:"toggle select",onClick:this.props.toggleSelect},React.createElement("i",{className:"sp-ico ico-select abs"},"Toggle all select")),React.createElement("span",{title:"upload images"},React.createElement("input",{type:"file",ref:"inputFile",onChange:this.upload,multiple:!0}),React.createElement("i",{className:"sp-ico ico-upload abs"},"upload images")),React.createElement("button",{type:"button",title:"remove images",onClick:this.props.remove},React.createElement("i",{className:"sp-ico ico-trash abs"},"remove images"))))}})},{}],11:[function(e,t,a){"use strict";var r=e("../lib/Uploader.js"),n=e("./Nav.jsx"),s=e("./UploadFiles.jsx");t.exports=React.createClass({displayName:"Sidebar",propTypes:{uploadScript:React.PropTypes.string,defaultUploadFiles:React.PropTypes.array},uploader:new r,getDefaultProps:function(){return{uploadScript:null}},getInitialState:function(){return{uploadImages:this.importImages(this.props.defaultUploadFiles),is_loading:!1}},importImages:function(e){return e=e||[],e.map(function(e){return{on:!1,image:e,style:{backgroundImage:"url("+e+")"}}})},upload:function(e){for(var t=this,a=[],r=0;r<e.length;r++)a.push(e[r]);this.setState({is_loading:!0}),this.props.uploadScript?this.uploader.external(this.props.uploadScript,this.props.uploadDir,this.props.uploadUrl,a,function(e){if(t.setState({is_loading:!1}),"success"==e.state){var a=e.images;a.forEach(function(e){t.state.uploadImages.push({on:!1,image:e.loc,style:{backgroundImage:"url("+e.loc+")"}})}),t.setState({uploadImages:t.state.uploadImages})}else log(e.message)}):(this.setState({is_loading:!0}),this.uploader.local(a,function(e){var a=t.state.uploadImages;t.setState({is_loading:!1}),e.forEach(function(e){a.push({on:!1,image:e,style:{backgroundImage:"url("+e+")"}})}),t.setState({uploadImages:a})}))},remove:function(){var e=this,t=[];return this.state.uploadImages.length?(this.state.uploadImages.forEach(function(e,a){e.on&&t.push(a)}),void(t.length?(t.forEach(function(t){delete e.state.uploadImages[t]}),this.setState({uploadImages:this.state.uploadImages})):confirm("선택된 사진이 없습니다. 전부 삭제할까요?")&&this.setState({uploadImages:[]}))):void alert("이미지가 없습니다.")},attach:function(){var e=[];return this.state.uploadImages.forEach(function(t){t.on&&e.push(t.image)}),e.length?void this.props.attachImages(e):(alert("please select image"),!1)},toggleSelect:function(){var e=this.state.uploadImages,t=$(ReactDOM.findDOMNode(this.refs.files)),a=t.find("span.on").length>0;e.forEach(function(e){e.on=!a}),this.setState({uploadImages:e})},update:function(e){this.setState({uploadImages:e})},render:function(){return React.createElement("aside",{className:"ple-sidebar"+(this.state.is_loading?" loading":"")},React.createElement("button",{type:"button",onClick:this.props.toggleSidebar,className:"toggle"},React.createElement("span",null,React.createElement("i",{className:"sp-ico abs"+(this.props.show?" ico-arrow-right2":" ico-arrow-left2")},"Toggle sidebar"))),React.createElement(n,{ref:"nav",upload:this.upload,remove:this.remove,attach:this.attach,toggleSelect:this.toggleSelect}),React.createElement(s,{ref:"files",uploadImages:this.state.uploadImages,update:this.update}))}})},{"../lib/Uploader.js":8,"./Nav.jsx":10,"./UploadFiles.jsx":12}],12:[function(e,t,a){"use strict";t.exports=React.createClass({displayName:"UploadFiles",propTypes:{uploadImages:React.PropTypes.array,update:React.PropTypes.func},is_multiSelect:!1,$gridster:null,dragTarget:null,getInitialState:function(){return{}},componentDidMount:function(){var e=this,t=17,a=91,r=function(r){r.keyCode!=t&&r.keyCode!=a||(e.is_multiSelect=!0,$(window).off("keydown").on("keyup",n))},n=function(){e.is_multiSelect=!1,$(window).off("keyup").on("keydown",r)};$(window).on("keydown",r),this.$gridster=$(".gridster")},onSelect:function(e){var t=parseInt(e.currentTarget.getAttribute("data-key")),a=this.props.uploadImages;this.is_multiSelect?a[t].on=!a[t].on:a.forEach(function(e,a){e.on=a==t?!e.on:!1}),this.props.update(a)},onDragStart:function(e){var t=this;this.$gridster.find("li").on("dragover",function(e){e.preventDefault(),$(e.currentTarget).addClass("hover")}).on("dragleave",function(e){e.preventDefault(),$(e.currentTarget).removeClass("hover")}).on("drop",function(e){e.preventDefault(),t.dragTarget=e.currentTarget})},onDragEnd:function(e){if(this.$gridster.find("li").removeClass("hover").off("dragover dragleave drop"),this.dragTarget){var t=this.props.uploadImages[parseInt(e.currentTarget.getAttribute("data-key"))].image;window.app.refs.container.refs.gridster.assignImage($(this.dragTarget),t),this.dragTarget=null}},render:function(){var e=this,t=[];return this.props.uploadImages.forEach(function(a,r){t.push(React.createElement("li",{key:r,"data-key":r,draggable:"true",onClick:e.onSelect,onDragStart:e.onDragStart,onDragEnd:e.onDragEnd},React.createElement("span",{style:a.style,className:a.on?"on":""},".img")))}),React.createElement("div",{className:"upload-files"},React.createElement("div",{className:"wrap"},React.createElement("ul",{ref:"items"},t)))}})},{}]},{},[1]);
//# sourceMappingURL=maps/app.pkgd.js.map