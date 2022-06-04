class SelectionInList extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.lastSelected = null; 
        this.addEventListener('keydown',function(event){
            if (event.key =='ArrowDown') {
                this.handleArrowDown(event);
            }
        }); 
        // TODO use shadow root? this does not work because or error.
        // this.classList.add("no-bullets");
    } 
    getSelected() { return this.lastSelected; }
    setSelected(what) { this.lastSelected = what; }

    addItem(label,value) {
        let li = document.createElement('li');
        let an = document.createElement('a');
        an.setAttribute('data-value',value);
        an.setAttribute('href','#');
        an.setAttribute('onmouseup','javascript:select(this);');
        an.textContent = label;
        li.appendChild(an);
        this.appendChild(li);
    }
    clearItems() {
        this.replaceChildren();
    }
    select(me) {
        if (this.getSelected() !== null) { 
            // list element
            this.getSelected().parentNode.classList.remove('selected');
            // anchor element
            this.getSelected().classList.remove('selected');    
        }
        if (me === this.getSelected()) {
            this.setSelected(null);
            this.dispatchEvent(new Event('selection',{detail: null}));
            return;
        }
        // list element
        me.parentNode.classList.add('selected');
        // anchor element
        me.classList.add('selected');
        this.setSelected(me);
        this.dispatchEvent(new CustomEvent('selection',{detail: me.getAttribute('data-value')}));
    }
    handleArrowDown(event) {
        console.log("arrowdown:",event);
        event.preventDefault();
    } 
}
// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#examples
customElements.define('selection-in-list', SelectionInList);

// TODO how to skip this indirection?
function select(me) {               
    me.parentNode.parentNode.select(me);
}