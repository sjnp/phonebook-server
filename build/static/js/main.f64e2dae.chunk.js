(this["webpackJsonpphonebook-client"]=this["webpackJsonpphonebook-client"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(16),c=n.n(a),r=n(4),o=n(3),i=n(2),u=n(5),s=n.n(u),l=n(0),b=function(e){var t=e.filter,n=e.handleFilterChange;return Object(l.jsxs)("div",{children:["Filter show with",Object(l.jsx)("input",{type:"text",name:"filter",value:t,onChange:n})]})},j=(n(41),function(e){var t=e.person,n=e.handleNameChange,a=e.handleNumberChange,c=e.addPerson;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:c,children:[Object(l.jsxs)("label",{children:["Name:",Object(l.jsx)("input",{type:"text",name:"name",value:t.name,onChange:n})]}),Object(l.jsxs)("label",{children:["Number:",Object(l.jsx)("input",{type:"text",name:"number",value:t.number,onChange:a})]}),Object(l.jsx)("button",{type:"submit",children:"Add"})]})})}),h=function(e){var t=e.person,n=e.handleRemoveClick;return Object(l.jsxs)("li",{children:[t.name," ",t.number,Object(l.jsx)("button",{type:"button",onClick:function(){return n(t.id)},children:"Remove"})]})},d=function(e){var t=e.persons,n=e.handleRemoveClick;return Object(l.jsx)("ul",{children:t.map((function(e,t){return Object(l.jsx)(h,{person:e,handleRemoveClick:n},t)}))})},O="http://localhost:3001/api/persons",m=function(){var e=Object(i.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(i.useState)({name:"",number:""}),u=Object(o.a)(c,2),h=u[0],m=u[1],f=Object(i.useState)(""),v=Object(o.a)(f,2),p=v[0],x=v[1],C=Object(i.useState)([]),g=Object(o.a)(C,2),k=g[0],w=g[1];Object(i.useEffect)((function(){s.a.get(O).then((function(e){var t=e.data;a(t),w(t)}))}),[]);var N=function(e,t){w(t.filter((function(t){return t.name.toLowerCase().includes(e.toLowerCase())})))};return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(b,{filter:p,handleFilterChange:function(e){var t=e.target.value;x(t),N(t,n)}}),Object(l.jsx)("h2",{children:"Add a new"}),Object(l.jsx)(j,{person:h,handleNameChange:function(e){var t=Object(r.a)(Object(r.a)({},h),{},{name:e.target.value});m(t)},handleNumberChange:function(e){var t=Object(r.a)(Object(r.a)({},h),{},{number:e.target.value});m(t)},addPerson:function(e){e.preventDefault(),s.a.post(O,h).then((function(e){var t=n.concat(e.data);a(t),N(p,t)})).catch((function(e){var t=e.response.data.error;alert(t)}))}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(d,{persons:k,handleRemoveClick:function(e){s.a.delete("".concat(O,"/").concat(e)).then((function(t){var c=n.filter((function(t){return t.id!==e}));a(c),N(p,c)}))}})]})};c.a.render(Object(l.jsx)(m,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.f64e2dae.chunk.js.map