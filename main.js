(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=e.querySelector(".places__item").cloneNode(!0),p=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__title"),a=c.querySelector(".card__like-button");return p.src=t.link,p.alt=t.name,i.textContent=t.name,u.addEventListener("click",(function(){n(c)})),a.addEventListener("click",(function(){o(a)})),p.addEventListener("click",(function(){r(t.link,t.name,t.name)})),c}function n(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),e.addEventListener("click",u),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",u),document.removeEventListener("keydown",p)}function p(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}function u(e){e.target.classList.contains("popup")&&c(e.target)}var i=document.querySelector(".places__list"),a=document.querySelector(".profile__edit-button"),d=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__add-button"),s=document.querySelector(".popup_type_new-card"),_=d.querySelector(".popup__form"),m=_.querySelector(".popup__input_type_name"),y=_.querySelector(".popup__input_type_description"),v=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),k=s.querySelector(".popup__input_type_card-name"),q=s.querySelector(".popup__input_type_url"),S=s.querySelector(".popup__form"),L=document.querySelector(".popup_type_image"),E=L.querySelector(".popup__image"),g=L.querySelector(".popup__caption"),h=document.querySelectorAll(".popup__close");function x(e,t,n){E.src=e,E.alt=t,g.textContent=n,r(L)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var r=t(e,n,o,x);i.append(r)})),a.addEventListener("click",(function(){m.value=v.textContent,y.value=f.textContent,r(d)})),l.addEventListener("click",(function(){k.value="",q.value="",r(s)})),_.addEventListener("submit",(function(e){e.preventDefault(),v.textContent=m.value,f.textContent=y.value,c(d)})),S.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:k.value,link:q.value},n,o,x);i.prepend(r),S.reset(),c(s)})),h.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){c(t)}))}))})();