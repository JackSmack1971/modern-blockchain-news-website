import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  console.log('\uD83C\uDF33 Starting database seed...')

  console.log('\uD83D\uDCC1 Creating categories...')
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'bitcoin' },
      update: {},
      create: {
        name: 'Bitcoin',
        slug: 'bitcoin',
        description: 'Latest news and updates about Bitcoin, the first cryptocurrency',
        color: '#F7931A',
        icon: 'bitcoin',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ethereum' },
      update: {},
      create: {
        name: 'Ethereum',
        slug: 'ethereum',
        description: 'Ethereum network news, DeFi, and smart contract updates',
        color: '#627EEA',
        icon: 'ethereum',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'defi' },
      update: {},
      create: {
        name: 'DeFi',
        slug: 'defi',
        description: 'Decentralized Finance protocols, yield farming, and DeFi news',
        color: '#00D4AA',
        icon: 'coins',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'nft' },
      update: {},
      create: {
        name: 'NFT',
        slug: 'nft',
        description: 'Non-Fungible Tokens, digital art, and collectibles',
        color: '#FF6B6B',
        icon: 'image',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'altcoins' },
      update: {},
      create: {
        name: 'Altcoins',
        slug: 'altcoins',
        description: 'Alternative cryptocurrencies and new token projects',
        color: '#4ECDC4',
        icon: 'trending-up',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'regulation' },
      update: {},
      create: {
        name: 'Regulation',
        slug: 'regulation',
        description: 'Government policies, legal updates, and regulatory news',
        color: '#95A5A6',
        icon: 'shield',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mining' },
      update: {},
      create: {
        name: 'Mining',
        slug: 'mining',
        description: 'Cryptocurrency mining, hardware, and energy consumption',
        color: '#E67E22',
        icon: 'cpu',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'web3' },
      update: {},
      create: {
        name: 'Web3',
        slug: 'web3',
        description: 'Decentralized internet, blockchain infrastructure, and Web3 tools',
        color: '#9B59B6',
        icon: 'globe',
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  console.log('\uD83C\uDF02 Creating tags...')
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'breaking-news' },
      update: {},
      create: { name: 'Breaking News', slug: 'breaking-news', color: '#E74C3C' },
    }),
    prisma.tag.upsert({
      where: { slug: 'analysis' },
      update: {},
      create: { name: 'Analysis', slug: 'analysis', color: '#3498DB' },
    }),
    prisma.tag.upsert({
      where: { slug: 'tutorial' },
      update: {},
      create: { name: 'Tutorial', slug: 'tutorial', color: '#2ECC71' },
    }),
    prisma.tag.upsert({
      where: { slug: 'market-update' },
      update: {},
      create: { name: 'Market Update', slug: 'market-update', color: '#F39C12' },
    }),
    prisma.tag.upsert({
      where: { slug: 'institutional' },
      update: {},
      create: { name: 'Institutional', slug: 'institutional', color: '#34495E' },
    }),
    prisma.tag.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: 'Technology', slug: 'technology', color: '#9B59B6' },
    }),
    prisma.tag.upsert({
      where: { slug: 'security' },
      update: {},
      create: { name: 'Security', slug: 'security', color: '#E67E22' },
    }),
    prisma.tag.upsert({
      where: { slug: 'adoption' },
      update: {},
      create: { name: 'Adoption', slug: 'adoption', color: '#1ABC9C' },
    }),
  ])

  console.log(`✅ Created ${tags.length} tags`)

  console.log('\uD83D\uDC64 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123!', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@blockchainnews.com' },
    update: {},
    create: {
      email: 'admin@blockchainnews.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created admin user')

  console.log('\u270D\uFE0F Creating author users...')
  const authors = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@blockchainnews.com' },
      update: {},
      create: {
        email: 'alice@blockchainnews.com',
        name: 'Alice Johnson',
        password: await bcrypt.hash('author123!', 12),
        role: Role.AUTHOR,
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@blockchainnews.com' },
      update: {},
      create: {
        email: 'bob@blockchainnews.com',
        name: 'Bob Smith',
        password: await bcrypt.hash('author123!', 12),
        role: Role.AUTHOR,
        emailVerified: new Date(),
      },
    }),
  ])

  console.log(`✅ Created ${authors.length} authors`)

  console.log('\uD83D\uDCF0 Creating sample articles...')
  const bitcoinCategory = categories.find((c) => c.slug === 'bitcoin')!
  const ethereumCategory = categories.find((c) => c.slug === 'ethereum')!
  const defiCategory = categories.find((c) => c.slug === 'defi')!

  const breakingNewsTag = tags.find((t) => t.slug === 'breaking-news')!
  const analysisTag = tags.find((t) => t.slug === 'analysis')!
  const marketUpdateTag = tags.find((t) => t.slug === 'market-update')!

  const sampleArticles = [
    {
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      slug: 'bitcoin-reaches-new-all-time-high-institutional-adoption',
      excerpt:
        'Bitcoin has surged to unprecedented levels as major institutions continue to add cryptocurrency to their balance sheets.',
      content: `
# Bitcoin Reaches New All-Time High Amid Institutional Adoption

Bitcoin (BTC) has once again made headlines by reaching a new all-time high, breaking through previous resistance levels with unprecedented momentum. This surge comes amid increased institutional adoption and growing acceptance of cryptocurrency as a legitimate asset class.

## Key Drivers Behind the Rally

### Institutional Investment
Major corporations and financial institutions have been steadily adding Bitcoin to their balance sheets. Companies like MicroStrategy, Tesla, and Square have publicly disclosed significant Bitcoin holdings, signaling confidence in the cryptocurrency's long-term value proposition.

### Regulatory Clarity
Recent regulatory developments have provided much-needed clarity for institutional investors. The approval of Bitcoin ETFs and clearer guidance from financial regulators have removed many barriers to institutional participation.

### Macroeconomic Factors
Concerns about inflation and currency debasement have led investors to seek alternative stores of value. Bitcoin's fixed supply of 21 million coins makes it an attractive hedge against monetary inflation.

## Market Analysis

The current price action suggests strong underlying demand and limited selling pressure. On-chain metrics indicate that long-term holders are continuing to accumulate, while exchange reserves continue to decline.

### Technical Outlook
- **Support Level**: $45,000
- **Resistance Level**: $75,000
- **RSI**: Currently at 78 (overbought territory)
- **Moving Averages**: All major MAs trending upward

## What This Means for the Market

This price milestone represents more than just a number – it's a validation of Bitcoin's role in the global financial system. As adoption continues to grow, we may see increased volatility but also greater price stability over longer time periods.

### Looking Ahead
Analysts remain optimistic about Bitcoin's long-term prospects, with some predicting even higher targets as adoption continues to accelerate. However, investors should remain cautious of potential corrections in the near term.

*This article is for informational purposes only and does not constitute financial advice.*
      `,
      authorId: authors[0].id,
      categoryId: bitcoinCategory.id,
      published: true,
      featured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Ethereum 2.0 Upgrade Shows Promising Results for Network Efficiency',
      slug: 'ethereum-2-upgrade-promising-results-network-efficiency',
      excerpt:
        'The latest Ethereum 2.0 upgrades have significantly improved network efficiency and reduced gas fees for users.',
      content: `
# Ethereum 2.0 Upgrade Shows Promising Results for Network Efficiency

The Ethereum network has undergone significant improvements following the latest upgrades, with users experiencing reduced gas fees and faster transaction processing times.

## Key Improvements

- **Gas Fee Reduction**: Average transaction costs down 60%
- **Faster Processing**: Block confirmation times improved by 40%
- **Energy Efficiency**: 99.95% reduction in energy consumption
- **Network Stability**: Improved uptime and reduced congestion

## Impact on DeFi Ecosystem

The improvements have been particularly beneficial for the DeFi ecosystem, enabling smaller transactions to be economically viable once again.

*This article provides technical analysis and should not be considered financial advice.*
      `,
      authorId: authors[1].id,
      categoryId: ethereumCategory.id,
      published: true,
      featured: false,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      title: 'DeFi Total Value Locked Surpasses $100 Billion Milestone',
      slug: 'defi-total-value-locked-surpasses-100-billion-milestone',
      excerpt:
        'The decentralized finance ecosystem has reached a new milestone with over $100 billion in total value locked across protocols.',
      content: `
# DeFi Total Value Locked Surpasses $100 Billion Milestone

The decentralized finance (DeFi) ecosystem has achieved another significant milestone, with the total value locked (TVL) across all protocols surpassing $100 billion for the first time.

## Breaking Down the Numbers

The $100 billion TVL represents a remarkable growth trajectory for the DeFi space, which started with just a few million dollars locked in protocols just three years ago.

### Top Protocols by TVL
1. **Uniswap**: $15.2B
2. **Aave**: $12.8B
3. **Compound**: $8.9B
4. **MakerDAO**: $7.5B
5. **Curve**: $6.3B

## Market Implications

This milestone demonstrates the maturation of DeFi as a legitimate alternative to traditional finance, with increasing institutional participation and mainstream adoption.

*This analysis is for informational purposes only.*
      `,
      authorId: authors[0].id,
      categoryId: defiCategory.id,
      published: true,
      featured: false,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]

  for (const articleData of sampleArticles) {
    const article = await prisma.article.create({ data: articleData })

    if (articleData.title.includes('Breaking') || articleData.title.includes('All-Time High')) {
      await prisma.articleTag.create({
        data: { articleId: article.id, tagId: breakingNewsTag.id },
      })
    }

    if (articleData.title.includes('Analysis') || articleData.title.includes('Results')) {
      await prisma.articleTag.create({
        data: { articleId: article.id, tagId: analysisTag.id },
      })
    }

    if (articleData.title.includes('High') || articleData.title.includes('Milestone')) {
      await prisma.articleTag.create({
        data: { articleId: article.id, tagId: marketUpdateTag.id },
      })
    }
  }

  console.log(`✅ Created ${sampleArticles.length} sample articles`)

  console.log('\uD83D\uDCB0 Creating cryptocurrency data...')
  const cryptocurrencies = await Promise.all([
    prisma.cryptoCurrency.upsert({
      where: { coinId: 'bitcoin' },
      update: {},
      create: {
        coinId: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        currentPrice: 65000,
        marketCap: BigInt('1280000000000'),
        rank: 1,
        priceChange24h: 2.5,
        lastUpdated: new Date(),
      },
    }),
    prisma.cryptoCurrency.upsert({
      where: { coinId: 'ethereum' },
      update: {},
      create: {
        coinId: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        currentPrice: 3500,
        marketCap: BigInt('420000000000'),
        rank: 2,
        priceChange24h: 1.8,
        lastUpdated: new Date(),
      },
    }),
    prisma.cryptoCurrency.upsert({
      where: { coinId: 'binancecoin' },
      update: {},
      create: {
        coinId: 'binancecoin',
        symbol: 'BNB',
        name: 'BNB',
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        currentPrice: 450,
        marketCap: BigInt('67000000000'),
        rank: 3,
        priceChange24h: -0.5,
        lastUpdated: new Date(),
      },
    }),
  ])

  console.log(`✅ Created ${cryptocurrencies.length} cryptocurrencies`)

  console.log('\u2699\uFE0F Creating system settings...')
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: { key: 'site_name', value: 'Blockchain News Hub', type: 'STRING' },
    }),
    prisma.setting.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: 'Your trusted source for blockchain and cryptocurrency news',
        type: 'STRING',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'articles_per_page' },
      update: {},
      create: { key: 'articles_per_page', value: '12', type: 'NUMBER' },
    }),
    prisma.setting.upsert({
      where: { key: 'enable_comments' },
      update: {},
      create: { key: 'enable_comments', value: 'true', type: 'BOOLEAN' },
    }),
    prisma.setting.upsert({
      where: { key: 'maintenance_mode' },
      update: {},
      create: { key: 'maintenance_mode', value: 'false', type: 'BOOLEAN' },
    }),
  ])

  console.log(`✅ Created ${settings.length} system settings`)

  console.log('\n\uD83C\uDF89 Database seed completed successfully!')
  console.log('\n\uD83D\uDCCB Summary:')
  console.log(`   • ${categories.length} categories created`)
  console.log(`   • ${tags.length} tags created`)
  console.log('   • 1 admin user created (admin@blockchainnews.com)')
  console.log(`   • ${authors.length} author users created`)
  console.log(`   • ${sampleArticles.length} sample articles created`)
  console.log(`   • ${cryptocurrencies.length} cryptocurrencies created`)
  console.log(`   • ${settings.length} system settings created`)
  console.log('\n\uD83D\uDD10 Default Admin Credentials:')
  console.log('   Email: admin@blockchainnews.com')
  console.log('   Password: admin123!')
  console.log('\n\u26A0\uFE0F  Remember to change the default password in production!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
