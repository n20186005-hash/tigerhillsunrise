# वास्तविक फोटो स्रोत

यो परियोजनाको वेबसाइट वास्तविक Wikimedia Commons फोटो प्रयोग गर्छ। निर्माण वातावरणमा बाह्य बाइनरी डाउनलोड उपलब्ध नभएकाले फोटोहरू स्थानीय JPG का रूपमा समावेश गर्न सकिएन; पृष्ठमा प्रत्यक्ष HTTPS स्रोत प्रयोग गरिएको छ।

यदि स्थानीयकरण गर्न चाहनुहुन्छ भने यी नाममा डाउनलोड गरेर `public/images/` मा राख्नुहोस् र `src/pages/index.astro` का चार URL लाई स्थानीय पथमा बदल्नुहोस्:

- `tiger-hill-kanchenjunga-dawn.jpg` — https://upload.wikimedia.org/wikipedia/commons/8/8a/Kanchenjunga_from_Tiger_Hill_at_dawn.jpg — Jejsiguoa — CC BY-SA 4.0
- `tiger-hill-sunrise.jpg` — https://upload.wikimedia.org/wikipedia/commons/d/d6/Sunrise_at_Tigerhill%2C_Darjeeling.jpg — Mouli Ghosh — CC BY-SA 4.0
- `tiger-hill-viewpoint.jpg` — https://upload.wikimedia.org/wikipedia/commons/2/2e/Tiger_Hill_sunrise_point%2C_Darjeeling.jpg — Aditya thaokar — CC BY-SA 3.0
- `tiger-hill-kanchenjunga-range.jpg` — https://upload.wikimedia.org/wikipedia/commons/9/9d/Kanchenjunga_range_from_Tiger_Hill%2C_Darjeeling.jpg — Jejsiguoa — CC BY-SA 4.0
