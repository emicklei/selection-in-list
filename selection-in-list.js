class SelectionInList extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        // anchor element selected
        this.lastSelected = null; 
        this.addEventListener('keydown',function(event){
            if (event.key =='ArrowDown') {
                this.handleArrowDown(event);
            }
            if (event.key =='ArrowUp') {
                this.handleArrowUp(event);
            }
        }); 
        // TODO use shadow root? this does not work because of error.
        // this.classList.add("no-bullets");
    } 
    getSelected() { return this.lastSelected; }
    setSelected(what) { this.lastSelected = what; }

    // add a ListItem with an anchor that shows the label and is clickable.
    // returns the ListItem
    addItem(labelHTML,value) {
        let li = document.createElement('li');
        let an = document.createElement('a');
        an.setAttribute('data-value',value);
        an.setAttribute('href','#');
        an.addEventListener('mouseup',function(event) {
            this.parentNode.parentNode.selectItem(event.target);
        });
        an.innerHTML = labelHTML;
        li.appendChild(an);
        this.appendChild(li);
        return li;
    }
    clearItems() {
        this.replaceChildren();
    }
    selectItem(anchor) {
        if (this.getSelected() !== null) { 
            // list element
            this.getSelected().parentNode.classList.remove('selected');
            // anchor element
            this.getSelected().classList.remove('selected');    
        }
        if (anchor === this.getSelected()) {
            this.setSelected(null);
            this.dispatchEvent(new Event('selection',{detail: null}));
            return;
        }
        // list element
        anchor.parentNode.classList.add('selected');
        // anchor element
        anchor.classList.add('selected');
        this.setSelected(anchor);
        this.dispatchEvent(new CustomEvent('selection',{detail: anchor.getAttribute('data-value')}));
    }
    handleArrowDown(event) {
        if (this.getSelected() !== null) {
            let li = this.getSelected().parentNode;
            let downLi = li.nextSibling;
            if (downLi !== null) {
                let downA = downLi.firstChild;
                if (downA !== null) {
                    this.selectItem(downA);
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                    downA.scrollIntoView(false);
                    event.preventDefault();
                }
            }            
        }        
    } 
    handleArrowUp(event) {
        if (this.getSelected() !== null) {
            let li = this.getSelected().parentNode;
            let upLi = li.previousSibling;
            if (upLi !== null) {
                let upA = upLi.firstChild;
                if (upA !== null) {
                    this.selectItem(upA);
                    upA.scrollIntoView(false);
                    event.preventDefault();
                }
            }            
        }        
    }     
}
// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#examples
customElements.define('selection-in-list', SelectionInList);