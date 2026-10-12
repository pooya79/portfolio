// Biography, experience, and education supplied by Pouya.
// Tech stack, philosophy, and interests are still awaiting full confirmation.
export const biography = {
  eyebrow: 'People · Products · Engineering',
  subtitle: 'The person, principles, and curiosity behind the work.',
  introduction: 'I’m Pouya Fallah, an AI product engineer. I turn ideas into working products fast, building full-stack apps from the first prototype through to launch. I combine modern software engineering with AI-native development workflows, integrating AI wherever it makes the product more useful.',
  quote: 'When we try to pick out anything by itself, we find it hitched to everything else in the Universe.',
  quoteAuthor: 'John Muir',
  quoteSource: 'https://www.nps.gov/articles/what-s-the-buzz-how-bees-interrelate-with-birds-wildflowers-and-deer.htm',
}
export const journey = [
  { period: '2018 – 2026', title: 'Exploring Software & AI', description: 'Learned by building: React and TypeScript on the frontend, Python with Django and FastAPI on the backend, and AI and data science with PyTorch, NumPy, and pandas.', icon: 'code', image: 'landscape', position: '55% 55%' },
  { period: '2023 – 2025', title: 'Researcher · SLPL, Sharif', description: 'Researched speech and language at Sharif University’s Speech Language Processing Lab (SLPL), with a master’s thesis focused on robust Persian speech recognition.', icon: 'research', image: 'garden', position: '70% 65%' },
  { period: '2024 – 2025', title: 'Applied AI · Asr Gooyesh Pardaz', description: 'Trained automatic speech recognition models, built chatbots, and deployed AI models, bringing speech and language systems into practical use.', icon: 'brain', image: 'workshop', position: '65% 60%' },
  { period: 'May 2025 – Present', title: 'AI Engineer · Jooyeshgar', description: 'Build chatbots, retrieval-augmented generation (RAG) systems, agents, and automation in Python and PHP, integrating AI solutions into a PHP and Laravel codebase.', icon: 'rocket', image: 'garden', position: '90% 55%' },
] as const
export const education = [
  { degree: 'M.Sc. in Artificial Intelligence & Robotics', institution: 'Sharif University of Technology', period: '2023 – 2026', thesis: 'Robust Speech Recognition in the Persian Language', topics: ['Speech Recognition', 'Persian NLP', 'AI'], image: 'sharif', position: '0% 50%' },
  { degree: 'B.Sc. in Electrical Engineering', institution: 'Amirkabir University of Technology (Tehran Polytechnic)', period: '2018 – 2023', thesis: 'Reinforcement Learning for a Pick-and-Place Robotic Arm', topics: ['Reinforcement Learning', 'Robotics', 'Electrical Engineering'], image: 'amirkabir', position: '50% 50%' },
] as const
export const techStack = [
  { category: 'Languages', icon: 'code', tools: ['Python', 'Go', 'JavaScript', 'SQL'], additional: ['TypeScript', 'Bash'] },
  { category: 'Backend & Infra', icon: 'server', tools: ['FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Linux'], additional: ['Nginx', 'RabbitMQ'] },
  { category: 'Frontend', icon: 'desktop', tools: ['HTMX', 'Tailwind CSS', 'React', 'Next.js'], additional: ['Vite', 'Motion'] },
  { category: 'AI / ML', icon: 'brain', tools: ['PyTorch', 'LLMs', 'Speech / ASR', 'Computer Vision', 'AI Systems'], additional: ['Hugging Face', 'NumPy'] },
  { category: 'Tools', icon: 'tools', tools: ['Git', 'Docker', 'Linux', 'VS Code', 'Notion', 'Figma'], additional: ['Jupyter', 'GitHub Actions'] },
] as const
export const philosophy = [
  { title: 'Human-Centered', description: 'Build for people, not just metrics.', icon: 'leaf' },
  { title: 'Real-World Impact', description: 'Turn ideas into useful solutions.', icon: 'people' },
  { title: 'Sustainable Progress', description: 'Cleaner cities. Healthier lives.', icon: 'plant' },
  { title: 'Care & Inclusion', description: 'Consider who can use what we build, and who might be left out.', icon: 'heart' },
] as const
export const interests = [
  { label: 'Nature & Hiking', icon: 'plant' },
  { label: 'Reading & Learning', icon: 'book' },
  { label: 'Photography', icon: 'camera' },
  { label: 'Cycling', icon: 'bicycle' },
] as const
