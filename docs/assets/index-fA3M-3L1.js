(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=c(o);fetch(o.href,r)}})();var l=[];for(var w=0;w<256;++w)l.push((w+256).toString(16).slice(1));function S(e,t=0){return(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase()}var y,P=new Uint8Array(16);function E(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(P)}var A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const v={randomUUID:A};function I(e,t,c){if(v.randomUUID&&!t&&!e)return v.randomUUID();e=e||{};var d=e.random||(e.rng||E)();return d[6]=d[6]&15|64,d[8]=d[8]&63|128,S(d)}class m{constructor(t){this.id=I(),this.description=t,this.done=!1,this.createAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},s={todos:[new m("Piedra del alma"),new m("Piedra del espacio"),new m("Piedra del tiempo"),new m("Piedra del poder"),new m("Piedra del realidad")],filter:a.All},k=()=>{T(),console.log("InitStore aguacate")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(s))},L=(e=a.All)=>{switch(e){case a.All:return s.todos;case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} not valid`)}},F=e=>{if(!e)throw new Error("Description is required");s.todos.push(new m(e)),h()},U=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},q=e=>{s.todos=s.todos.filter(t=>t.id!=e),h()},x=()=>{s.todos=s.todos.filter(e=>!e.done),h()},M=(e=a.All)=>{s.filter=e,h()},O=()=>s.filter,D=()=>L(a.Pending).length,i={addTodo:F,deleteCompleted:x,deleteTodo:q,getPendingTodosCounter:D,getCurrentFilter:O,getTodos:L,initStore:k,loadStore:T,setFilter:M,toggleTodo:U},N=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a id="all" class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a id="pending" class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a id="completed" class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,H=e=>{const{id:t,description:c,done:d}=e,o=`<div class="view">
                <input class="toggle" type="checkbox" ${d?"checked":""}>
                <label>${c}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">`,r=document.createElement("li");return r.innerHTML=o,r.setAttribute("data-id",t),e.done&&r.classList.add("completed"),r};let g;const V=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(c=>{g.append(H(c))})};let b;const R=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=i.getPendingTodosCounter()},u={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",FiltersLIs:".filtro",PendingCountLabel:"#pending-count"},$=e=>{const t=()=>{const n=i.getTodos(i.getCurrentFilter());console.log(n),V(u.TodoList,n)},c=()=>{R(u.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=N,document.querySelector(e).append(n),t(),c()})();const d=document.querySelector(u.NewTodoInput),o=document.querySelector(u.TodoList),r=document.querySelector(u.ClearCompleted),p=document.querySelectorAll(u.FiltersLIs);document.querySelectorAll(u.FiltersLIs),d.addEventListener("keyup",n=>{n.keyCode==13&&n.target.value.trim().length!==0&&(i.addTodo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{const f=n.target.closest("[data-id]");i.toggleTodo(f.getAttribute("data-id")),t(),c()}),o.addEventListener("click",n=>{if(n.target.className!="destroy")return;const C=n.target.closest("[data-id]");i.deleteTodo(C.getAttribute("data-id")),t(),c()}),r.addEventListener("click",n=>{i.deleteCompleted(),t()}),p.forEach(n=>{n.addEventListener("click",()=>{switch(p.forEach(f=>{f.classList.remove("selected")}),n.classList.add("selected"),n.getAttribute("id")){case"all":i.setFilter(a.All);break;case"pending":i.setFilter(a.Pending);break;case"completed":i.setFilter(a.Completed);break;default:i.setFilter(a.All);break}t()})})};i.initStore();$("#app");
