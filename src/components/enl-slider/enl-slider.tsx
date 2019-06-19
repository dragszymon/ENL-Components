import { Component, Element, Prop, h, State, Watch } from '@stencil/core';


@Component({
    tag: 'enl-slider',
    styleUrl: 'style.css',
})

export class EnlSlider{

    // <enl-slider>
    @Element() 
        host : HTMLElement


    //How many slides on one screen
    @Prop({ reflectToAttr: true, mutable: true }) 
        slidesToShow : number


    //True if HTML set-up was done correctly, false otherwise
    @State() 
        builded : boolean

    //Number of slides in HTML
    @State() 
        slideCount : number

    //UL: enl-slider > div.enl-slider > ul
    @State() 
        slider : HTMLElement

    //LIs: enl-slider > div.enl-slider > ul > li
    @State() 
        slides : HTMLCollection

        
    _checkIfSlider(){
        //Function that chcecks:
        // -if slides are set up correctly in HTML 
        // -and if so, what are the parameters of the set up

        let hostChildren : HTMLCollection = this.host.children;

        for (let i = 0; i < hostChildren.length; i++){
            let hostChild = hostChildren[i]

            if(hostChild.classList.contains('enl-slider')){
                if(hostChild.children.length > 0 && hostChild.children[0].tagName == 'UL' && hostChild.children[0].children.length > 0){
                    //UL
                    this.slider = (hostChild.children[0] as HTMLElement)

                    this.builded = true
                }
                else{
                    this.builded = false
                    console.warn('[enl-slider] Zła struktura HTML - Brak <ul slot="slides" / Brak dzieci ul')
                }
            }
            
        }
    }

    _setSlideWidth(){
        //Function that sets the width of the slides
        if (this.slideCount){
            let slideWidth : string = 100 / this.slidesToShow + '%'

            for (let i=0; i<this.slides.length; i++){
                let element : HTMLElement = (this.slides[i] as HTMLElement)
                element.style.minWidth=slideWidth;
                element.style.maxWidth=slideWidth;
            }
            
        }
    }

    @Watch('builded')
        watchBuilded(){
            if(this.builded){
                if(this.host.classList.contains('failed')) this.host.classList.remove('failed')
            }
            else{
                this.host.classList.add('failed')
            }
        }

    @Watch('slider')
        watchSlider(){
            //LIs
            this.slides = this.slider.children
            
            //LIs count
            this.slideCount = this.slides.length
        }



    componentDidRender(){
        this._checkIfSlider()
        if(this.builded){
            this._setSlideWidth()
        }
    }


    render(){

        return [
            <div class='enl-slider'>
                <slot name="slides" />
            </div>
        ]
    }
}