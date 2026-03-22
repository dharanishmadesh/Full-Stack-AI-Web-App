# 🎬 FitCoach AI - Animation Guide

Complete reference for all animations and effects available in the app.

## 🎨 CSS Animation Classes

### Entry Animations

#### Fade In Up
```jsx
<div className="fade-in-up">Content</div>
```
- Fades in while sliding up 30px
- Duration: 0.6s
- Easing: cubic-bezier(0.16, 1, 0.3, 1)

#### Slide In Left
```jsx
<div className="slide-in-left">Content</div>
```
- Slides in from left (-50px)
- Duration: 0.6s
- Perfect for text and headers

#### Slide In Right
```jsx
<div className="slide-in-right">Content</div>
```
- Slides in from right (50px)
- Duration: 0.6s
- Great for badges and labels

#### Zoom In
```jsx
<div className="zoom-in">Content</div>
```
- Scales from 0.8 to 1.0
- Duration: 0.5s
- Ideal for icons and emojis

#### Section Reveal
```jsx
<div className="section-reveal section-reveal-1">Content</div>
```
- Fades in with blur effect
- Staggered delays: `-1` through `-4`
- Duration: 1.2s

### Continuous Animations

#### Float Animation
```jsx
<div className="float-animation">Content</div>
```
- Gentle up and down motion
- Duration: 6s
- Infinite loop
- Perfect for cards

#### Breathe Animation
```jsx
<div className="breathe-animation">Content</div>
```
- Subtle scale pulse (1.0 to 1.05)
- Duration: 4s
- Infinite loop
- Great for icons

#### Bounce Animation
```jsx
<div className="bounce-animation">Content</div>
```
- Bounces up and down
- Duration: 2s
- Infinite loop
- Eye-catching for CTAs

#### Rotate Animation
```jsx
<div className="rotate-animation">Content</div>
```
- Full 360° rotation
- Duration: 20s (customizable)
- Infinite loop
- Subtle background effect

#### Glow Pulse
```jsx
<div className="glow-pulse">Content</div>
```
- Pulsing box shadow
- Duration: 3s
- Infinite loop
- Adds premium feel

### Hover Effects

#### Hover Scale
```jsx
<button className="hover-scale">Click me</button>
```
- Scales to 1.05 on hover
- Duration: 0.4s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

#### Hover Lift
```jsx
<div className="hover-lift">Content</div>
```
- Lifts up 8px on hover
- Adds shadow
- Duration: 0.3s

#### Ripple Effect
```jsx
<button className="ripple-effect">Click me</button>
```
- Ripple spreads from click point
- Duration: 0.6s
- Automatic on click

### Special Effects

#### Card Shine
```jsx
<div className="card-shine">Content</div>
```
- Light sweeps across surface
- Duration: 3s
- Infinite loop
- Adds premium feel

#### Gradient Animate
```jsx
<div className="gradient-animate">Content</div>
```
- Background gradient shifts
- Duration: 8s
- Infinite loop
- Requires gradient background

#### Text Glow Animate
```jsx
<span className="text-glow-animate">Text</span>
```
- Pulsing text shadow
- Duration: 3s
- Infinite loop
- Great for headings

### Stagger Animations

#### Stagger Children
```jsx
<div className="stagger-children">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```
- Children appear sequentially
- Delays: 0.1s, 0.2s, 0.3s, etc.
- Up to 6 children supported

## 🎯 Component-Specific Animations

### Stats Cards

```jsx
<StatsCard
  icon={Flame}
  value={7}
  label="Streak"
  color="#00ff87"
  delay={0}  // Stagger delay in ms
/>
```

Features:
- Count-up animation for numbers
- Pulse ring on icon
- Blinking trend dot
- Hover lift effect
- Number glow on load

### Workout Form

```jsx
<WorkoutForm onWorkoutLogged={handleLog} />
```

Features:
- Activity buttons zoom in with stagger
- Hover scale on buttons
- Ripple effect on clicks
- Magnetic submit button
- Card shine effect
- Glow pulse on icon

### Chat Widget

```jsx
<ChatWidget />
```

