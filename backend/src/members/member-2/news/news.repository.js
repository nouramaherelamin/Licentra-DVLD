const mockNews = [
  {
    id: 'news-001',
    title: '10 Essential Driving Safety Tips for New Drivers',
    date: '19 Oct 2024',
    summary: 'Learn the most important tips to stay safe on Egyptian highways and urban streets.',
    readTime: '4 min read',
  },
  {
    id: 'news-002',
    title: 'Upcoming Changes in License Renewal Process',
    date: '01 Oct 2024',
    summary: 'New digital self-service updates to make the renewal process faster and fully paperless.',
    readTime: '3 min read',
  },
  {
    id: 'news-003',
    title: 'How to Apply for an International Driving License',
    date: '28 Sep 2024',
    summary: 'Everything you need to know before driving abroad with an authenticated Egyptian permit.',
    readTime: '5 min read',
  },
];

export const newsRepository = {
  findAll: async () => [...mockNews],
  findById: async (id) => mockNews.find((n) => n.id === id) || null,
};
