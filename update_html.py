import re

path = 'c:/Users/User/Desktop/13AL Landing Page Code/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update tailwind config
content = content.replace(
    'colors: { primary: "#3B82F6", navy: "#0F172A", muted: "#64748B", wa: "#25D366" }',
    'colors: { primary: "#2563EB", navy: "#0F172A", muted: "#64748B", wa: "#25D366", gold: "#F59E0B" }'
)

# 2. Hero Background inline style
content = re.sub(
    r'<div class="absolute inset-0 pointer-events-none"\s+style="background:radial-gradient\(ellipse 80% 60% at 50% -10%, rgba\(59,130,246,\.09\) 0%, transparent 70%\);">\s+</div>',
    '<div class="absolute inset-0 pointer-events-none hero-gradient-overlay">\n        </div>',
    content
)

# 3. Enhance paddings
content = content.replace('py-24 lg:pt-48 lg:pb-32', 'py-32 lg:pt-56 lg:pb-40')
content = content.replace('class="py-24 ', 'class="py-28 lg:py-32 ')
content = content.replace('id="problem" class="py-24 ', 'id="problem" class="py-28 lg:py-32 ')
content = content.replace('id="features" class="py-24 ', 'id="features" class="py-28 lg:py-32 ')
content = content.replace('id="video" class="py-24 ', 'id="video" class="py-28 lg:py-32 ')
content = content.replace('id="reviews" class="py-24 ', 'id="reviews" class="py-28 lg:py-32 ')
content = content.replace('id="pricing" class="py-24 ', 'id="pricing" class="py-28 lg:py-32 ')
content = content.replace('id="service-area" class="py-24 ', 'id="service-area" class="py-28 lg:py-32 ')
content = content.replace('id="faq" class="py-24 ', 'id="faq" class="py-28 lg:py-32 ')

# 4. Enhance typography in hero
content = content.replace(
    'text-5xl sm:text-6xl md:text-7xl text-navy leading-tight',
    'text-5xl sm:text-6xl md:text-7xl text-navy leading-snug tracking-tight'
)

# 5. Fix the bonus gradient
content = content.replace(
    '<span class="gradient-text">RM 380 in FREE Bonuses</span>',
    '<span class="gradient-gold">RM 380 in FREE Bonuses</span>'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done writing index.html changes")
