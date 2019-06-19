import { Component, Method, Element, Prop, h, State, Watch } from '@stencil/core';


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

    @Prop({ reflectToAttr: true, mutable: true }) 
        exccess: boolean;


    //True if HTML set-up was done correctly, false otherwise
    @State() 
        builded : boolean

    //Number of slides in HTML
    @State() 
        slideCount : number = 1

    //Active slide
    @State() 
        activeSlide : number = 0

    //UL: enl-slider > div.enl-slider > ul
    @State() 
        slider : HTMLElement

    //LIs: enl-slider > div.enl-slider > ul > li
    @State() 
        slides : HTMLCollection

    //Next arrow: enl-slider > div.enl-slider-arrow-next
    @State() 
        nextArrow : HTMLElement | undefined = undefined

    //Next arrow: enl-slider > div.enl-slider-arrow-next
    @State() 
        prevArrow : HTMLElement | undefined = undefined

    @State() 
        lastSlideIndex : number
        
    _init(){
        //Function that chcecks:
        // -if slides are set up correctly in HTML 
        // -and if so, what are the parameters of the set up

        let hostChildren : HTMLCollection = this.host.children;

        //SLIDES
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

            if(hostChild.classList.contains('enl-slider-arrow-next')){
                this.nextArrow = (hostChild as HTMLElement)
            }

            if(hostChild.classList.contains('enl-slider-arrow-prev')){
                this.prevArrow = (hostChild as HTMLElement)
            }
        }

        if(this.exccess){
            this.lastSlideIndex = this.slideCount - this.slidesToShow
        }
        else{
            this.lastSlideIndex = this.slideCount - 1
        }

        if(this.builded){
            this._hideArrowsIfNeccessary()
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

    _moveSlide(slideNumber : number){
        //General function to move slides
        
        if(! (slideNumber > this.lastSlideIndex || slideNumber < 0) ){
            this.activeSlide = slideNumber
        }
    }

    _updateSliderPosition(){
        //Updates CSS for slider to move according to activeSlide

        let element : HTMLElement = this.host
        let cs : object = getComputedStyle(element)
        let paddingX : number = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        let borderX : number = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        let objectWidth : number = element.offsetWidth - paddingX - borderX

        this.slider.style.transform = 'translateX(-' + this.activeSlide * (objectWidth/this.slidesToShow) + 'px)'
    }

    _hideArrowsIfNeccessary(){
        //Hides next or prev arrows if conditions were met
        if(this.activeSlide == 0){
            this.prevArrow.classList.add('hidden')
        }else{
            if(this.prevArrow.classList.contains('hidden')) this.prevArrow.classList.remove('hidden')
        }

        if(this.activeSlide == this.lastSlideIndex){
            this.nextArrow.classList.add('hidden')
        }else{
            if(this.nextArrow.classList.contains('hidden')) this.nextArrow.classList.remove('hidden')
        }
    }

    @Method()
        nextSlide(){
            this._moveSlide(this.activeSlide + 1)
        }

    @Method()
        prevSlide(){
            this._moveSlide(this.activeSlide - 1)
        }


    @Watch('builded')
        // Watcher set the display: none to the host element if component was not build correctly
        watchBuilded(){
            if(this.builded){
                if(this.host.classList.contains('failed')) this.host.classList.remove('failed')
            }
            else{
                this.host.classList.add('failed')
            }
        }

    @Watch('slider')
        // Watcher updates slides elements
        watchSlider(){
            //LIs
            this.slides = this.slider.children
            
            //LIs count
            this.slideCount = this.slides.length
        }

    @Watch('activeSlide')
        // Watcher updates slides elements
        watchActiveSlide(){
            this._updateSliderPosition()
            this._hideArrowsIfNeccessary()
        }



    componentDidLoad(){

        // Firstly check up if the set up is correct
        this._init()


        if(this.builded){
            this._setSlideWidth()
        }
    }


    render(){

        return [
            <div class='enl-slider'>
                <slot name="slides" />
            </div>
            ,
            <div 
                onClick={this.nextSlide.bind(this)}
                class='enl-slider-arrow enl-slider-arrow-next'>
                <slot name="next-slide" />
            </div>
            ,
            <div 
                onClick={this.prevSlide.bind(this)}
                class='enl-slider-arrow enl-slider-arrow-prev'>
                <slot name="prev-slide" />
            </div>,
        ]
    }
}