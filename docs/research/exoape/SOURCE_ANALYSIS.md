# Exo Ape Source Analysis

## What was inspected

- `https://www.exoape.com/?ref=godly`
- Nuxt bundles downloaded to `docs/research/exoape/`
- Main relevant bundles:
  - `e36d691.js`
  - `e3cea04.js`
  - `d5d162b.js`

## Global scroll engine

The page is not using normal document flow scrolling on desktop.

HTML/CSS structure:

- `html` is `position: fixed; overflow: hidden`
- `.app`, `.page`, `.scroll` are fixed/absolute full-screen containers
- `.is-touch .scroll` enables native `overflow-y: scroll`
- Desktop wheel input updates a virtual scroll target

Relevant source pattern from `e36d691.js`:

```js
onMouseWheel:function(t){
  if(!this.$root.loading){
    var o=t.deltaY;
    this.target+=o
  }
}
```

```js
onRaf:function(){
  this.isTouch&&(this.target=this.$refs.scroll.scrollTop),
  this.isTouch||(
    this.target=Object(f.a)(this.target,0,this.limit),
    this.current=Object(f.b)(this.current,this.target,.1),
    this.current<.1&&(this.current=0),
    this.transformSections()
  ),
  this.$root.scrollTarget=this.target
}
```

Interpretation:

- `target` is the desired scroll position.
- `current` eases toward `target` with a lerp factor of `0.1`.
- Visible sections are moved using `translate3d(0, -current px, 0)`.
- This is why the page feels heavy, cinematic, and inertial.

## Scroll timeline pattern

Multiple homepage sections compute local progress from element bounds, then drive a paused GSAP timeline.

Common pattern:

```js
setProgress:function(){
  var t=this.$el.getBoundingClientRect(),
      e=t.top-this.windowSize.height,
      o=t.height+this.windowSize.height;
  this.progress=Object(z.d)(e,0,o),
  this.scrollTl.progress(-this.progress)
}
```

Another variant:

```js
setProgress:function(){
  var t=this.$el.getBoundingClientRect(),
      e=-t.top,
      o=t.height;
  this.progress=Object(f.d)(e,0,o),
  this.scrollTl.progress(this.progress)
}
```

Interpretation:

- The scroll position is normalized into a local progress value.
- That progress scrubs a GSAP timeline.
- The animation is scroll-driven, but it is not necessarily video-time-driven.

## Video behavior

Video elements are played or paused based on viewport visibility.

Relevant source pattern:

```js
Object(S.a)(this.$el,this.windowSize.height,0)
  ? (this.setProgress(), this.inview || (this.$refs.video.play(), this.inview=!0))
  : this.inview && (this.$refs.video.pause(), this.inview=!1)
```

Interpretation:

- Videos play when their section is visible.
- Videos pause when the section leaves view.
- The showreel/media effect is mainly spatial timeline animation around a playing video.

## `currentTime` finding

`currentTime` exists in the downloaded source, but the matches are in video-player style code paths, not the homepage scroll showcase pattern.

This matters because the homepage effect should not be implemented as frame-by-frame video scrubbing unless a specific target section proves otherwise. The safer source-backed interpretation is:

- use autoplay/loop/muted video or visual media;
- use scroll progress to drive container scale, y/x movement, opacity, masks, and text-line transforms;
- pause/play video by intersection state.

## Home showreel / media transition model

Relevant source patterns from `e3cea04.js`:

```js
setProgress:function(){
  var t=this.$refs.wrapper.getBoundingClientRect(),
      e=t.top-this.windowSize.height,
      o=t.height+this.windowSize.height;
  this.progress=Object(z.d)(e,0,o),
  this.frame=Math.ceil(this.frames*-this.progress),
  this.scrollTl.progress(-this.progress)
}
```

```js
setAnimation:function(){
  var t=this.windowSize.width,
      e=.2*t;
  this.scrollTl=r.a.timeline({paused:!0,defaults:{ease:"linear"}})
}
```

Interpretation:

- Some components also calculate a `frame` index from scroll progress.
- The decisive behavior is still the same: normalized progress drives a paused timeline.
- The timeline contains transforms and opacity changes, not just media playback.

## Implementation implication for Vinuspread

To get closer to Exo Ape, Vinuspread should implement:

- desktop virtual scroll with `target`, `current`, and `lerp(current,target,0.1)`;
- section-local progress based on `getBoundingClientRect()`;
- sticky media sections whose GSAP or requestAnimationFrame timeline maps progress to:
  - media scale;
  - media y offset;
  - title-line x/y offsets;
  - opacity;
  - mask or clip-path expansion;
- video play/pause based on visibility;
- native scroll fallback for touch/mobile.

## Attached sidebar analysis validation

The attached Chrome sidebar analysis agrees with the local bundle inspection on the important points:

- `video.currentTime` is present, but it belongs to fullscreen/manual video player seeking rather than the homepage scroll transition.
- The homepage interaction model is `autoplay video + viewport play/pause + scroll-driven transform timeline`.
- The desktop scroll feel comes from virtual scroll: wheel delta updates `target`; `current` follows through `lerp(..., 0.1)`.
- Components subscribe to a single RAF-style update loop rather than each running disconnected animation clocks.

Implementation note applied to this project:

- `src/components/scroll-showcase.tsx` was revised to avoid React state updates on every animation frame.
- The component now stores progress in refs and writes animated values directly to DOM styles inside `requestAnimationFrame`.
- The media transition now includes scale, y movement, clip-path inset, border-radius interpolation, title-line motion, card opacity, and rail translation.
