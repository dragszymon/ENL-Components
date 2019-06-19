import { Component, Element, Prop, h, State, Watch } from '@stencil/core';


//KOMENTARZ


@Component({
    tag: 'enl-slider',
    styleUrl: 'style.css',
})
export class EnlSlider{

    @Element() host : HTMLElement

    @Prop({ reflectToAttr: true, mutable: true }) sliderCount : number

    @State() builded : boolean

    @State() slideCount : number

    // UL
    @State() slider : HTMLElement

    // LIs
    @State() slides : HTMLCollection

    _checkIfSlides(){
        let arr = this.host.children;

        for (let i = 0; i < arr.length; i++){

            let element = arr[i]

            if(element.classList.contains('enl-slider')){

                this.slider = element.children[0]

                if(element.children.length == 1 && element.children[0].tagName == 'UL' && element.children[0].children.length > 0){
                    this.builded = true
                    this.slideCount = element.children[0].children.length
                    this.slides = element.children[0].children
                }
                else{
                    this.builded = false
                    console.warn('[enl-slider] Zła struktura HTML - Brak <ul slot="slides" / Brak dzieci ul')
                }
            }
        }
    }


    _setSlideWidth(){

        if (this.slideCount){
            let slideWidth = 100 / this.sliderCount + '%'

            for (let i=0; i<this.slides.length; i++){
                let element : HTMLElement = (this.slides[i] as HTMLElement)
                element.style.minWidth=slideWidth;
                element.style.maxWidth=slideWidth;
            }


        }else{

        }
    }

    @Watch('builded')
        function(){
            if(this.builded){
                if(this.host.classList.contains('failed')) this.host.classList.remove('failed')
            }
            else{
                this.host.classList.add('failed')
            }
        }



    componentDidRender(){
        this._checkIfSlides()
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