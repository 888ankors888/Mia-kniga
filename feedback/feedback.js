(function(){
  var ENDPOINT='https://id-chat.onrender.com/api/messages';

  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}

  var fab=el('button','fb-fab','✉️ Обратная связь');
  fab.type='button';
  fab.setAttribute('aria-haspopup','dialog');

  var dlg=document.createElement('dialog');
  dlg.className='fb-dialog';
  var form=el('form','fb-form');
  form.method='POST';
  form.action=ENDPOINT;
  form.enctype='multipart/form-data';

  var title=el('h2','fb-title','Обратная связь');
  var sub=el('p','fb-sub','Расскажите, что понравилось или что нужно исправить. Сообщение придёт разработчику.');
  var status=el('p','fb-status','');

  function field(labelText,input){
    var w=el('label','fb-field');
    var s=el('span',null,labelText);
    w.append(s,input);
    return w;
  }

  var name=document.createElement('input');
  name.name='name'; name.required=true; name.placeholder='Ваше имя';
  var contact=document.createElement('input');
  contact.name='contact'; contact.required=true; contact.placeholder='E-mail, Telegram или телефон';
  var text=document.createElement('textarea');
  text.name='text'; text.required=true; text.maxLength=5000; text.placeholder='Текст письма';

  var fileWrap=el('label','fb-file');
  var fileLabel=el('span',null,'Вложить файл (необязательно, до 10 МБ)');
  var file=document.createElement('input');
  file.type='file'; file.name='file';
  fileWrap.append(fileLabel,file);

  var actions=el('div','fb-actions');
  var cancel=el('button','fb-btn ghost','Закрыть');
  cancel.type='button';
  var send=el('button','fb-btn','Отправить');
  send.type='submit';
  actions.append(cancel,send);

  var note=el('p','fb-note','Нажимая «Отправить», вы соглашаетесь с обработкой указанных данных для ответа на обращение.');

  form.append(title,sub,field('Имя',name),field('Как связаться',contact),field('Текст письма',text),fileWrap,actions,status,note);
  dlg.append(form);

  var frame=document.createElement('iframe');
  frame.name='fb-upload-target';
  frame.style.cssText='position:absolute;width:0;height:0;border:0;visibility:hidden';
  frame.setAttribute('aria-hidden','true');
  form.target=frame.name;

  function open(){dlg.showModal()}
  function close(){dlg.close()}

  fab.addEventListener('click',open);
  cancel.addEventListener('click',close);

  form.addEventListener('submit',function(){
    status.className='fb-status';
    status.textContent='Отправляем…';
    send.disabled=true;
    form.classList.add('fb-sent');
  });

  frame.addEventListener('load',function(){
    if(!form.classList.contains('fb-sent'))return;
    status.className='fb-status ok';
    status.textContent='Спасибо! Сообщение отправлено.';
    form.reset();
    form.classList.remove('fb-sent');
    send.disabled=false;
    setTimeout(close,1400);
  });

  document.body.append(frame,fab,dlg);
})();