Features:
- Breathing animation when closed
- Pulse ring around button
- Slide-in panel animation
- Fade-in messages
- Bouncing typing indicator
- Zoom-in emojis

### Motivation Panel

```jsx
<MotivationPanel workouts={workouts} />
```

Features:
- Rotating icon animation
- Hover scale on tone buttons
- Sparkle effects on message
- Typewriter text effect
- Card shine
- Glow pulse

## 🎨 Color-Specific Glows

### Green Glow
```jsx
<div className="glow-border-green">Content</div>
```
- Color: #00ff87
- Box shadow with glow
- Border color matched

### Cyan Glow
```jsx
<div className="glow-border-cyan">Content</div>
```
- Color: #60efff
- Box shadow with glow
- Border color matched

## 🔧 Custom Animation Examples

### Delayed Fade In
```jsx
<div 
  className="fade-in-up"
  style={{ animationDelay: '0.5s' }}
>
  Content
</div>
```

### Faster Rotation
```jsx
<div 
  className="rotate-animation"
  style={{ animationDuration: '10s' }}
>
  Content
</div>
```

### Custom Hover Scale
```jsx
<button 
  className="hover-scale"
  style={{ '--scale': 1.1 }}
>
  Click me
</button>
```

## 🎭 Animation Combinations

### Premium Card
```jsx
<div className="glass-card hover-lift card-shine float-animation">
  <div className="breathe-animation">
    Icon
  </div>
  <div className="fade-in-up">
    Content
  </div>
</div>
```

### Attention-Grabbing Button
```jsx
<button className="btn-primary ripple-effect hover-scale glow-pulse">
  <span className="bounce-animation">🎯</span>
  Click Me!
</button>
```

### Animated Header
```jsx
<div className="slide-in-left">
  <div className="glow-pulse breathe-animation">
    <Icon />
  </div>
  <h1 className="logo-gradient text-glow-animate">
    Title
  </h1>
</div>
```

## 📱 Responsive Considerations

### Mobile Optimization
```css
@media (max-width: 768px) {
  .float-animation {
    animation-duration: 8s; /* Slower on mobile */
  }
  
  .hover-lift:hover {
    transform: translateY(-4px); /* Less lift */
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎯 Performance Tips

### Do's ✅
- Use `transform` and `opacity` for animations
- Apply `will-change` for complex animations
- Use CSS animations over JavaScript when possible
- Limit number of simultaneous animations
- Use `requestAnimationFrame` for JS animations

### Don'ts ❌
- Don't animate `width`, `height`, `top`, `left`
- Don't use too many particles (keep under 30)
- Don't animate on scroll without throttling
- Don't use heavy blur on mobile
- Don't chain too many animations

## 🎨 Creating Custom Animations

### Step 1: Define Keyframes
```css
@keyframes myAnimation {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Step 2: Create Class
```css
.my-animation {
  animation: myAnimation 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### Step 3: Use in Component
```jsx
<div className="my-animation">Content</div>
```

## 🌟 Advanced Techniques

### Mouse-Following Spotlight
```jsx
<div 
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  }}
  className="spotlight-card"
>
  Content
</div>
```

### Magnetic Button
```jsx
<button
  className="magnetic-btn"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  }}
>
  Magnetic Button
</button>
```

### Parallax Scroll
```jsx
useEffect(() => {
  const handleScroll = () => {
    const scrolled = window.scrollY;
    element.style.transform = `translateY(${scrolled * 0.5}px)`;
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 📚 Animation Timing Functions

```css
/* Ease out (fast start, slow end) */
cubic-bezier(0.16, 1, 0.3, 1)

/* Bounce */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Smooth */
cubic-bezier(0.4, 0, 0.2, 1)

/* Sharp */
cubic-bezier(0.4, 0, 0.6, 1)
```

## 🎬 Animation Checklist

Before deploying:
- [ ] Test all animations on Chrome, Firefox, Safari
- [ ] Verify mobile performance
- [ ] Check reduced motion support
- [ ] Test on low-end devices
- [ ] Verify no layout shift
- [ ] Check animation timing
- [ ] Test hover states on touch devices
- [ ] Verify accessibility

---

**Use these animations to create engaging, professional user experiences! 🎨✨**
