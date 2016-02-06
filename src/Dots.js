class Dots {
  constructor($core) {
    let domModules = $core.domModules;

    if (domModules.dots) {
      [this.$dots, this.slides] = [domModules.dots, $core.modules.slides];

      this.slides
        .on('change', n => this.lightDot(n));

      this.fillDots();
    }
  }

  makeDot() {
    let dot = document.createElement('div');
    dot.className = 'dot';
    this.$dot = dot;
  }

  lightDot(which) {
    let id = which || this.slides.slide;
    let $dots = this.$dots.children[0].children;

    if (this.$prevDot != undefined)
      $dots[this.$prevDot].classList.toggle('active');

    $dots[id].classList.toggle('active');
    this.$prevDot = id;
  }

  fillDots() {
    let dotsId = this.slides.$.children.length;
    let $dots = [];

    this.$dots.innerHTML = '<div class="dotsWrapper"></div>';
    if (!this.$dot) this.makeDot();

    while (dotsId--) $dots.push(this.$dot.cloneNode());

    $dots.forEach(($dot, id) => {
      $dot.onclick = _=> this.slides.changeTo(id);
      this.$dots.children[0].appendChild($dot);
    });

    this.lightDot();
  }
}

export default Dots;
