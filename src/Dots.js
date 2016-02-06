class Dots {
  init(core) {
    this.slides = core.modules.slides;

    this.slides
      .on('change', this.lightDot.bind(this));

    this.fillDots();
  }

  makeDot() {
    let dot = document.createElement('div');

    dot.className = 'dot';
    this.$dot = dot;
  }

  focus($dot) {
    clearInterval(this.interval);
    this.interval = setInterval(_ => {
      let sliderCenter = this.$.getBoundingClientRect().width / 2 | 0;
      let rect = $dot.getBoundingClientRect();
      let dotCenter = rect.left + rect.width / 2 | 0;
      let scrollLeft = this.$.scrollLeft;

      this.$.scrollLeft += dotCenter > sliderCenter ? 1 : -1;

      if (dotCenter == sliderCenter || scrollLeft == this.$.scrollLeft)
        clearInterval(this.interval);
    });

    $dot.classList.toggle('active');
  }

  lightDot(which) {
    let id = which || this.slides.slide;
    let $dots = this.$.children[0].children;

    if (this.$prevDot != undefined)
      $dots[this.$prevDot].classList.toggle('active');

    this.focus($dots[id]);
    this.$prevDot = id;
  }

  fillDots() {
    let dotsId = this.slides.$.children.length;
    let $dots = [];

    this.$.innerHTML = '<div class="dotsWrapper"></div>';

    if (!this.$dot)
      this.makeDot();

    while (dotsId--)
      $dots.push(this.$dot.cloneNode());

    $dots.forEach(($dot, id) => {
      $dot.onclick = _=> this.slides.changeTo(id);
      this.$.children[0].appendChild($dot);
    });

    this.lightDot();
  }
}

export default Dots;
