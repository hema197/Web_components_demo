const template=document.createElement('template');
template.innerHTML=`
<style>
:host{
    display:block;
    font-family:sans-serif;
}
.item{
    width:100%;
    height:20px;
    text-align:start;
    
}

.completed{
    text-decoaration:line-through;
}
button{
    border:none;
    outline:none;
    cursor:pointer;
}
input[type="checkbox" i]{
    margin:0;
    cursor:pointer;
    
}
</style>
<li class="item">
<input type="checkbox">
<label></label>
<button>❌</button>
</li>
`;
class TodoItem extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({'mode':'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$item=this._shadowRoot.querySelector('.item');
        this.$removeButton=this._shadowRoot.querySelector('button');
        this.$checkbox=this._shadowRoot.querySelector('input');
        this.$text=this._shadowRoot.querySelector('label');

        this.$checkbox.addEventListener('click',(e)=>{
            this.dispatchEvent(new CustomEvent('onToggle',{detail:this.index}));
        });
        this.$removeButton.addEventListener('click', (e)=>{
            this.dispatchEvent(new CustomEvent('onRemove',{detail:this.index}));
        });    
    }
    connectedCallback(){
         if(!this.hasAttribute('text')){
             this.setAttribute('text','placeholder');
         }
        this._renderTodoItem();

    }
    static get observedAttributes(){
        return ['text','checked', 'index'];

    }
    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case 'text':
                this._text=newValue;
                break;
            case 'checked':
                this._checked=this.hasAttribute('checked');
                break;
            case 'index':
                this._index=parseInt(newValue);
                break;        
        }

    }
    get checked(){
        return this.hasAttribute('checked');
    }
   
    set checked(val){
        if(val){
            this.setAttribute('checked','')
        }
        else{
            this.removeAttribute('checked');
        }
    }
    get index(){
        return this._index;
    }
    set index(val){
        this.setAttribute('index', val)
    }
    get text(){
        return this._text;
    }
    set text(val){
        this.setAttribute('text', val);
    }
    _renderTodoItem(){
        
        this.$text.innerHTML=this._text;
        if(this.hasAttribute('checked')){
            this.$text.classList.add('completed');
            this.$checkbox.setAttribute('checked','');
        }
        else{
            this.$text.classList.remove('completed');
            this.$checkbox.removeAttribute('checked');
        }
        
    }
    }

window.customElements.define('to-do-item', TodoItem);