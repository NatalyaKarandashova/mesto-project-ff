(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/pwff-cohort-1",headers:{authorization:"b36effa6-ff64-4a3c-86fb-6ba87b19e57d","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},r=function(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers}).then(t)},n=function(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then(t)},o=document.querySelector("#card-template").content;function c(e,t,r,n){var c=o.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__image"),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__title"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__likes-count");return u.src=e.link,u.alt=e.name,i.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(t){return t._id===e.currentUserId}))&&l.classList.add("card__like-button_is-active"),a.addEventListener("click",(function(){t(e._id,c)})),l.addEventListener("click",(function(){r(e._id,e.likes.some((function(t){return t._id===e.currentUserId})),s,l,e)})),u.addEventListener("click",(function(){n(e.link,e.name)})),c}function u(r,n){(function(r){return fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){n.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function a(e,t,o,c,u){(t?n:r)(e).then((function(e){o.textContent=e.likes.length,u.likes=e.likes,e.likes.some((function(e){return e._id===u.currentUserId}))?c.classList.add("card__like-button_is-active"):c.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при изменении лайка:",e)}))}function i(e){e.classList.add("popup_is-opened"),e.addEventListener("click",p),document.addEventListener("keydown",s)}function l(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",p),document.removeEventListener("keydown",s)}function s(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function p(e){e.target.classList.contains("popup")&&l(e.target)}var d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"},f=function(e,t,r){var n=new RegExp(t.dataset.pattern),o=t.dataset.errorMessage;t.validity.valueMissing?y(e,t,"Вы пропустили это поле",r):t.value.length<2?y(e,t,"Минимальная длина текста: 2 символа",r):t.value.length>t.dataset.maxLength?y(e,t,"Максимум ".concat(t.dataset.maxLength," символов"),r):n.test(t.value)?(m(e,t,r),t.setCustomValidity("")):(y(e,t,o,r),t.setCustomValidity(o))},y=function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)},m=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},_=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},v=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){m(e,r,t)})),n.disabled=!0,n.classList.add(t.inactiveButtonClass)};function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){q(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function q(e,t,r){return(t=function(e){var t=function(e){if("object"!=b(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==b(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var k=document.querySelector(".places__list"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".profile__add-button"),O=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_avatar"),w=j.querySelector(".popup__form"),x=w.querySelector(".popup__input_type_avatar"),A=document.querySelector(".profile__image"),P=L.querySelector(".popup__form"),U=P.querySelector(".popup__input_type_name"),I=P.querySelector(".popup__input_type_description"),D=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),B=O.querySelector(".popup__input_type_card-name"),N=O.querySelector(".popup__input_type_url"),J=O.querySelector(".popup__form"),M=document.querySelector(".popup_type_image"),H=M.querySelector(".popup__image"),V=M.querySelector(".popup__caption"),z=document.querySelectorAll(".popup__close"),R={},$="";function F(e){e.textContent="Сохранение..."}function G(e,t){e.textContent=t}function K(e,t,r){H.src=e,H.alt=t,V.textContent=r,i(M)}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,a=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(a.push(n.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?g(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];R=o,$=o._id,document.querySelector(".profile__title").textContent=R.name,document.querySelector(".profile__description").textContent=R.about,document.querySelector(".profile__image").style.backgroundImage="url(".concat(R.avatar,")"),i.forEach((function(e){var t=c(S(S({},e),{},{currentUserId:$}),u,a,K);k.append(t)}))})).catch((function(e){console.error("Ошибка:",e)})),E.addEventListener("click",(function(){U.value=D.textContent,I.value=T.textContent,function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){f(e,r,t)})),_(r,n,t)}(P,d),i(L)})),C.addEventListener("click",(function(){B.value="",N.value="",i(O)})),A.addEventListener("click",(function(){v(w,d),i(j)})),w.addEventListener("submit",(function(r){r.preventDefault();var n,o=w.querySelector(".popup__button");F(o),(n=x.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)).then((function(e){A.style.backgroundImage="url(".concat(e.avatar,")"),l(j),G(o,"Сохранить")})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),G(o,"Сохранить")}))})),P.addEventListener("submit",(function(r){r.preventDefault();var n,o,c=P.querySelector(".popup__button");F(c),(n=U.value,o=I.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then(t)).then((function(e){D.textContent=e.name,T.textContent=e.about,l(L),G(c,"Сохранить")})).catch((function(e){console.error("Ошибка при обновлении профиля:",e),G(c,"Сохранить")}))})),J.addEventListener("submit",(function(r){r.preventDefault();var n=J.querySelector(".popup__button");F(n);var o,i,s={name:B.value,link:N.value};(o=s.name,i=s.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:i})}).then(t)).then((function(e){var t=c({name:e.name,link:e.link,likes:e.likes,ownerId:e.owner._id,cardId:e._id,currentUserId:R._id},u,a,K);k.prepend(t),J.reset(),l(O),G(n,"Создать")})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),G(n,"Создать")}))})),z.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){l(t)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(o){o.addEventListener("input",(function(){f(e,o,t),_(r,n,t)}))}))}(t,e)}))}(d),v(P,d),v(J,d),v(w,d)})();