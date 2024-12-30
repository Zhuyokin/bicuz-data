<template>
  <div class="container-box px-3 container">
    <div class="mb-5">
      <div class="num-font flex items-center justify-between text-2xl">
        <span>7*24快讯</span>
        <span class="flex items-center justify-between gap-2">
          <span class="text-xl color-#1f1f22">只看标题</span>
          <van-switch v-model="checked" size="20px" />
        </span>
      </div>
    </div>
    <van-steps
      direction="vertical"
      :active="0"
      active-icon="hot-o"
      active-color="#e44d66"
    >
      <van-step v-for="(item, index) in news.items" :key="index">
        <h3 class="text-l mb-2">
          {{ item.title }}
        </h3>
        <div v-if="!checked" class="mb-2">
          <van-rich-text v-html="item.content" />
        </div>
        <div class="flex justify-between">
          <span>{{
            timeFormat(item.timestamp, (format = "YYYY-MM-DD HH:mm"))
          }}</span>
          <span class="href-link" @click="nav(item.source_url)">原文链接</span>
          <span>
            <van-icon name="share" color="#1989fa" />
            <span class="href-link" @click="share(item.source_url)">分享</span>
          </span>
        </div>
      </van-step>
    </van-steps>

    <van-share-sheet
      v-model:show="showShare"
      title="分享原文链接"
      :options="options"
      @select="onSelect"
    />

    <!-- <van-popup v-model:show="showNav" round :style="{ padding: '30px', height: '30%' }">
      <span class="w-full">
        {{ navLink }}
      </span>
    </van-popup> -->
  </div>
</template>

<script setup lang="ts">
import { timeFormat } from '@/utils/index'
import { cryptoApi } from '~/api'

const showShare = ref(false)
const checked = ref(true)
const curLink = ref('')
const navLink = ref('')
const options = [
  { name: '复制链接', icon: 'link' },
//   { name: '分享海报', icon: 'poster' },
//   { name: '二维码', icon: 'qrcode' },
]
const news = ref({
  items: [
    {
      title:
        '以太坊联合创始人 Vitalik Buterin 向泰国动物园捐赠了 29.3 万美元，“收养”了一只风靡全球的侏儒河马 Moo Deng',
      content:
        '<p>根据《The Block》的报道，以太坊联合创始人维塔利克·布特林（Vitalik Buterin）为泰国的一家动物园捐赠了超过 293,000 美元，以“收养”在 2024 年走红的小河马 Moo Deng。</p><p>布特林表示，他的捐款是为了感谢泰国人民在与以太坊相关的活动中给予的热情款待，包括在曼谷举行的 11 月 Devcon SEA 会议。</p><p>布特林捐赠了至少 10,000,000 泰铢（约 293,000 美元），成为了 Khao Kheow Open Zoo 的“养父”，该动物园饲养着 Moo Deng。动物园在 X 上对此表示：“我们期待在接下来的两年内与您合作，造福 Khao Kheow Open Zoo 社区及所有来访者。”</p><p>Moo Deng 是一种濒危的小河马，体型远小于其“普通河马”亲属。她的名字通过公众投票选出，翻译为英文是“弹跳的猪”。这只几个月大的动物在 2024 年因其活泼可爱的形象而迅速走红，尤其是她试图咬护理人员的视频和照片引发了大量关注。</p><p>布特林的捐款将用于“Khao Kheow Open Zoo 的运营、野生动物赞助项目，以及为 Moo Deng 和她的家人开发专属展览”，他在 X 上发布的信中提到。</p><p>该捐款是在布特林访问动物园后做出的，以表彰泰国及泰国人民在 2024 年以太坊活动中的“美好款待”，包括 11 月的 Devcon SEA 会议。</p><p>布特林在信中表示：“我代表整个以太坊生态系统，向这个国家的所有人表示感谢和友谊的姿态……没有比送给所有泰国人民所珍爱的 Moo Deng 更好的方式来表达这种情感了，她已成为国际舞台上最意想不到且重要的泰国名人之一。”</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-co-founder-vitalik-buterin-adopts-viral-pygmy-hippo-moo-deng-with-293-000-donation-to-thai-zoo?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s0ad8f60a_sud.jpeg',
      source_url:
        'https://www.theblock.co/post/332412/ethereum-co-founder-vitalik-buterin-adopts-viral-pygmy-hippo-moo-deng-with-293000-donation-to-thai-zoo',
      timestamp: 1735291937000,
      tags: [
        {
          name: 'V 神',
        },
      ],
    },
    {
      title: 'Bitget 宣布代币合并，BGB 价格在市场整体下跌的情况下上涨',
      content:
        '<p>根据《The Block》的报道，Bitget 将把 Bitget 钱包代币（BWB）合并到 Bitget 代币（BGB）中，将这两者统一为一个单一的生态系统代币。</p><p>目前，BGB 是在广泛下跌的市场中唯一一个出现显著上涨的主要加密货币。</p><p>Bitget 计划将 BWB 合并为 BGB，使其成为集中式加密货币交易所和去中心化 Bitget 钱包的统一生态系统代币。</p><p>根据新闻稿，统一后的 BGB 将与 Bitget 钱包集成，支持公平启动池（Fair Launchpool）和多链 gas 费支付“在大多数链上场景中”。公司表示，它还将与公共链和去中心化金融（DeFi）的主要生态系统集成，“使链上交易服务成为可能，同时逐渐成为主流借贷和质押协议的核心质押资产。”</p><p>Bitget 和 Bitget 钱包的用户总数超过 1 亿，Bitget 宣称。</p><p>此外，公司还计划将 BGB 扩展到离线支付金融（PayFi）应用，允许用于餐饮、旅行和购物等活动的支付。</p><p>公司澄清，合并不会影响 BGB 的总供应量，兑换比率约为 11.68 BWB 兑换 1 BGB。从明天（12 月 27 日）下午 4:00（中国时间 UTC+8）起，Bitget 平台上的 BWB 相关服务将停止。</p>',
      url: 'https://tokeninsight.com/zh/news/bitget-announces-token-merger-bgb-price-increases-amid-market-wide-declines?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/lhgki7658.jpeg',
      source_url: 'https://www.theblock.co/post/332351/bitget-token-merger',
      timestamp: 1735291362000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: '韩国对朝鲜的加密黑客、IT人员实施制裁',
      content:
        '<p>根据《The Block》的报道，韩国对 15 名朝鲜个人和一个实体实施制裁，这些人和实体涉及非法网络活动，包括加密货币盗窃。</p><p>根据 Chainalysis 的数据，朝鲜黑客在 2024 年盗取了价值 13.4 亿美元的加密货币。</p><p>韩国政府今天宣布，对涉及非法网络活动的 15 名朝鲜个人和一个实体实施制裁，这些活动包括加密货币盗窃。</p><p>这 15 名朝鲜个人为第 313 局工作，该组织隶属于朝鲜劳动党机器制造工业部，韩国外交部在一份声明中表示。该部门自 2016 年以来受到联合国安全理事会制裁，负责朝鲜的武器生产，包括其弹道导弹计划。</p><p>声明指出：“朝鲜 IT 人员被派往中国、俄罗斯、东南亚和非洲，作为政府的附属组织，伪装身份并从全球 IT 公司获取工作订单，同时一些人还参与信息盗窃和网络攻击。”</p><p>韩国外交部的一位代表告诉《The Block》，一些被制裁的个人通过黑客攻击盗取了加密货币。然而，外交部拒绝透露进行加密货币盗窃的个人身份。</p><p>一名名为金哲民的被制裁个人，作为员工渗透美国和加拿大的 IT 公司，并向平壤发送大量外汇。</p><p>韩国还对一个朝鲜实体实施制裁，该实体派遣大量朝鲜 IT 人员出国，并汇款资助该政权及其军事。</p><h3>朝鲜黑客活动上升</h3><p>朝鲜黑客被认为是一些最大规模的加密货币黑客攻击的幕后黑手。周一，联邦调查局（FBI）宣布，朝鲜网络行为者涉及日本加密公司 DMM Bitcoin 的 3.08 亿美元盗窃事件，这导致该公司关闭。</p><p>上周，美国财政部对两名个人和一个实体实施制裁，原因是他们在阿联酋的一家公司为朝鲜洗钱。</p><p>根据区块链分析公司 Chainalysis 的数据，朝鲜黑客在 47 起事件中盗取了价值 13.4 亿美元的加密货币，这占今年被盗总金额的 61%，显示出金额和频率的增加。</p><p>Chainalysis 报告指出：“一些事件似乎与朝鲜 IT 工作者有关，他们正在越来越多地渗透加密和 Web3 公司，危害其网络、操作和完整性。这些工作人员通常使用复杂的战术、技术和程序（TTP），例如虚假身份、第三方招聘中介以及操纵远程工作机会以获取访问权。”</p>',
      url: 'https://tokeninsight.com/zh/news/south-korea-imposes-sanctions-on-north-korean-crypto-hackers-it-operatives?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sa0df86asoho.jpeg',
      source_url:
        'https://www.theblock.co/post/332339/south-korea-imposes-sanctions-north-korean-crypto-hackers',
      timestamp: 1735211277000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '6 只比特币共同基金将于下周在以色列上市',
      content:
        '<p>根据 CoinDesk 的报道，六只追踪比特币（BTC）价格的共同基金将于下周在以色列首次亮相，此前以色列证券管理局（ISA）批准了这些产品。</p><p>这六只基金将于 12 月 31 日同日开始运营，这也是监管机构设定的条件。上周最终批准了这些基金。</p><p>这些基金将由 Migdal Capital Markets、More、Ayalon、Phoenix Investment、Meitav 和 IBI 提供，管理费用从 1.5% 到 0.25% 不等。其中一只基金将进行主动管理，力求超越比特币的表现。初期交易将仅限于每天一次，但未来的产品将能够进行连续交易，Globes 在周二的报道中提到。</p><p>ISA 的批准几乎是在美国证券交易委员会（SEC）批准现货比特币交易所交易基金（ETF）近一周年之际。在此期间，全球最大的加密货币价格已翻倍，接近创纪录高位。美国的这些基金已吸引了净计 356 亿美元的投资。</p><p>一位不愿透露姓名的投资公司高管对 Calcalist 表示：“投资公司已经请求批准 ETF 超过一年，并在年中开始提交比特币基金的招募说明书。但监管机构有自己的节奏，必须检查细节。”</p>',
      url: 'https://tokeninsight.com/zh/news/six-bitcoin-mutual-funds-to-debut-in-israel-next-week-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/af0ds8a60s8.jpeg',
      source_url:
        'https://www.coindesk.com/policy/2024/12/25/six-bitcoin-mutual-funds-to-debut-in-israel-next-week-report',
      timestamp: 1735210001000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '基金',
        },
      ],
    },
    {
      title: 'MicroStrategy 进一步买入5262个比特币，股票加入纳斯达克 100 指数',
      content:
        '<p>根据 CoinDesk 的报道，MicroStrategy 连续第七周购买比特币。</p><p>该公司以平均价格 106,662 美元购买了 5,262 BTC，使其总持有量达到 444,262 BTC。</p><p>此次购买的宣布正值 MicroStrategy 加入纳斯达克 100 指数的当天。</p><p>MicroStrategy（MSTR）是一家将比特币（BTC）收购视为核心价值的软件开发公司，最近又增加了持有量。在截至 12 月 22 日的一周内，该公司以 5.61 亿美元的总价购买了 5,262 BTC。</p><p>此次购买的平均价格为每枚比特币 106,622 美元，使 MicroStrategy 的总持有量达到 444,262 BTC。这使得公司在当前市场价格下的持有价值达到了 422 亿美元，且比特币的平均成本提高到 62,257 美元。</p><p>最新的收购资金来自公司通过市场计划（ATM）进行的股票销售。MicroStrategy 在该计划下剩余 70.8 亿美元的资金。</p><p>此次公告恰逢 MicroStrategy 正式以纳斯达克 100 指数成员的身份开始交易。盘前交易中，股价变化不大，超过 364.2 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/microstrategy-buys-a-further-5-262-btc-as-stock-joins-nasdaq-100?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/flisad7a6s79.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/12/23/micro-strategy-buys-a-further-5-262-btc-as-stock-joins-nasdaq-100',
      timestamp: 1735107125000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Bitget 与 TRON 和 SunPump 合作，促进 TRON 区块链生态系统的发展',
      content:
        '<p>根据《The Block》的报道，Bitget，这家全球领先的加密货币交易所和 Web3 公司，宣布了一系列战略合作，以增强区块链的创新和采用。这些举措包括与 TRON 区块链的合作，收购 1000 万美元的 TRX，以及与专注于 Meme 币的启动和交易平台 SunPump 的合作。</p><p>TRON 是一个知名的 Layer-1 区块链，已成为去中心化应用程序和 USDT 结算的领先协议。到目前为止，TRON 拥有超过 2.79 亿用户账户和超过 90 亿次交易，已成为全球开发者、机构和用户的首选网络，提供快速且低成本的链上交易。此次合作旨在扩大 TRON 的全球应用网络，涵盖中心化交易所（CEX）、去中心化金融（DeFi）及其他创新的区块链应用。</p><p>此外，Bitget 还与 SunPump 合作，以支持 TRON 新兴 Meme 币生态系统的增长。SunPump 以其公平启动平台和创新方法而闻名，通过提供资源和曝光率来赋能高潜力项目。通过此次合作，Bitget 将为在 SunPump 上启动的项目提供加速上市流程、上市后营销和专家指导。</p><p>这些合作反映了 Bitget 对推动区块链采用的承诺。Bitget 的 CEO Gracy Chen 表示：“在 Bitget，我们相信与具有实际影响力的领先生态系统合作。这些举措与我们赋能开发者、支持可持续增长及使区块链技术在全球更可及和有效的使命是一致的。”</p><p>TRON 创始人 Justin Sun 也表达了类似的看法，表示：“我们期待 TRON 与 Bitget 紧密合作，推动生态系统的增长，为开发者和用户创造价值。”</p><p>TRON 在区块链领域的位置展示了其实际效用，记录了超过 100 亿美元的日常链上交易和年初至今的 10 亿美元总协议收入。Bitget 与 TRON 和 SunPump 的合作旨在利用这些优势，同时支持将区块链技术更贴近主流采用的创新项目。</p><p>通过这些举措，Bitget 旨在加强其作为区块链创新关键推动者的角色，扩展开发者和用户的机会，同时推动去中心化技术的全球采用。</p>',
      url: 'https://tokeninsight.com/zh/news/bitget-partners-with-tron-and-sunpump-to-foster-tron-blockchain-ecosystem-growth?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asoduftya97.jpeg',
      source_url:
        'https://www.theblock.co/post/332178/bitget-partners-with-tron-and-sunpump-to-foster-tron-blockchain-ecosystem-growth',
      timestamp: 1735106646000,
      tags: [
        {
          name: 'Meme',
        },
        {
          name: '波场',
        },
      ],
    },
    {
      title: '在朝鲜黑客担忧之后，Hyperliquid 出现创纪录的资金流出',
      content:
        '<p>根据《The Block》的报道：Hyperliquid 在周一经历了约 2.5 亿美元的净流出，此前一位 Metamask 研究员表示，平台上有与北朝鲜相关的黑客活动。</p><p>该平台表示用户资金安全，未发现任何漏洞或利用。</p><p>去中心化的永久交易平台 Hyperliquid 在社交媒体平台 X 上，一位区块链专家声称北朝鲜支持的黑客在该 DeFi 平台上活动后，出现了创纪录的净流出。据 Dune Analytics 数据显示，Hyperliquid 周一的 USDC 净流出达 2.491 亿美元，周二迄今为止又流出 2220 万美元。</p><p>Metamask 的安全研究员 Taylor Monahan 发布了 12 个在 Hyperliquid 上活跃的区块链地址，这些地址被她识别为受朝鲜民主主义人民共和国（DPRK）支持的网络行为者。数据显示，某个地址自 10 月 2 日以来在该平台上活跃。</p><p>Monahan 在 X 上表示，她向 Hyperliquid 提出的保护平台免受北朝鲜攻击的建议仍然有效，因为 DPRK 行为者似乎正在熟悉该平台，为未来的攻击做准备。“我非常担心你们面临的风险增加，因为我们知道这些特定的威胁行为者现在对你们的平台非常熟悉，”Monahan 在两周前给 Hyperliquid 的提议中写道，并在周一再次发布。“我想强调的是，这些是 DPRK 威胁集团中最复杂和快速发展的。”</p><p>Hyperliquid 最近推出的原生代币 Hype 也在周一经历了波动。根据 Coingecko 的数据，该代币从周末的高点 34.5 美元跌至周一的约 26 美元，并持续波动。Hype 在过去 24 小时内恢复了 5.4%，在撰写本文时交易价格为 29.63 美元。</p><p>Hyperliquid 在 Discord 上对这些指控作出回应，表示平台未发现任何利用迹象。“Hyperliquid 并没有遭受 DPRK 攻击——或任何其他攻击。所有用户资金都是安全的，Hyperliquid Labs 非常重视操作安全性。没有任何方透露过漏洞。”</p><p>DPRK 的国家支持黑客团体被指控策划了一些加密领域最大的黑客攻击，例如 2022 年对 Ronin 以太坊侧链的 6 亿美元攻击。</p>',
      url: 'https://tokeninsight.com/zh/news/hyperliquid-sees-record-outflows-following-north-korea-hack-concerns?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/8抒发a0w_0_da.jpeg',
      source_url:
        'https://www.theblock.co/post/332298/hyperliquid-sees-record-outflows-following-north-korea-hack-concerns',
      timestamp: 1735039910000,
      tags: [
        {
          name: 'DEX',
        },
      ],
    },
    {
      title: 'Metaplanet 继续疯狂购买比特币，最近购买了 6100 万美元',
      content:
        '<p>根据《The Block》的报道：东京上市的公司 Metaplanet Inc. 今天宣布，在上周通过债券发行筹集了近 6100 万美元后，购买了额外的 619.7 BTC。</p><p>这家日本投资公司花费了近 6100 万美元来购买额外的比特币，继续看好全球最大的加密货币。</p><p>Metaplanet 周一表示，基于当前市场价格，购买的 619.7 BTC 价值约 5890 万美元，以每枚比特币 1530 万日元（约 97,786 美元）的平均购买价格进行交易。这使得该公司的比特币总持有量增加至 1761.98 BTC，约合 1.671 亿美元。</p><p>这家东京上市公司在上周通过两轮债券发行筹集了 95 亿日元（约 6060 万美元）后，进行了最新的比特币购买，以“加速比特币采购”。</p><p>Metaplanet 自 5 月份开始将比特币作为战略财务储备资产，此后一直在积极购买。</p><p>根据 Yahoo Finance 的数据，Metaplanet 的股票周一在日本收盘下跌 0.98%，报 3540 日元，年初至今上涨了 1982%。</p><p>在撰写本文时，比特币在过去 24 小时内下跌了 1%，交易价格为 95,221 美元。以太坊下跌 1.2%，交易价格为 3292 美元。《The Block》的 GMCI 30 指数，衡量前 30 种加密货币的表现，在过去一天中微跌 0.93%。</p><p>与此同时，MicroStrategy 仍是最大的公共企业比特币持有者，拥有 439,000 BTC，数据来自 BitcoinTreasuries。</p>',
      url: 'https://tokeninsight.com/zh/news/metaplanet-continues-bitcoin-buying-spree-with-latest-61-million-purchase?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ofdsauyo_a.jpeg',
      source_url:
        'https://www.theblock.co/post/332139/metaplanet-continues-bitcoin-buying-spree-with-latest-61-million-purchase',
      timestamp: 1734951612000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Tether 对 Rumble 进行 7.75 亿美元“战略投资”，股价大涨 44.6%',
      content:
        '<p>根据《The Block》的报道：Tether，全球最大的稳定币发行商，已向右翼流媒体平台 Rumble 进行了一项“战略投资”，金额达到 7.75 亿美元。</p><p>上个月，Tether 宣布将从其多余现金储备中分配最多 2000 万美元用于比特币投资。</p><p>这项投资似乎表明 Rumble 对加密行业的进一步关注，Rumble 上个月宣布将拨出最多 2000 万美元的现金储备用于比特币。</p><p>在美联储最近的利率消息之后，Rumble 的股价稳步下跌，周五市场收盘时下跌了 1%。然而，在 Tether 投资的消息传出后，股票在盘后交易中飙升了多达 44.6%。</p><p>在利率上升的背景下，Tether 从 USDT 支持资产的收益中获得了丰厚利润。例如，2024 年第三季度，该公司净利润达到 25 亿美元。因此，在新任 CEO Paolo Ardiono 的领导下，Tether 正在不断进行战略投资，扩展到 AI、比特币挖矿和去中心化消息传递等新领域。</p><p>值得注意的是，Tether 对视频分享平台和云服务提供商 Rumble 的投资反映了 Ardiono 对抗审查沟通的兴趣。Tether 的一个秘密项目正在帮助开发一个名为 Keet 的点对点聊天和视频会议应用，该平台使用了 Ardiono 其他公司 Holepunch 创建的技术。</p><p>Rumble 表示将使用 2.5 亿美元的资金“支持增长计划”。其余的资金用于自我招标，最多购买 7000 万股 A 类普通股，价格为每股 7.50 美元——与 Tether 的投资价格相同。Rumble 的董事长兼 CEO Chris Pavlovski 将保持对公司的控制权，并表示不会出售超过 1000 万股的持股。Tether 将总共购买 1,033,333,333 股股份。</p><p>“许多人可能没有意识到，加密货币和言论自由社区之间存在着强大的联系，这源于对自由、透明和去中心化的热情，” Pavlovski 在声明中表示，并指出这项投资代表着“我们所有股东的即时流动性事件”。</p><p>在第三季度，Rumble 的收入为 2510 万美元，同比增长 39%，尽管净亏损为 3150 万美元（较 2023 年第三季度的 2900 万美元有所增加）。其月均活跃用户约为 6700 万，主要面向保守派观众。Rumble 的云服务业务托管 Truth Social。彼得·蒂尔、维维克·拉马斯瓦米和当选副总统 JD·万斯在 2021 年以 5 亿美元的估值投资于 Rumble。</p><p>Tether 的对手方 Cantor Fitzgerald &amp; Co. 正在担任此次交易的配售代理和经销商管理人。</p>',
      url: 'https://tokeninsight.com/zh/news/tether-to-make-775-million-strategic-investment-in-rumble-shares-rally-44.6?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/g9asfd7yf9.jpeg',
      source_url:
        'https://www.theblock.co/post/332081/tether-to-make-775-million-strategic-investment-in-rumble-shares-rally-44-6',
      timestamp: 1734951287000,
      tags: [
        {
          name: 'Tether',
        },
      ],
    },
    {
      title: 'Razzlekhan 的丈夫，Bitfinex 黑客，在被捕后首次发表公开声明',
      content:
        '<p>根据 CoinDesk 的报道：Ilya Lichtenstein 在 X 上发布的视频中重申，他是单独行动，盗取了 120,000 比特币，否认了 Netflix 纪录片中的猜测。</p><p>因与 2016 年 Bitfinex 盗窃 120,000 比特币有关的指控而入狱的 Ilya Lichtenstein，自 2022 年被捕以来首次公开发表声明。</p><p>Lichtenstein 重申他是唯一的黑客，驳斥了有关他的妻子或父亲知情的猜测。</p><p>他表示悔恨，称他计划在获释后从事网络安全工作。</p><p>Lichtenstein 去年对与 2016 年 Bitfinex 盗窃 120,000 比特币相关的指控认罪，自 2022 年被捕以来首次公开发表声明。</p><p>在周四发布的五分钟视频中，Lichtenstein 重申他是黑客，并且是单独行动，否认了 Netflix 纪录片中提到的父亲（或可能的某个间谍机构，也许是俄罗斯）可能参与盗窃的猜测。</p><p>“我的父亲不是黑客，他甚至不知道怎么用 Instagram，” Lichtenstein 说，他因共谋洗钱被判处五年监禁，包括在案件未决期间的监禁时间。</p><p>“我对 Bitfinex 造成的所有压力表示诚挚的歉意，”他在视频中说，该视频是在与妻子远程会面时从监狱录制的。“我知道我所做的是错误的，但我还是这样做，因为我不在乎……我回想起那时的自己，我恨自己。我恨自己。”</p><p>在视频中，Lichtenstein 还更新了关于他从 Bitfinex 盗窃资金的赔偿情况。</p><p>“在过去三年中，我努力核算并归还所有资产，直到最后一个聪，正如我的认罪协议所要求的，我将继续这样做，”Lichtenstein 说道，眼睛下方有明显的黑眼圈。赔偿听证会定于 2 月举行，以确定这些资金应分配给 Bitfinex 还是受到黑客攻击影响的客户。</p><h3>Razzlekhan 讲话</h3><p>Lichtenstein 的妻子 Heather “Razzlekhan” Morgan 对一起洗钱阴谋和一起欺诈美国的阴谋认罪。</p><p>检方表示，她是在事件发生多年后才意识到黑客事件，并被丈夫招募洗钱被盗的比特币。</p><p>“在许多方面，我的妻子……只是我错误决策的另一位受害者，” Lichtenstein 在视频中说。</p><p>上个月，Morgan 因在 Lichtenstein 犯罪中的支持角色被判处 18 个月监禁。</p><p>“能让我们案件的公开记录开始得到澄清真是太好了，” Morgan 在接受 CoinDesk 采访时提到她丈夫发布的视频。“你会以为在我们的判决备忘录提交后就会发生这种情况，但实际上并没有。还有很多神话我期待着在我们讲述真实故事时揭穿。”</p><p>Morgan 以其滑稽的说唱视频而闻名，最近开始在 Cameo 上出售定制视频，每个售价 125 美元，这是一种非色情版的 OnlyFans。她的监禁可能最早在下个月开始。</p><p>“尽管你们读到的都是这样，我的 Razzlekhan 角色与本案没有任何关系，除了政府在指控文件中提到它。我在知道丈夫盗取 Bitfinex 之前就创造了 Razzlekhan，” Morgan 对 CoinDesk 说。</p><p>“在我们的刑事案件开放期间，我无法公开发言或讲述我的故事，”她表示。“这也意味着我在过去三年中无法发表任何文章或发布任何新艺术作品或歌曲。现在案件结束了，我期待着再次自由地进行创作……我渴望讲述真正发生的事情。”</p>',
      url: 'https://tokeninsight.com/zh/news/razzlekhan-s-husband-the-bitfinex-hacker-makes-first-public-statement-since-arrest?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a0ds67a0s.jpeg',
      source_url:
        'https://www.coindesk.com/policy/2024/12/19/razzlekhan-s-husband-the-bitfinex-hacker-makes-first-public-statement-since-arrest',
      timestamp: 1734687931000,
      tags: [
        {
          name: 'Bitfinex',
        },
      ],
    },
    {
      title:
        '在孙宇晨担任顾问后，特朗普支持的 World Liberty Financial 将其 cbBTC 换成了 WBTC',
      content:
        '<p>根据《CoinDesk》的报道：此次交易发生在周三，正值 BiT Global 败诉，试图阻止 Coinbase 下架 WBTC 的同一天。</p><p>由特朗普家族支持的 World Liberty Financial 将价值 1000 万美元的 Coinbase 包装比特币（cbBTC）兑换为 Wrapped Bitcoin（WBTC）。</p><p>交易发生在法院裁定 BiT Global（一个 WBTC 保管方）败诉的同一天，该保管方曾试图阻止 Coinbase 移除该代币。</p><p>由美国当选总统唐纳德·特朗普家族支持的 World Liberty Financial 周三将约 1000 万美元的 Coinbase（COIN）包装比特币 cbBTC 兑换为竞争对手 WBTC。</p><p>包装比特币是一种全球最大的加密货币形式，可以在除比特币以外的区块链上用于去中心化金融（DeFi）。</p><p>Coinbase 于 9 月推出了 cbBTC，并在 11 月表示将下架 WBTC，理由是其上市标准。这一举动促使 BiT Global 作为 WBTC 的保管方起诉该加密交易所，试图阻止下架。法院在周三裁定 BiT Global 败诉。</p><p>链上还有一个重要环节：Tron 区块链创始人、CoinDesk 2024 年最具影响力人物之一的贾斯廷·孙。在辩护中，Coinbase 引用了 BiT Global 与孙的联系，后者在美国被指控欺诈和市场操纵，认为这是一个“不可接受的风险”。孙否认这些指控，且在上个月以 WLFI 代币的形式获得了 World Liberty Financial 的 3000 万美元股份，成为顾问。</p><p>World Liberty Financial 并未明确说明其交换代币的决定。链上数据显示，过去一周它在市场上活跃，购买了价值数百万美元的 Aave（AAVE）、Chainlink 的 LINK 和 Ethena 的 ENA 代币，这些公司通过合作或集成与其相关。</p><p>孙与 WBTC 的直接关系不大。今年 8 月，BitGo，最初的 WBTC 比特币保管方，表示将把该项目的保管控制权分配给全球三个实体（包括 BiT Global），而不仅仅是一个，以帮助去中心化运营。</p><p>BiT Global 在香港注册为信托和公司服务提供商（TCSP），并被描述为“BitGo、贾斯廷·孙和 Tron 生态系统之间的战略伙伴关系”。</p><p>BiT Global 的董事会成员罗伯特·刘在 10 月的一次采访中表示，孙在这些公司或 BiT Global 列出股东的资本结构中没有直接或间接的参与。</p><p>一些董事会成员认为，孙的参与实际上对 WBTC “有好处”，刘表示，考虑到 Tron、加密交易所 HTX 和其他业务的成功。</p><p>“Tron 区块链拥有全球市场份额的超过 50%，”刘说。“他们的周转率最高。因此，人们对在 Tron 区块链上流通的超过 600 亿美元的稳定币资产毫无问题。”</p>',
      url: 'https://tokeninsight.com/zh/news/trump-backed-world-liberty-financial-swaps-its-cbbtc-for-wbtc-after-sun-joins-as-adviser?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a9we7t6f79asdh.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/12/19/trump-backed-world-liberty-financial-swaps-its-cbbtc-for-wbtc-after-sun-joins-as-adviser',
      timestamp: 1734687482000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Crypto-AI 初创公司 Fraction AI 获得 600 万美元种子期前融资',
      content:
        '<p>根据《The Block》的报道，Fraction AI 在一轮由 Spartan 和 Symbolic 共同领导的种子前融资中筹集了 600 万美元。</p><p>这家专注于去中心化数据标注的加密-AI 初创公司宣布，Fraction AI 已在一轮由 Spartan Group 和 Symbolic Capital 共同领导的种子前融资中筹集了 600 万美元。</p><p>该轮融资的其他投资者包括 Borderless Capital、Anagram、Foresight Ventures 和 Karatage，Fraction AI 在周三表示。Polygon 的 Sandeep Nailwal 和 Protocol 的 Illia Polosukhin 等天使投资人也参与了该轮融资，并成为该项目的“亲密顾问”，Fraction AI 创始人兼 CEO Shashank Yadav 告诉《The Block》。</p><p>Yadav 表示，Fraction AI 从今年 4 月开始为种子前轮融资筹集资金，并在 9 月完成了融资。该轮融资采用了未来股权的简单协议（SAFE）结构，并附带了代币认购权，Yadav 透露未对融资后的估值发表评论。</p><h3>什么是 Fraction AI？</h3><p>Fraction AI 成立于 2 月，是一家专注于去中心化数据标注的加密-AI 初创公司。数据标注涉及将原始数据（如图像、文本或音频）标记为有意义的标签，以训练 AI 模型识别模式并做出准确预测。</p><p>“在 AI 的三大核心要素——数据、计算和模型中，数据仍然是最不透明且最受控制的，”Yadav 说。“我们着手改变这一点，平衡竞争环境，使任何人都能训练高质量的 AI 模型。”</p><p>Fraction AI 采用混合方式进行数据标注，结合了人工洞察和 AI 代理。该平台将有三个主要参与者：质押者、构建者和评审者。</p><p>质押者将通过质押以太坊或像 Lido 质押以太坊（stETH）这样的流动质押代币（LSTs）来赚取奖励。其收入来自构建者支付的入场费用，每笔入场费的 5% 将直接支付给质押者，Yadav 说。</p><p>构建者将通过提供人工洞察或详细的文本指令来创建代理，无需编写代码。他们将使用 ETH 或 LSTs 为代理提供资金，允许代理参与挑战。构建者将支付一小笔入场费以参与并生成最佳数据。每个竞争中排名前三的代理将从入场费用池中获得奖励，奖励将乘以一个基于表现的乘数，该乘数由专业的大型语言模型（LLMs）根据得分来确定。</p><p>“额外的乘数奖励来自质押者的池，这确保了表现不佳的代理为质押者提供资金，同时极大地增加了表现优异代理的奖励，”Yadav 说。</p><p>评审者是专门的 LLMs，将根据预定标准评估代理的输出。要参与，评审者需要质押 Fraction AI 的本地 FRAC 代币。</p><h3>Fraction AI 主网和代币发布时间表</h3><p>Fraction AI 主要构建在以太坊上，目前在一个封闭的测试网上运行，已有超过 60,000 名用户，Yadav 说。预计公共测试网将在下个月上线，主网计划在 2025 年第一季度末或第二季度初发布。</p><p>Yadav 说，FRAC 代币也将在主网发布时推出。该代币的用途将是通过质押和削减机制来确保评审者网络的安全，评审者将通过这些机制评估代理的输出，从而确保质量和公平性。</p><p>尽管 Fraction AI 当前主要构建在以太坊上，Yadav 透露，未来该项目还计划在 NEAR 以及多个以太坊 Layer 2 网络上推出。</p><p>该项目总部位于旧金山，目前有 8 名员工。Yadav 计划在近期保持团队的精简。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-ai-startup-fraction-ai-raises-6-million-in-pre-seed-funding?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/AD9S6a9y.jpeg',
      source_url:
        'https://www.theblock.co/post/331488/crypto-ai-startup-fraction-funding',
      timestamp: 1734602001000,
      tags: [
        {
          name: 'AI',
        },
        {
          name: '融资',
        },
      ],
    },
    {
      title:
        '美联储主席鲍威尔发表反对 BTC 储备的评论后，比特币跌破 100,000 美元',
      content:
        '<p>根据《The Block》的报道，受美国联邦储备主席杰罗姆·鲍威尔（Jerome Powell）讲话影响，比特币在周三跌破了 10 万美元大关。</p><p>鲍威尔在讲话中反对美国建立国家比特币储备的观点，并给出了鹰派的 2025 年经济展望。</p><p>根据《The Block》比特币价格页面的数据显示，比特币在过去 24 小时内下跌了 6%，目前交易价格为 98,940 美元。在过去一周，比特币一直维持在 10 万美元以上的水平，并在这一期间创下了 108,135 美元的新历史最高价。</p><p>大多数山寨币也在周三遭遇下跌，以太坊下跌了 6.5%，XRP 下跌了 12.64%。衡量前 30 大加密货币表现的 GMCI 30 指数在过去一天下跌了 7.18%。</p><p>比特币最近的上涨趋势受到了美国当选总统唐纳德·特朗普（Donald Trump）近期言论的推动，特朗普重申了建立国家战略比特币储备的计划。此外，德州、宾夕法尼亚州和佛罗里达州等多个美国州份也提出了建立州支持的比特币储备的法案，这进一步激发了交易者的积极情绪。</p><p>然而，鲍威尔在周三的新闻发布会上表示，中央银行不允许持有比特币，并且“没有寻求改变法律”的计划，回应了关于美国政府是否会建立比特币储备的问题。</p><p>前 BitMEX 首席执行官、现 Maelstrom 首席投资官 Arthur Hayes 在最近的一篇文章中表示，他预计加密货币市场将在特朗普 1 月就职后迎来大规模抛售，因为投资者会意识到他们的期望与现实之间的差距。</p><p>“市场将立即意识到，特朗普最多只有一年时间来实施任何政策变化，大约在 1 月 20 日左右，” Hayes 表示。“这一认知将导致加密货币以及其他特朗普 2.0 股市交易的剧烈抛售。”</p><p>虽然联邦公开市场委员会（FOMC）在周三决定将利率下调 25 个基点，但鲍威尔预计明年利率下调的速度将放缓，并指出周三的利率调整比金融市场所预期的“更加紧张”，路透社报道。</p><p>美国股市在周三也出现了大幅下跌。道琼斯工业平均指数下跌了 2.58%，纳斯达克综合指数下跌了 3.56%，标准普尔 500 指数下跌了 2.95%，根据 MarketWatch 的数据。</p><p>Presto Research 分析师 Min Jung 表示：“随着圣诞和新年假期临近，市场预计将保持相对平静。随着特朗普就职典礼只剩一个月，市场的关注点可能会转向即将上任的政府以及特朗普的相关言论。”</p><p>故事更新加入了 Presto Research 的评论。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-drops-below-100-000-after-fed-chair-powell-s-comment-against-btc-reserve?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/as98f7yv.jpeg',
      source_url:
        'https://www.theblock.co/post/331602/bitcoin-drops-below-100000-after-fed-chair-powells-comment-against-btc-reserve',
      timestamp: 1734601444000,
      tags: [
        {
          name: '政策与监管',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Omni Network 推出“核心”主网，以统一以太坊分散的 rollup 生态系统',
      content:
        '<p><strong>《The Block》报道：Omni Network，基于 EigenLayer 构建的以太坊扩容解决方案，已于周二上线了其 Omni Core 主网。</strong></p><p>该协议旨在通过促进跨链通信和互操作性，统一碎片化的以太坊 Layer 2 生态系统。</p><p>根据公告，以太坊扩容解决方案 Omni Network 已于周二推出其 Omni Core 主网。该系统将作为 Omni Orderflow Engine 的“基础层”，旨在统一碎片化的以太坊 Layer 2 生态系统。</p><p>“以太坊 rollup 的激增导致 580 亿美元的总价值锁仓（TVL）分散在 40 多个网络中，为用户和开发者带来了重大挑战，”团队在声明中写道。“Omni 旨在重新整合这一生态系统，让用户和开发者能够像与单一统一链互动一样，顺畅地与以太坊互动。”</p><p>Omni 并非与比特币的同名二级网络相混淆，它代表了一个由“重质押”（restaking）新兴世界所解锁的早期实验。重质押是将已质押的资产（如 ETH）重新利用，以同时保护多个区块链网络和应用，理论上扩展了权益证明（PoS）网络的价值，并支持一系列新颖的应用。</p><p>重质押最初通过实验性协议 EigenLayer 引入，已成为以太坊最热门和最具前景的研究领域之一。然而，迄今为止，只有少数应用真正利用了这一先进安全措施所解锁的潜在好处。</p><p>特别地，Omni 在 2023 年上线，旨在改善以太坊多样化 L2 生态系统之间的跨链互操作性。虽然 Layer 2 解决方案有助于降低交易成本，培养各自独特的文化，并提供更适合特定应用的技术解决方案，但这些多样化的生态系统却将流动性和以太坊的整体用户群体分散开来。</p><p>“碎片化限制了以太坊的真正潜力。流动性被分散，用户在不同 rollup 之间移动时面临不必要的摩擦，”首席技术官 Tyler Tarsi 在声明中表示。</p><p>Omni Core 由一个跨链消息协议和一个定制的 EVM 组成，旨在“抽象化”跨 rollup 的交互，使生态系统看起来统一，并提供“无缝的用户体验”。与即将更新的 Omni SolverNet 一起，Omni Core 作为 Orderflow Engine 的一部分，负责验证交易并在链之间交换信息。</p><p>在上线时，Omni 将支持以太坊基础链以及最大的 Layer 2 解决方案之间的互操作性，包括 Arbitrum、Base 和 Optimism，这三者占据了超过 90% 的总价值锁仓。通过改善互操作性，Omni 有望支持目前难以推出的工具，如跨 rollup 稳定币和聚合多源流动性的 DeFi 原生工具。</p><p>该协议是使用 Omni 团队开发的开源 Octane 框架构建的，旨在简化 EVM 与任何去中心化应用（dApp）的集成。Octane 将 EVM 功能与 Cosmos 相关的共识引擎 CometBFT 结合，通过同时运行共识和执行过程，提供高交易吞吐量。</p><p>去年，Omni 团队从包括 Pantera Capital、Hashed Fund、Jump Crypto 和 Two Sigma Ventures 等投资者处筹集了 1800 万美元的资金。</p>',
      url: 'https://tokeninsight.com/zh/news/omni-network-launches-core-mainnet-to-unify-ethereum-s-fragmented-rollup-ecosystem?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdf98asd9.jpeg',
      source_url:
        'https://www.theblock.co/post/331270/omni-network-launches-core-mainnet-to-unify-ethereums-fragmented-rollup-ecosystem',
      timestamp: 1734518616000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: '跨链',
        },
      ],
    },
    {
      title:
        'Wormhole、EigenLayer 和专注于 near 的 Nuffle Labs 合作，带来超越以太坊的重构',
      content:
        '<p><strong>据《The Block》报道</strong>：Wormhole 正在与区块链开发公司 Nuffle Labs 合作，开发一种解决方案，以扩展 EigenLayer 的重质押功能，超越以太坊生态系统。</p><p>根据周二的公告，Wormhole 正在与重质押协议开发者 Nuffle Labs 合作，旨在扩大 EigenLayer 的重质押功能。这一举措标志着加密研发领域一个备受关注的进展：共享通过质押产生的安全性，以同时保护多个协议和应用。</p><p>该解决方案利用 Wormhole 的消息传递架构和 Nuffle 的 NUFF 协议，将使资产能够直接从任何 Layer 1 或 Layer 2 区块链进行重质押，而无需资产桥接，团队在声明中表示。</p><p>重质押已成为许多加密行业参与者高度关注的领域。简而言之，像 EigenLayer 这样的协议使应用能够共同利用已质押资产的安全性，避免建立各自独立的安全基础设施。该领域提高了权益证明平台的效率，同时可能催生新的区块链使用案例。</p><p>共享重质押资产的应用和协议被称为“主动验证服务”（AVS），它们可以设置定制的验证任务或规则。一些专家认为，重质押将在预言机提供链外数据给链上智能合约、Layer 2 Rollups 寻求额外安全性以及确保数据可用性方面发挥重要作用。</p><p>Nuffle Labs 是 NEAR 基金会的衍生企业，正在开发模块化区块链技术，以扩展生态系统，包括 NEAR 数据可用性层和 NEAR 快速最终性层。</p><p>与 Wormhole 的合作将使通过 Nuffle 的基础设施提供的所有代币可用于构建在 EigenLayer 共享安全框架上的 AVS。</p><p>Nuffle 首席执行官 Altan Tutar 在声明中表示：“随着每个资产的重质押和行业的日益互联，我们的愿景是创建一个生态系统，让你可以在任何地方做任何事情。无论是借贷、借款还是重质押，我们旨在创建一个全球市场。”</p>',
      url: 'https://tokeninsight.com/zh/news/wormhole-eigenlayer-and-near-focused-nuffle-labs-partner-to-bring-restaking-beyond-ethereum?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/khfykuiti.jpeg',
      source_url:
        'https://www.theblock.co/post/331307/wormhole-eigenlayer-and-near-focused-nuffle-labs-partner-to-bring-restaking-beyond-ethereum',
      timestamp: 1734518197000,
      tags: [
        {
          name: 'Layer 1',
        },
        {
          name: '质押',
        },
      ],
    },
    {
      title:
        '区块链驱动的 AI16z 机器人背后的团队与斯坦福大学合作研究自主加密人工智能代理',
      content:
        '<p>The Block 报道：Eliza Labs 与斯坦福大学合作，研究自主 AI 机器人如何融入更广泛的数字资产经济。</p><p>Eliza Labs 是 AI16z 区块链驱动的 AI 代理背后的团队，现与斯坦福大学合作，研究自主 AI 机器人如何融入更广泛的数字资产经济。</p><p>这项研究将于明年初在斯坦福大学现有的“数字货币未来计划”下开展，研究将由两位资深的密码学家及加密货币领域的教授 Dan Boneh 和 David Mazières 负责。Mazières 是 Stellar 区块链的共同创始人之一。</p><p>此举正值“去中心化 AI”领域快速发展的时期，随着自主代理开始在社交媒体上几乎无需人工干预地运作，诸如 AI16z 和由马克·安德森资助的 Truth Terminal 等项目吸引了加密货币社区的广泛关注，并推出或推广了在市场上大受欢迎的代币。</p><p>许多人预测，目前通过庞大的在线数据集进行编程的 AI 代理，最终将自然转向互联网原生的数字货币。</p><p>Eliza Labs 在新闻稿中表示：“通过利用 Eliza Labs 开源的 Eliza 框架来开发自主代理，这一合作将探讨 AI 代理如何在去中心化金融系统中建立信任、协调行动和做出决策等基本问题。”</p><p>Eliza Labs 目前“正在积极寻找特定行业的合作伙伴”，但尚不清楚具体是谁被联系，或哪些组织将与该团队合作。</p><p>该研究将集中在三个核心领域，即“代理信任机制”、“多代理经济系统”和“去中心化代理治理”。换句话说，研究人员将着眼于为 AI 机器人构建经济体系和社区，并探索“去中心化治理模型”和协调协议。</p><p>团队表示：“这些发展旨在为数字经济中的代理互动建立基础性标准。”</p><p>Eliza Labs 是 AI16z DAO 背后的实体，后者由名为 Marc AIndreessen 的自主 AI 机器人管理资产。（著名风险资本家马克·安德森及其投资公司 a16z 与该项目无关。）AI16z DAO 的结构类似于对冲基金，目标是“超越 a16z”，其中真实的投资者投资于由 AI Marc 执行的策略。Eliza Labs 还开发了使机器人能够使用社交媒体和更广泛互联网的工具。</p><p>根据 CoinGecko 的数据，AI16z 的代币自 10 月发布以来，市值已超过 8.2 亿美元。</p><p>斯坦福大学的数字货币未来计划与政府、企业及其他机构合作，制定有关数字货币在各个行业中角色的标准。</p>',
      url: 'https://tokeninsight.com/zh/news/team-behind-blockchain-powered-ai16z-bot-partners-with-stanford-to-study-autonomous-crypto-ai-agents?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sd97v6a9.jpeg',
      source_url:
        'https://www.theblock.co/post/331115/team-behind-blockchain-powered-ai16z-bot-partners-with-stanford-to-study-autonomous-crypto-ai-agents',
      timestamp: 1734433254000,
      tags: [
        {
          name: 'AI',
        },
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: '比特币价格创下历史新高，超过10.6万美元',
      content:
        '<p><strong>据《The Block》报道</strong>：比特币价格在周日攀升至新的历史高点 106,352 美元。分析师认为，比特币价格可能在年末和 2025 年继续上涨。</p><p>比特币在周日创下新高 106,352 美元后略有回落。目前，这种全球最大的加密货币的交易价格为 104,700 美元，在过去 24 小时内上涨了 2.72%，但已从其历史高点小幅下滑。</p><p>分析师告诉《The Block》，这款领先的加密货币可能会继续上涨，进而在新的一年中保持积极的动能。</p><p>“新的历史高点对比特币来说非常重要，标志着其作为更成熟资产类别的演变，”BTC Markets 的加密分析师 Rachael Lucas 说。“历史高点反映了比特币从以零售驱动的资产转变为受到机构需求、ETF 和企业财政支持的资产，从而增强了其合法性。”</p><p>分析师表示，多个因素促成了比特币价格突破 106,000 美元，包括美国当选总统唐纳德·特朗普最近表示希望建立战略加密储备，并在加密领域“做一些伟大的事情”。</p><p>此外，MicroStrategy 宣布其比特币储备现已超过 440 亿美元，并将于 12 月 23 日进入 Nasdaq 100，这进一步提振了市场情绪。MicroStrategy 的联合创始人 Michael Saylor 也在社交媒体平台 X 上发布了一系列帖子，增加了对进一步买入比特币的预期。</p><p>上周五，比特币矿业巨头 Riot Platforms 宣布已以平均约 99,669 美元的价格收购 5,117 个比特币。</p><p>投资者目前关注的是本年度最后一次美国联邦储备会议，定于周三举行。CME Group 的 FedWatch 工具当前显示，97.1% 的概率认为即将召开的 FOMC 会议将决定将国家利率下调 25 个基点。</p><p>“即将举行的 FOMC 会议将为联邦储备对潜在降息的前景提供重要见解，”Presto Research 分析师 Min Jung 说。Jung 补充道，任何与特朗普 1 月就任有关的公告或进展预计将显著影响加密货币价格。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-price-registered-a-fresh-all-time-high-above-106-000?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9f7da69sdtg.jpeg',
      source_url:
        'https://www.theblock.co/post/330924/bitcoin-bull-run-expected-to-continue-analysts',
      timestamp: 1734337626000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '微策加入纳斯达克 100 指数，QQQ ETF 继今年上涨 500%',
      content:
        '<p><strong>据《The Block》报道</strong>：MicroStrategy 将正式加入以科技公司为主的 Nasdaq-100 指数，主要得益于其股票年初至今近 500% 的价格涨幅。</p><p>作为最大的企业比特币持有者，MSTR 将于 12 月 23 日与数据公司 Palantir 和电击枪制造商 Axon Enterprise 一同加入该指数，取代生物科技公司 Moderna、Illumina 和服务器制造商 Super Micro Computer。</p><p>据分析师称，几只大型 ETF 将购买该股票，包括广受欢迎的 QQQ ETF，预计将导致超过 20 亿美元的买入。</p><p>MicroStrategy（MSTR）是一家企业软件公司，逐渐成为比特币的股票市场代理。其创始人 Michael Saylor 利用“飞轮效应”积累大量比特币，使 MicroStrategy 成为最大的企业比特币持有者。</p><p>MSTR 将于 12 月 23 日加入以科技股为主的 Nasdaq 100 指数，与数据公司 Palantir 和电击枪制造商 Axon Enterprise 一同入选，这意味着该公司也将受到几只大型交易所交易基金（ETF）的购买，包括交易量较大的 QQQ ETF。彭博社 ETF 分析师 James Seyffart 预测，ETF 将在该股票被纳入指数时购买至少 21 亿美元的 MSTR 股票。</p><p>目前，MSTR 的市值约为 980 亿美元，远高于其 423,650 个比特币的现货价值，后者在当前价格下略低于 430 亿美元。自 9 月 12 日以来，该公司已购买 197,150 个比特币，显著增加了其持有量，同时提高了其成本基础。</p><p>在被纳入 Nasdaq 100 指数后，Bernstein 分析师表示，该公司可能会瞄准 2025 年纳入 S&amp;P 500 指数。然而，考虑到其企业软件业务缺乏盈利，加入该指数可能会更加困难，因为执行董事长 Saylor 的比特币战略已成为公司的核心活动。</p><p>MSTR 股票被纳入 Nasdaq 指数是由于该指数的年度再平衡，该再平衡主要基于 11 月最后一个交易日公司市值，但也会考虑其他因素。</p>',
      url: 'https://tokeninsight.com/zh/news/microstrategy-to-join-nasdaq-100-qqq-etf-following-500-rally-this-year?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/oasdf86a8os.jpeg',
      source_url:
        'https://www.theblock.co/post/330903/microstrategy-to-join-nasdaq-100-qqq-etf-following-500-rally-this-year',
      timestamp: 1734336198000,
      tags: [
        {
          name: '指数',
        },
      ],
    },
    {
      title:
        'Fantasy.top 宣布获得来自 Dragonfly 和 Manifold Ventures 的 425 万美元种子资金',
      content:
        '<p><strong>据《The Block》报道</strong>：Fantasy.top 宣布了平台的第二个版本，Fantasy V2。同时，它还完成了一轮由 Dragonfly 领投、Manifold Ventures 支持的 425 万美元种子融资。</p><p>这款由 Blast 驱动的去中心化交易卡牌游戏 Fantasy（也称为 Fantasy.top）宣布了其平台的第二个版本 Fantasy V2，并同时完成了 425 万美元的种子融资。</p><p>这笔新资金将用于提升 Fantasy 的主要产品：交易卡牌游戏和幻想投注。</p><p>增强内容将包括更精细的产品、扩展的每日投注名人阵容、新类别（如 Solana 对 Ethereum 影响者和左右曲线影响者）以及增加的奖池——每日奖励高达 100,000 美元，周赛奖励超过 350,000 美元。</p><p>“我们很荣幸在这一轮融资中有 Dragonfly 作为领投者，他们是支持诸如 Ethena 和 MegaETH 等类别定义项目的领先风险投资公司，”Fantasy 联合创始人 Travis Bickle 表示，并补充说团队“同样感谢 Manifold Ventures 在我们旅程中的持续信任和合作。”</p><p>据报道，这笔资金还将推动 Fantasy 进入更广泛的社交媒体领域，包括推出 Fantasy X，团队将其描述为“一个动态的替代内容消费、与志同道合用户连接和发现信息的平台。”</p><p>Fantasy X 已在 V2 上线，计划推出的原生移动应用旨在成为传统“加密 Twitter”的新中心。</p><p>“目前已有超过 100,000 名用户注册，我们的目标是扩展到数百万，使 Fantasy X 成为在加密 Twitter 生态系统中导航和蓬勃发展的终极目的地，”Bickle 说。</p><p>最后，Fantasy 计划重新审视其去中心化金融的起源，探索用户获取“加密 Twitter”趋势的新方式——例如“实时交易体验，以捕捉追逐 memecoin 的兴奋感，重新构想社交媒体动态。”</p>',
      url: 'https://tokeninsight.com/zh/news/fantasy.top-announces-v2-and-4.25-million-seed-funding-from-dragonfly-and-manifold-ventures?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/挨饿9ad8.jpeg',
      source_url:
        'https://www.theblock.co/post/329948/fantasy-v2-dragonfly-manifold-ventures',
      timestamp: 1734087159000,
      tags: [
        {
          name: '基金',
        },
      ],
    },
    {
      title: 'Chainalysis 扩大了索拉纳覆盖范围，包括 pump. fun 上的memecoins',
      content:
        '<p><strong>据《The Block》报道</strong>：Chainalysis 已扩大其对 Solana 代币的覆盖范围，涵盖了在 Pump.fun 上创建的 memecoins。</p><p>该公司的产品总监表示：“……各国政府可以调查诈骗和 rug pulls。”</p><p>区块链分析提供商 Chainalysis 已扩大对 Solana 代币的覆盖，现已包括在 Pump.fun 上创建的 memecoins，公司的代表透露。</p><p>“今天，Chainalysis 扩展了我们对 Solana 的覆盖范围，涵盖了 KYT 和 Reactor 中的每一个 Solana 代币，”该公司的产品总监 Matthew Wilson 在 LinkedIn 上发布的帖子中说。“从 SPL 合约部署的那一刻起，Chainalysis 提供全面的警报、曝光和追踪。”</p><p>Know Your Transaction（KYT）和 Reactor 是 Chainalysis 提供的合规工具。SPL 指的是 Solana 程序库。</p><p>Wilson 补充道：“交易所可以立即列出 meme 代币，并提供完整的合规覆盖。”他表示：“各国政府可以调查诈骗和 rug pulls……所以无论你对 WIF、BONK、PNUT、稳定币 USDT 和 USDC，还是 Pump.fun 代币感兴趣，我们都有你所需的覆盖。”</p><p>由于在 Solana 上创建代币变得越来越简单，memecoin 交易在今年激增。根据 Dune Analytics 的数据，截至本月初，已有超过 400 万个 memecoins 通过 Pump.fun 部署。根据 DefiLlama 的数据，这个平台在 11 月的月收入达到了超过 9300 万美元的历史新高。</p><p>Pump.fun 在年初推出后，成为历史上增长最快的加密应用程序。9 月，区块链研究员和 Glue 创始人 Ogle 表示，近 95% 在 Pump.fun 上推出的 memecoins “在推出后一天内基本上就会被抽走。”</p>',
      url: 'https://tokeninsight.com/zh/news/chainalysis-expands-solana-coverage-to-include-pump.fun-memecoins?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/qasodq9wyd.jpeg',
      source_url:
        'https://www.theblock.co/post/330697/chainalysis-expands-solana-coverage-to-include-pump-fun-memecoins',
      timestamp: 1734086686000,
      tags: [
        {
          name: 'Solana',
        },
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: '韩国元宇宙项目 Another World 在代币交易后与 Lamina1 合并',
      content:
        '<p><strong>据《The Block》报道</strong>：由 Neal Stephenson 共同创立的元宇宙项目 Lamina1 正在与韩国 Web3 公司 Another World 合并。</p><p>这一举措是在 Lamina1 的母公司 Open Metaverse Limited 完成对 Another World 的“全代币交易”收购后进行的。</p><p>Lamina1，这个由《雪崩》作者 Neal Stephenson 创立的元宇宙项目，于周三宣布与 Another World 合并。</p><p>Another World 是一个于 2022 年在 Kaia 区块链上构建的韩国元宇宙项目，将成为 Lamina1 生态系统的一部分。根据声明，Lamina1 的母公司 Open Metaverse Limited 以“全代币交易”收购了 Another World。</p><p>在接下来的几周内，Lamina1 表示计划通过代币交换和定向入驻，将“Another World 超过 50 万名代币持有者、投资者、元宇宙构建者、开发者和爱好者迁移到 L1 生态系统”，以激活他们的社区。Another World 的员工将加入 Lamina1，努力“建设 Lamina1 Hub 平台”。</p><p>Rebecca Barkin 于 2023 年初成为 Lamina1 的首席执行官。除了 Stephenson，Lamina1 还由比特币基金会的联合创始人 Peter Vessenes 共同创立。Lamina1 的支持者包括 LinkedIn 联合创始人 Reid Hoffman 和 Ripple。</p><p>总体而言，自马克·扎克伯格决定将其科技帝国重新命名为 Meta 以来，元宇宙的关注度似乎有所下降。然而，包括 Lamina1、Decentraland 和 The Sandbox 在内的几家公司仍在继续发展其生态系统，希望元宇宙在未来几年内实现指数级增长。</p><p>Lamina1 在其帖子中表示：“Another World 在过去两年中原型制作和开发了一些链上/开放元宇宙体验，包括下载超过 15 万次的 M2E 应用‘GROUNDI’，一款激动人心的竞速游戏‘NO ONE ESCAPE’，以及一个迷你游戏中心 Another Arcade，该中心在 Google Play 所有应用中排名前十。”</p><p>Lamina1 还表示，Another World 的 AWM 代币持有者“将有 9 个月的时间将其代币转换为 L1，并开始在 L1 生态系统内激活”。</p>',
      url: 'https://tokeninsight.com/zh/news/south-korean-metaverse-project-another-world-merging-with-lamina1-after-token-deal?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a97df68.jpeg',
      source_url:
        'https://www.theblock.co/post/330397/south-korean-metaverse-project-another-world-merging-with-lamina1-after-token-deal',
      timestamp: 1733975708000,
      tags: [
        {
          name: '游戏',
        },
      ],
    },
    {
      title: '在 DAO 批准 ZKsync 迁移后，去中心化游戏项目 Treasure 上线主网',
      content:
        '<p><strong>据《The Block》报道</strong>：去中心化游戏生态系统 Treasure 在其 DAO 批准迁移至 ZKsync 后，已正式在主网启动。</p><p>最初，该项目计划使用 Arbitrum Orbit 工具包进行构建。</p><p>Treasure 是一个 Web3 游戏生态系统，最近投票决定迁移至 ZKsync，项目的 DAO 于周三宣布了这一主网启动消息。</p><h3>主要内容：</h3><p><strong>生态系统迁移</strong>：根据声明，“此次启动标志着加密领域最大的生态系统迁移之一。Treasure 正在将超过 15 款游戏及包括 MAGIC、ERC-20 代币和数十万 NFT 在内的重要资产，从其现有的 Arbitrum 生态系统转移到 ZKsync。”</p><p><strong>MAGIC 代币</strong>：MAGIC 是 Treasure 的原生代币。“MAGIC 代币是网络的支柱，促进交易、治理和整体经济景观，”Treasure 表示。DAO 参与者在治理投票中使用该代币。</p><p><strong>新区块链的迁移</strong>：这一举措标志着最新的项目计划转向新的区块链，展示了不同的以太坊二层（Layer-2）正在通过提供不同的技术和文化属性来发展独特的生态系统，从而可能对特定项目和社区有利。</p><p><strong>迁移投票</strong>：在 9 月，Treasure DAO 成员投票批准从 Arbitrum Orbit 迁移至 ZKsync。提案指出，ZKsync 更“适合” Treasure 在去中心化游戏领域的长期计划。ZKsync 是由 Matter Labs 在以太坊上构建的二层扩展解决方案，使用“零知识汇总”技术处理交易。</p><p><strong>纪念活动</strong>：为了纪念此次启动，Treasure 推出了“去中心化娱乐系统：卡带”活动，提供基于其游戏组合的免费纪念 NFT 铸造，灵感来自经典游戏系统。启动后的一个时期内，将每天推出可铸造和收集的新卡带。</p><p>Treasure 成立于 2021 年，自称为去中心化游戏控制台。该生态系统拥有多个 Web3 游戏，包括《The Beacon》、《Zeeverse》、《Wanderers》和《Smolbound》。</p>',
      url: 'https://tokeninsight.com/zh/news/decentralized-gaming-project-treasure-launches-mainnet-after-dao-approved-zksync-migration?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ikhdhcuvgw.jpeg',
      source_url:
        'https://www.theblock.co/post/330457/decentralized-gaming-project-treasure-launches-mainnet-after-dao-approved-zksync-migration',
      timestamp: 1733975145000,
      tags: [
        {
          name: '游戏',
        },
      ],
    },
    {
      title:
        '日本主要交易平台Coincheck成为第二家在纳斯达克上市的加密货币交易所',
      content:
        '<p><strong>据《The Block》报道</strong>：日本第二大加密货币交易所 Coincheck 将于周三通过反向合并交易在纳斯达克上市。合并后的公司预计初始隐含市值约为 13 亿美元。</p><p>Coincheck 的一位公司代表告诉《The Block》，该公司将与 Thunder Bridge Capital 合并，成为第二家在美国上市的加密货币交易所。</p><p>在经过数月修订所需文件后，两家公司于 5 月向美国证券交易委员会提交了最终的 F-4 表格，以便外国公司在美国上市。</p><p>据报道，Coincheck 自 2022 年起开始通过反向合并交易进行公开上市，该交易的估值为 12.5 亿美元。然而，由于今年早些时候对 SPAC 上市的披露要求增加，该过程 reportedly 延迟。</p><p>这一举措发生在加密行业增长期，随着比特币价格的飙升，再次吸引了交易者和机构资本的关注。</p><p>Coincheck 在 11 月的一份声明中表示：“上市将使我们获得国际投资者的关注，并利用纳斯达克上市的股票作为有效的货币，用于招募人才和进行全球收购，从而进一步扩大我们的加密资产业务。”</p><p>根据 Coincheck 母公司 Monex 提供的数据，该纳斯达克上市公司预计初始隐含市值约为 13 亿美元。</p><p>反向合并（De-SPAC）指的是一家私营公司与所谓的特殊目的收购公司（SPAC）合并。SPAC 是通过首次公开募股筹集资金的空壳公司，目的是收购希望上市的公司。</p><p>Thunder Bridge IV 在 2021 年 6 月的 IPO 中筹集了 2.3 亿美元。合并后，新公司将命名为 Coincheck Group N.V.，并在纳斯达克以 CNCK 的股票代码交易，松本大树将担任执行董事长。</p><p>SEC 于 11 月批准了公司的注册文件，允许股东在上周投票通过合并。</p><p>日本在线经纪公司 Monex Group 以 36 亿日元（3360 万美元）收购了 Coincheck，并仍将其作为公司的子公司运营。</p><p>Galaxy Digital、Barclays Capital 和 Cantor Fitzgerald &amp; Co. 等公司正在为 Thunder 提供反向合并交易的咨询，而 Monex 则委托摩根大通证券作为其唯一的财务顾问。</p><p>2018 年，Coincheck 遭遇了当时最大的加密交易所黑客攻击，导致日本实施更严格的 KYC 和报告要求。尽管交易所损失了价值 5.3 亿美元的 NEM 代币，但它能够使用自己的资本偿还所有 260,000 名受影响用户。</p><p>Coinbase 是最大的一家上市加密公司，于 2021 年通过直接上市在纳斯达克上市。同年，加密服务提供商 Bakkt 通过 SPAC 合并上市。</p>',
      url: 'https://tokeninsight.com/zh/news/major-japanese-trading-platform-coincheck-becomes-second-crypto-exchange-to-go-public-on-nasdaq?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/腌9dc7t6as.jpeg',
      source_url:
        'https://www.theblock.co/amp/post/330284/major-japanese-trading-platform-coincheck-becomes-second-crypto-exchange-to-go-public-on-nasdaq',
      timestamp: 1733914957000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: '以太坊研究人员 Max Resnick 加入了 Solana 开发公司 Anza',
      content:
        '<p><strong>据《The Block》报道</strong>：以太坊研究员 Max Resnick 宣布他离开 Consensys，加入专注于开发 Solana 的公司 Anza。Resnick 对以太坊的技术路线图持批评态度。</p><p>Max Resnick 是以太坊的一位著名研究员，他在周一的 X 帖子中表示：“我将把我的才华带到 Solana。”他称 Anza 的开发者非常出色，自己很高兴能有机会与他们合作。</p><p>Resnick 在 Consensys 的任期为两年，该公司创建了 MetaMask 钱包，他担任名为特殊机制组（Special Mechanisms Group）的子公司的研究负责人。在离开之前，Resnick 在社交媒体上批评了以太坊最新的技术路线图。他在 11 月 20 日的 X 帖子中写道：“路线图应该以目标为导向，而不是以解决方案为导向——以太坊的路线图关注解决方案，而不是问题。”</p><p>在一篇标题为《以太坊需要更大的梦想》的文章中，Resnick 声称，由于“开发防弹生产软件和应对核心开发者政治”，以太坊原始愿景已被“磨成尘埃”。</p><p>Resnick 在文章中指出，以太坊需要恢复其原始核心价值，并建议为网络的未来五年列出一系列目标，包括一秒钟的区块时间、单次确认和提高吞吐量。</p><p>他在公告中表示：“在我的头 100 天内，我计划尽可能多地为 Solana 协议编写规范，优先考虑费用市场和共识实现，我相信我可以在这些领域产生最大的影响。”</p><p>Resnick 转向 Solana 的时机正值围绕其作为以太坊强大威胁的崛起的辩论加剧。Solana 更快的交易速度和更低的费用吸引了越来越多的用户，今年的增长显著。</p><p>根据《The Block》的数据仪表盘，Solana 在 11 月的链上费用和协议费用上都超过了以太坊。该月 Solana 的链上去中心化交易所（DEX）交易量也超过了以太坊。</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-researcher-max-resnick-moves-to-join-solana-development-firm-anza?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/adf7vt9d.jpeg',
      source_url:
        'https://www.theblock.co/post/330068/ethereum-researcher-max-resnick-moves-to-join-solana-development-firm-anza',
      timestamp: 1733828352000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '随着在线贷款收益率飙升，稳定币总市值超过2000亿美元',
      content:
        '<p><strong>据《The Block》报道</strong>：总稳定币市值已达到创纪录的 2000 亿美元，随着链上借贷收益的激增。</p><p>Coinbase 分析师指出，稳定币市值的增长可能是由于投资者寻求接触链上借贷利率，这些利率超过了传统金融所提供的利率。</p><p>根据 CoinGecko 数据，总稳定币市值已超过 2000 亿美元，反映出过去一个月增长了 13%。同样，《The Block》的总稳定币供应指标（包括 Tether 财库中未发行的 USDT）也超过了 2000 亿美元。分析师指出，这一激增正值投资者寻求去中心化金融平台上更高收益的机会。</p><p>根据 DeFiLlama 的数据，稳定币市值的急剧增长始于 11 月 5 日，恰逢唐纳德·特朗普在美国总统选举中获胜。Coinbase 分析师还强调，USDC 在 Aave 上的存款利率在过去一个月内翻了一番。他们表示：“稳定币的借贷利率激增，年化利率达到 10-20%，在 Aave 和 Compound 的几乎所有部署网络中，包括以太坊和 Base。”此外，借贷协议中的锁定总价值达到了 540 亿美元，超过了之前牛市高峰的 520 亿美元。</p><p>Coinbase 分析师 David Duong 和 David Han 指出，稳定币市值的上升表明投资者希望利用 DeFi 借贷协议提供的日益增加的收益。他们表示：“我们认为这代表着一波新的资本流入，旨在利用远高于长期债券收益的高借贷利率，或者寻找链上的高 Beta 交易。”</p><p>除了借贷利率的上升外，Ethena 的收益代币 sUSDe 的年收益率已飙升至超过 24%，较 11 月初的约 13% 大幅上涨。然而，DeFiLlama 的数据预测，sUSDe 的年收益率可能在下个月降至 19% 以下。</p><p>Coinbase 分析师还指出，高收益资产（如 HyperLiquid 的 HYPE 代币和新推出的 AI 代理协议）中出现了新的机会。他们强调，这些更高的收益仅对链上参与者可用，推动投资者与这些去中心化平台互动，以利用潜在机会。</p><p>分析师指出：“比特币和其他主要加密货币的持续强劲表现推动了各个行业的显著链上活动，包括去中心化交易所（DEX）交易量、借贷活动和稳定币的增长。”</p>',
      url: 'https://tokeninsight.com/zh/news/total-stablecoin-market-cap-tops-200-billion-as-onchain-lending-yields-surge?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kyhfidyi68.jpeg',
      source_url:
        'https://www.theblock.co/post/329947/stablecoin-market-cap-200-billion-usd',
      timestamp: 1733827793000,
      tags: [
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: '报告：伊朗将对加密货币进行监管，而不是施加限制',
      content:
        '<p>伊朗财政部长表示，该国政府计划对加密货币进行监管，而不是限制其使用。</p><p>伊朗政府希望通过增加更多的监管措施来接受加密资产，而不是完全限制，经济事务和财政部长阿卜杜拉纳塞尔·赫梅提（Abdolnaser Hemmati）表示。</p><p>根据伊朗国营新闻社 Nour News 的报道，赫梅提在周六的全国活动中表示，政府旨在消除加密货币对经济的负面影响，同时利用其积极作用。该部长补充说，数字货币受伊朗中央银行的管辖。</p><p>赫梅提表示，他希望看到加密货币被用于促进伊朗的青年就业，帮助对抗美国制裁，并使该国的活动与全球经济对接。</p><p>同一天，伊朗中央银行发布了一份新文件，概述了其即将出台的加密货币政策安排，Nour News 报道称。这些即将出台的政策旨在支持加密交易者遵守当地的税收和反洗钱法律。</p><p>根据报告，伊朗投资者目前持有的加密资产估计在300亿美元到500亿美元之间，经济学家穆罕默德·萨德赫·阿尔霍塞尼（Mohammad Sadegh Alhosseini）表示。这大致相当于该国整个黄金市场的三分之一。</p><p>伊朗政府的这一声明正值美国当选总统唐纳德·特朗普为加密货币营造积极的监管环境而引发期待。</p><p>自上个月连任以来，特朗普已任命多位支持加密货币的候选人，负责其即将到来的任期内的各项工作，最近还任命长期支持加密货币的保罗·阿特金斯（Paul Atkins）担任证券交易委员会主席。</p>',
      url: 'https://tokeninsight.com/zh/news/iran-moves-to-regulate-crypto-instead-of-imposing-limits-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a9vd7ay7dvc.jpeg',
      source_url:
        'https://www.theblock.co/post/329917/iran-moves-to-regulate-crypto-instead-of-imposing-limits-report',
      timestamp: 1733742316000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '被黑的 Cardano 基金会 X 账户发布假代币，虚假的 SEC 诉讼通知',
      content:
        '<p>卡尔达诺基金会的 X 账号在周日被未知方攻击，导致发布了有关 Solana 代币的虚假公告，随后又发布了一条关于 SEC 起诉的错误声明。</p><p>卡尔达诺基金会在一份声明中确认了账号被攻击，并表示将会在基金会的 LinkedIn 页面上发布恢复访问权限的公告。</p><p>该账号首次被用来发布一条声称推出名为 $ADASOL 的代币的帖子，这是一种基于 Solana 的代币，声称是“为 Solana 的速度和创新重新构想的卡尔达诺”。</p><p>与一些诈骗尝试不同，这条帖子写得相对复杂，共有十三条内容解释了该代币的目的，并链接了真实资源，如卡尔达诺基金会的网站和一集最近讨论该代币的播客。</p><p>根据 DexScreener 的数据，这个虚假代币在交易量超过 50 万美元后，交易者们似乎意识到该代币是诈骗的结果。</p><p>帖子在发布后一小时内被删除，此时该账号又发布了一条虚假通知，声称卡尔达诺的社区收到了一份 SEC 的起诉通知。“鉴于这一意外的法律行动，我们做出了立即停止对 $ADA 代币所有支持的艰难决定，以确保遵守监管要求，”虚假通知中写道。</p><p>该帖子的回复功能已被禁用，在发布时在 X 上的浏览量超过 256,000 次，尽管许多引用推文警告该账号已被攻击。</p><p>当一位卡尔达诺的粉丝询问该通知是否真实时，卡尔达诺基金会的一位团队负责人回复：“确认，我们正在处理。”卡尔达诺社区的 X 账号随后也澄清：“卡尔达诺基金会的 X 账号 @Cardano_CF 已被攻击。请在我们处理此事时忽略该账号的任何帖子。”</p><p>卡尔达诺基金会在一份声明中表示，团队“正在积极恢复安全”，并指出恢复访问的确认将会在其 LinkedIn 页面上发布。“此次 X 账号的泄露并不表示其他平台或系统受到影响，”声明补充道。</p>',
      url: 'https://tokeninsight.com/zh/news/hacked-cardano-foundation-x-account-posts-fake-token-false-sec-lawsuit-notice?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/aef8r7.jpeg',
      source_url:
        'https://www.theblock.co/post/329879/hacked-cardano-foundation-x-account-posts-fake-token-false-sec-lawsuit-notice',
      timestamp: 1733742036000,
      tags: [
        {
          name: 'Cardano',
        },
      ],
    },
    {
      title:
        '解锁 DeSci：Ink Finance 提供去中心化解决方案，重塑科研融资与治理模式',
      content:
        '<p>Ink Finance&nbsp;拥抱DeSci领域，旨在有效解决传统科研面临的核心问题，促进去中心化科学（DeSci）的发展。</p><p>科研领域面临资金分配集中、申请流程繁琐及小型项目难以获得资助等挑战。Ink Finance&nbsp;具备通过去中心化自治组织（DAO）进行可定制可模块化组合可分阶段的融资方案，采用众筹模式和科研代币化，支持小额投资，确保更多项目能够获得资金支持。</p><p>此外，Ink Finance&nbsp;为 DeSci&nbsp;项目支持项目方一键铸币及通过智能合约实现分批次可视化线性释放代币，便于统筹管理，达到透明可追溯效果。且其治理方案结合董事委员会与 Token&nbsp;持有者的双层投票机制，确保决策高效透明，多方利益平衡。</p><p>在科研成果发表方面，Ink Finance&nbsp;通过去中心化同行评议和开放获取平台，建立基于区块链的透明审核流程，提升科研成果的发表效率，解决传统期刊的垄断、高额费用及审稿周期长的问题。</p><p>Ink Finance CEO Tony&nbsp;表示”Ink Finance&nbsp;是新一代合作式 DeFi（或者说是信用 DeFi） 的 SaaS&nbsp;级链上设施。DeSci 的项目方、赞助群体可以无代码直接使用，就如同在 web2&nbsp;世界里，任何一个网上经营的企业已经不需要自己再开发任何基建一样简单。在去中心化的框架下，不失透明、严谨、合规 。Ink Finance&nbsp;愿成为 DeSci&nbsp;领域里最有力的赋能工具”</p><p>通过这些创新方案，Ink Finance&nbsp;正在为科研领域带来变革，推动去中心化科学的蓬勃发展，助力更多科研项目的实现与推广。</p><p>目前Ink Finance(QUILL)上线Kucoin、BingX及去中心化DEX LFJ交易平台，24H涨幅榜前5名，用户可在三家交易平台进行QUILL交易。</p>',
      url: 'https://tokeninsight.com/zh/news/unlocking-desci-ink-finance-provides-decentralized-funding-solutions-to-reshape-financing-and-governance-models?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/ink.png',
      source_url: '',
      timestamp: 1733729956000,
      tags: [
        {
          name: 'DAO',
        },
      ],
    },
    {
      title: '唐纳德·特朗普任命大卫·萨克斯在白宫领导人工智能和加密技术',
      content:
        '<p><strong>据《The Block》报道</strong>：唐纳德·特朗普宣布，他任命 Yammer 创始人 David O. Sacks 为白宫的人工智能和加密货币负责人。</p><p>美国当选总统唐纳德·特朗普在周四宣布，Yammer 创始人和前 PayPal 首席运营官 David O. Sacks 将担任“白宫人工智能和加密货币负责人”。</p><p>特朗普在 Truth Social 上的声明中表示：“在这个重要角色中，David 将指导政府在人工智能和加密货币方面的政策，这两个领域对美国竞争力的未来至关重要。”</p><p>特朗普补充说，Sacks 将致力于制定法律框架，为美国加密货币行业提供更多的清晰度。公告中还提到，Sacks 将领导总统科学与技术顾问委员会。</p><p>在竞选期间，特朗普一直支持加密货币，并为即将到来的政府任命了亲加密的候选人。就在本周早些时候，特朗普宣布任命前共和党证券交易委员会委员 Paul Atkins 担任该机构的主席，此前的主席 Gary Gensler 将于 1 月离职。</p>',
      url: 'https://tokeninsight.com/zh/news/donald-trump-appoints-david-sacks-to-lead-ai-and-crypto-at-white-house?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/foaed86.jpeg',
      source_url:
        'https://www.theblock.co/post/329725/donald-trump-appoints-david-o-sacks-to-lead-ai-and-crypto-at-white-house',
      timestamp: 1733482627000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        'Ink Finance ($QUILL) 上线 KuCoin、BingX 和去中心化交易所 LFJ（前 Trader Joe）',
      content:
        '<p>Ink Finance 于 12 月 2 日 10:00 UTC 正式在 KuCoin 上线，随后在 11:00 UTC 登陆 BingX，开启 $QUILL 交易。在 24 小时内，$QUILL 价格峰值上涨达 120%。12 月 3 日，$QUILL 还上线了去中心化交易平台 LFJ（前 Trader Joe）。用户现在可以在 KuCoin 和 BingX 进行现货交易，也可以在 LFJ 上进行代币兑换。</p><p>KuCoin 已于 12 月 5 日 13:00 UTC 启动了令人兴奋的 10,000 枚 $QUILL AMA 奖励活动。同时，平台正在举办一场奖励更丰厚的交易竞赛。有关详细信息，请访问：<a rel="noopener noreferrer nofollow" target="_blank" href="https://www.kucoin.com/announcement/en-ink-finance-quill-listing-campaign-400000-quill-to-giveaway">KuCoin 交易竞赛公告</a>。</p><p>Ink Finance 的 Stake-to-Earn 质押奖励计划现已上线官方质押网站。用户可以质押 $QUILL 代币以获得 $QUILL 奖励，年化收益率（APY）高达 300%。这一吸引力极大的 APY 预计将持续数月。Ink Finance 提供高流动性的质押机制，参与者可随时质押和提取，无需支付罚金。访问 <a rel="noopener noreferrer nofollow" target="_blank" href="https://app.inkfinance.xyz/DAO/0x/daos/stake">Ink Finance 质押网站</a> 立即参与。 Ink Finance 是一个协作金融协议，为各种规模的组织提供创建高效管理结构和透明链上操作的能力，同时具备强大的风险控制和公信力。其主要应用场景包括：影响力人士众筹，实物资产（RWA）承销，DeFi 流动性池，实现从 Web2 到 Web3 的无缝过渡。</p><p>Ink Finance 还将多种功能整合到一个平台中，超越了传统工具，如 Snapshot、GnosisSafe 和 Syndicate 等，为用户提供更全面的链上金融解决方案。</p>',
      url: 'https://tokeninsight.com/zh/news/ink-finance-quill-listed-on-kucoin-bingx-and-dex-lfj-prev.-trader-joe?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ink_news.png',
      source_url: '',
      timestamp: 1733405554000,
      tags: [
        {
          name: 'DAO',
        },
      ],
    },
    {
      title:
        '在比特币攀升至 10 万美元里程碑期间，Mt. Gox 将 24 亿美元的比特币转移到未知地址',
      content:
        '<p><strong>据《The Block》报道</strong>：已破产的加密货币交易所 Mt. Gox 向一个未标记的钱包发送了超过 27,871 BTC。</p><p>此次转账发生在比特币首次突破 100,000 美元大关时。</p><p>破产的加密货币交易所 Mt. Gox 在周三深夜转移了近 24,000 BTC，价值约 24 亿美元，Arkham Intelligence 的数据显示。</p><p>一个未标记的钱包地址“1N7jW…1u8Yp”从 Mt. Gox 的其他冷钱包存储中接收了 24,051.75 BTC。这是该交易所自 11 月 12 日以来的第一次大规模转账。</p><p>目前尚不清楚周一的转账是否是 Mt. Gox 未来向债权人分配的部分，但过去类似的转账往往会在通过集中交易所（如 Bitstamp 和 Kraken）进行还款之前发生。今年早些时候，这家已破产交易所将其还款截止日期从 2024 年 10 月 31 日推迟至 2025 年 10 月 31 日。</p><p>随着剩余的 Mt. Gox 债权人等待他们的 BTC 还款，比特币在周三的市场反弹中超过了 100,000 美元的基准，受到了美国选举结果对加密货币的积极影响。根据《The Block》的比特币价格页面，比特币在过去 24 小时内上涨了 7%，交易价格为 102,952 美元。</p><p>Mt. Gox 于 2010 年在东京成立，曾是全球最大的比特币交易所，直到 2014 年该平台遭遇重大安全漏洞，损失至少 850,000 BTC。数千名债权人一直在等待其比特币的归还，这一过程在过去几个月内正在展开。</p>',
      url: 'https://tokeninsight.com/zh/news/mt.-gox-moves-2.4-billion-in-bitcoin-to-unknown-address-during-currency-s-climb-to-100-000-milestone?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/阿斗9分7是9a.jpeg',
      source_url:
        'https://www.theblock.co/post/329552/mt-gox-moves-2-8-billion-worth-of-bitcoin-arkham',
      timestamp: 1733396610000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: 'circle 支持的 Layer 1 Xion 推出主网和游戏化代币空投机制',
      content:
        '<p><strong>据《The Block》报道</strong>：Layer 1 区块链 Xion 已经推出其主网，并引入了一种“赢或输”（Double or Nothing）机制，将其初始代币空投游戏化。</p><p>Xion 在 4 月份的 A 轮融资中筹集了 2500 万美元，此前已从 Circle Ventures、Animoca Brands、Multicoin 等筹集了 1100 万美元。</p><p>Xion 是一个专注于链抽象的 Layer 1 区块链，推出了主网，并为其初始 XION 代币空投分发引入了不寻常的机制。</p><p>“赢或输”空投功能意味着符合条件的参与者可以选择通过游戏化的转盘来潜在地翻倍或失去他们的奖励，具体细节在与《The Block》分享的声明中提到。</p><p>Xion 基于 Comet BFT 共识框架和 Cosmos SDK，这是一个开发工具包和软件包，广泛用于 Injective、Osmosis 和 dYdX Chain 等项目。该网络采用“广义抽象”，构建用户友好的区块链生态系统，无需钱包账户、签名或额外的技术注册。这使用户能够无缝地与去中心化应用程序互动，而无需记住种子短语或存储私钥，提供了一种更熟悉的 Web2 风格体验。</p><p>XION 是一种多功能的实用代币，服务于 Xion 生态系统中的多项功能，包括网络使用费用、治理和权益证明安全。Xion 也是第一个将 USDC 作为主要交易货币整合的区块链，这意味着所有在网络上构建的产品将以稳定币显示用户友好的价格。</p><p>Xion 的“相信某种事物”初始分配的资格由测试网参与情况和与合作社区的互动等因素决定。根据团队的说法，首次空投将分配多达 5%（1000 万）总共 2 亿 XION 代币的供应量，目前的预交易价值超过 5000 万美元。此次初始空投中，69% 分配给 Xion 社区，其余部分分配给在生态系统中表现出强力支持的行业参与者，包括 Berachain、Injective、Pyth、Monad、Milady、Brett 和 SPX6900 社区。</p><p>Xion 的一位代表告诉《The Block》，其整体代币供应的 23% 分配给生态系统，15% 分配给协议和基金会，15% 分配给社区和启动，27% 分配给战略支持者，20% 分配给核心团队。</p><h3>消除加密的复杂性</h3><p>旨在去除加密的复杂性，并得到超过 75 个合作伙伴的生态系统支持，以及声称拥有 400 万个活跃的链上钱包，该网络将专注于与支付、社交社区、网络订阅、忠诚计划和游戏相关的用例。</p><p>例如，Xion 声称，网络上的消费者应用 EarnOS 在短短 72 小时内吸引了来自 159 个国家的 100,000 名用户。EarnOS 使公司能够创建用户可以完成以换取奖励的“任务”，根据项目，像 Uber、Baskin Robbins、The North Face、Sunglass Hut 和 Lacoste 等品牌的关注度通过这些活动增长了三倍。Xion 生态系统还与 Injective、Sei 和 Pyth 紧密合作，并将其链抽象扩展到 Solana、BNB Chain 和 Avalanche，团队表示。</p><p>“我们构建了一个平台，让加密的魔力在幕后闪耀，摆脱了通常的混乱和复杂，”Xion 网络的核心贡献者之一、化名为 Burnt Banksy 的创始人兼 CEO 说。“这不仅仅是与竞争对手竞争，而是推动创新，打破界限，让区块链世界充满可能性。通过 Xion，加密变得如此无缝，几乎是看不见的。”</p><p>Xion 在 4 月份宣布已在 A 轮融资中筹集了 2500 万美元，参与者包括 Animoca Brands、Laser Digital、Multicoin、Arrington Capital、Draper Dragon、Sfermion 和 GoldenTree。这使得其总融资额达到了 3600 万美元。</p><p>Xion 在筹集了来自 Circle Ventures、Animoca Brands、Multicoin、HashKey 和 Valor 等公司的 1100 万美元后，于 2023 年 12 月推出了测试网，《The Block》此前报道过。</p>',
      url: 'https://tokeninsight.com/zh/news/circle-backed-layer-1-xion-launches-mainnet-and-gamified-token-airdrop-mechanism?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdfoajshbfjk7.jpeg',
      source_url:
        'https://www.theblock.co/post/329495/circle-backed-layer-1-xion-launches-mainnet-gamified-token-airdrop-mechanism',
      timestamp: 1733396310000,
      tags: [
        {
          name: 'Layer 1',
        },
      ],
    },
    {
      title: '2024 年币安资金流入量超排名后 10 家交易所总和近 40%',
      content:
        '<p>作为全球最大的加密货币交易所，币安在用户资金流入方面占据了压倒性优势。截至目前，币安的资金流入已达&nbsp;216&nbsp;亿美元，相比排名后 10&nbsp;大加密货币交易所的总和（159&nbsp;亿美元），高出&nbsp;36%。数据来源于 DefiLlama。</p><p>今年，币安的资金流入量得益于全球对数字资产的乐观情绪，这种情绪受到多方面因素的推动：重大的监管胜利、日益增长的采用率，以及历史性的价格里程碑。此外，币安的全球用户群已扩展至&nbsp;2.44&nbsp;亿人，越来越多用户将资金存入币安以参与可能成为加密货币“黄金时代”的开端。</p><p>币安的&nbsp;Launchpool&nbsp;项目表现强劲，为平台吸引了大量资金，反映了用户对新代币项目日益浓厚的兴趣。数据显示，大部分资金倾向于留在币安平台上，进一步巩固了其行业地位。</p><p>2024&nbsp;年加密货币行业创下历史性里程碑。比特币 ETF&nbsp;的推出成为加密行业的重要里程碑。这些 ETF&nbsp;已在包括美国、巴西、香港和澳大利亚等主要市场获得批准，标志着数字资产的主流接受度显著提升。</p><p>仅在一年内，比特币 ETF&nbsp;的净资金流入已超过黄金 ETF，这不仅凸显了加密货币在金融领域日益增长的重要性，也表明其与传统机构和系统的整合加深。</p><p>比特币 ETF&nbsp;的推出为机构投资者提供了便捷的敞口和风险对冲工具，对近期市场反弹起到了重要推动作用。随着更多资金流入这些 ETF，比特币正加速融入主流金融市场。</p><p>“2024&nbsp;年是加密行业具有里程碑意义的一年。我们对全球 2.44&nbsp;亿用户以及不断增长的支持者表示由衷的感谢，他们继续选择币安作为交易平台。他们的坚定支持和信任激励我们不断创新，并在数字资产领域提供最优质的体验。”Richard Teng，币安 CEO</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/Picture14.png"></figure><p>根据数字资产数据提供商&nbsp;CCData&nbsp;的统计，币安最近实现了一个历史性里程碑，成为首个累计交易量突破&nbsp;100&nbsp;万亿美元&nbsp;的中心化加密交易所。</p><p>链上数据分析机构&nbsp;CryptoQuant&nbsp;的报告指出，今年标志着加密行业的重大转变，机构投资者的参与度显著提高。数据显示：2024&nbsp;年所有交易所的平均&nbsp;比特币存款&nbsp;从 2023&nbsp;年的&nbsp;0.36 BTC&nbsp;增至&nbsp;1.65 BTC；平均&nbsp;USDT&nbsp;存款&nbsp;从&nbsp;19,600&nbsp;美元&nbsp;激增至&nbsp;230,000&nbsp;美元。这些数据反映了机构和企业投资者的兴趣显著增长，与以往的散户交易行为形成了鲜明对比。</p><p>CryptoQuant&nbsp;指出：“在主要交易所中，币安在这一机构增长中处于领先地位，其报告的平均比特币存款增幅最大。”</p>',
      url: 'https://tokeninsight.com/zh/news/binance-inflows-for-2024-are-almost-40-higher-than-the-next-10-exchanges-combined?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/bn.png',
      source_url: '',
      timestamp: 1733313665000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '由于韩国的政治动荡，Tron 在过去的一天里飙升了 80%',
      content:
        '<p><strong>据《The Block》报道</strong>：Tron（TRX），该网络的原生代币，在过去一天内上涨了约 80%。</p><p>有些人将此次上涨与韩国总统突然宣布的戒严法引发的政治混乱联系在一起。</p><p>一位分析师表示，Tron 的上涨是多个因素的混合，包括“恐龙轮换”（Dino rotation）。</p><p>Tron 是 Justin Sun 的 Tron 网络的原生代币，过去一天上涨了约 80%，这一上涨受到多种因素的推动，其中包括韩国的政治混乱，而韩国正是全球最大且反应最敏捷的零售加密货币市场之一。</p><p>根据《The Block》的价格页面，TRX 上涨了 78.4%，目前交易价格为 0.40 美元。周二晚上，TRX 一度上涨至超过 0.43 美元。基于 Tron 的 DeFi 协议代币 Just 上涨了 50%，交易价格为 0.06 美元。</p><p>一些社交媒体平台 X 上的用户将 Tron 的突然上涨归因于韩国的混乱局势。</p><p>周二晚上，韩国总统尹锡悦宣布了紧急戒严法，这是 40 多年来的首次。韩国的戒严法是指对平民政府职能实施直接的军事控制，通常是为了应对对公共秩序的重大威胁。</p><p>尹锡悦在五小时后取消了戒严法，此前国会的立法者一致投票反对该声明。</p><p>X 用户 @toy7594 写道：“在戒严期间，所有加密货币似乎都转向了外国交易所，因为韩国交易所崩溃了。TRON 正在上涨。”</p><p>该国最大的两个集中交易所 Upbit 和 Bithumb 因活动骤增而报告服务暂停，持续时间为一到两个小时。</p><p>BTC Markets 的加密分析师 Rachael Lucas 表示：“Tron（TRX）的最近上涨部分可能是由于韩国的政治不稳定。TRX 作为在交易所之间广泛使用的转移代币，使其成为希望快速转移资金的交易者的工具。”</p><p>Lucas 指出，Upbit 的交易限制（该交易所有时占据该国现货交易量的 80% 以上）可能促使交易者寻找替代方案，从而增加 TRX 的交易量。</p><p>与此同时，Presto Research 的分析师 Min Jung 告诉《The Block》，虽然这次政治事件可能在 Tron 的上涨中起了一定作用，但上涨不太可能仅仅由此事件驱动。</p><p>“这也可能是更广泛的‘恐龙轮换’的一部分，在当前市场条件下，像 $XRP 这样的传统加密货币正在上涨，”Jung 表示。其他被认为是传统代币的加密货币如 Iota 和 Vechain 最近也见证了上涨。</p><p>“此外，有传言称 $TRX 的相当一部分供应由 Justin Sun 控制，这引发了关于此次上涨是否是自然或受影响的质疑，”Jung 告诉《The Block》。</p><p>TRON 基金会创始人 Justin Sun 最近频繁出现在新闻头条中，他被任命为美国当选总统唐纳德·特朗普支持的 DeFi 项目 World Liberty Financial 的顾问。</p><p>上个月，Sun 还花费 620 万美元购买了 Maurizio Cattelan 著名的用胶带粘的香蕉艺术作品“Comedian”，并在上周举行的新闻发布会上吃掉了它。</p>',
      url: 'https://tokeninsight.com/zh/news/tron-surges-80-in-past-day-amid-political-unrest-in-south-korea?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/as9d6f_79fa.jpeg',
      source_url:
        'https://www.theblock.co/post/329384/tron-surges-80-in-past-day-amid-political-unrest-in-south-korea',
      timestamp: 1733308936000,
      tags: [
        {
          name: '波场',
        },
      ],
    },
    {
      title: '韩国短暂的军事统治引发了创纪录的 340 亿美元的当地加密交易',
      content:
        '<p><strong>据《The Block》报道</strong>：韩国加密货币交易所记录了超过340亿美元的交易量，在此期间，韩国总统宣布了紧急戒严法，但随后不得不迅速解除。</p><p>这项戒严法在立法者迅速投票一致反对后被撤销。</p><p>在过去24小时内，韩国本地现货加密货币交易所的交易量超过340亿美元，而韩国总统尹锡悦于周二晚上宣布了紧急戒严，该法持续了六个小时。</p><p>根据CoinMarketCap的数据，韩国交易所Upbit、Bithumb、Coinone、Korbit和Gopax在截至周三上午10:30的24小时内，总共记录了342亿美元的加密交易量。其中，韩国最大的交易所Upbit单独处理了272.5亿美元的加密货币。</p><p>这24小时的交易量几乎是12月2日录得的180亿美元的两倍，后者已因超过当地股市的日交易量而成为头条新闻。根据当地加密新闻媒体Digital Asset，周二的交易量创下了今年最高的单日总额。</p><p>加密交易量的激增发生在韩国总统尹锡悦周二深夜宣布紧急戒严法时，他表示此举旨在保护国家免受“反国家”势力对反对派左翼政党的威胁。</p><p>据当地新闻机构News1报道，韩国交易者纷纷在本地交易所出售其加密货币，导致Upbit上的比特币价格一度跌至8800万韩元（约62182美元）。其他大多数在韩国主要交易所的加密货币也出现了价格下跌，同时由于活动激增，交易平台发生了服务中断。</p><p>随着尹总统在宣布六小时后取消戒严法，价格已趋于稳定。周三凌晨1点召开的紧急会议上，出席的立法者一致投票反对戒严法。</p><p>据报道，韩国反对党周三早晨宣布将对尹总统、国防部长和内政安全部长提起叛国指控，并推动对他们的弹劾。</p><p>与此同时，去中心化预测市场平台Polymarket上，关于尹总统是否会在今年离职的50万美元赌注的赔率早些时候飙升至78%，之后回落至47%。如果尹总统的任期完全履行，预计将于2027年5月结束。</p>',
      url: 'https://tokeninsight.com/zh/news/south-korea-s-short-lived-military-rule-sparks-record-34-billion-in-local-crypto-trade?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/vdso9f769.jpeg',
      source_url:
        'https://www.theblock.co/post/329393/south-koreas-short-lived-military-rule-sparks-record-34-billion-in-local-crypto-trade',
      timestamp: 1733308399000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'WisdomTree 向 SEC 申请 XRP 现货 ETF',
      content:
        '<p><strong>据《The Block》报道</strong>：WisdomTree XRP 基金将会在 Cboe BZX 交易所上市。</p><p>WisdomTree 于 11 月 25 日在特拉华州注册了一个 XRP 实体。</p><p>交易所交易基金发行商 WisdomTree 在周一向美国证券交易委员会（SEC）提交的文件中采取了步骤，以潜在推出 ETF。</p><p>如果获得 SEC 批准，WisdomTree XRP 基金将会在 Cboe BZX 交易所上市，目前尚未分配交易代码。根据文件，纽约梅隆银行是该基金的管理人。</p><p>“信托的投资目标是获得对 XRP 价格的敞口，减去信托运营的费用和负债，”根据注册声明。</p><p>该公司于 11 月 25 日在特拉华州注册了一个 XRP 实体。其他发行商，包括 Bitwise、21Shares 和 Canary Capital，也已申请现货 XRP ETF。</p><p>SEC 以前没有批准过现货 XRP ETF。该机构自 2020 年以来与 Ripple 处于法律斗争中，指控该公司通过销售 XRP 筹集了 13 亿美元，将其视为未注册证券。</p><p>一年多前，纽约南区地方法院法官 Analisa Torres 裁定，Ripple 的某些销售（称为程序化销售）并未违反证券法，因为这些销售采用了盲标过程。然而，她裁定，Ripple 直接向机构投资者销售的其他代币属于证券。随后在 8 月，法官 Torres 判令 Ripple 支付 1.25 亿美元的罚款。</p><p>SEC 和 Ripple 都在努力对 Torres 法官的判决部分进行上诉。</p><p>在注册声明中详细列出的风险方面，WisdomTree 警告投资者 XRP 可能被视为证券。</p><p>“确定某一特定数字资产是否符合证券的定义是复杂且不可预测的，可能会对其作为证券的分类提出有效的法律论点，”文件中指出。“此外，SEC 已暗示，数字资产的状态可能会随着情况的发展而变化。”</p><p>截至 12 月，XRP 已成为仅次于比特币和以太坊的全球第三大加密货币。</p>',
      url: 'https://tokeninsight.com/zh/news/wisdomtree-files-with-sec-for-spot-xrp-etf?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/0as8df7_0.jpeg',
      source_url:
        'https://www.theblock.co/post/329111/wisdomtree-files-with-sec-for-spot-xrp-etf',
      timestamp: 1733223067000,
      tags: [
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Coinbase 的法定货币转加密货币服务整合了 Apple Pay',
      content:
        '<p><strong>据《The Block》报道</strong>：Coinbase 正在将 Apple Pay 集成到其法币到加密货币的入口解决方案中，之前称为 Coinbase Pay。</p><p>作为美国最大的加密货币交易所，Coinbase 正在根据开发者文档，将 Apple Pay 集成到其法币到加密货币的支付产品中。</p><p>该产品 Coinbase Onramp 提供一键购买，减少用户为资助自我保管钱包所需经历的繁琐过程。Coinbase 在一份声明中表示，使用加密货币往往涉及“很多摩擦，因此用户会放弃使用。”</p><p>“这一功能在感恩节前夕首先向一小部分客户推出，”Coinbase 的一位代表在与《The Block》的直接消息中表示。</p><p>“用户进入加密货币的过程可能非常繁琐：这可能需要很长时间，要求他们经历冗长的 KYC（通常需要反复的互动），并使用多个应用程序，仅仅是其中的一些麻烦，”该公司在其文档中指出。</p><p>Onramp，之前称为 Coinbase Pay，基本上是一个软件开发工具包（CDK）和一系列 API，使开发者能够将法币到加密货币的入口嵌入到他们的移动或网页应用程序和浏览器扩展中。该工具被广泛使用，包括在流行的钱包如以太坊的 Metamask 和 Rainbow、Solana 的 Phantom 以及交易所自家的 Coinbase Wallet 中。</p><p>该平台支持超过 60 种货币，并可以与用户的银行账户、借记卡和 Coinbase 账户连接。它为符合条件的购买提供“轻量级”的 KYC 筛查和免费的 USDC 转账。</p><p>在 Onramp 上进行入门是直接的：用户输入自己的 Coinbase 凭据，进行双因素身份验证，然后授权应用程序“代表他们采取行动”。</p><p>交易所已将 Apple Pay 集成到 Onramp 中的消息最早是在 10 月份的 Coinbase 开发者平台文档更新中披露的。根据 Oberlo 的统计，约有 6000 万美国人使用 Apple Pay。</p><p>截至发稿时，Coinbase 的股票 COIN 上涨超过 4%。</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-s-fiat-to-crypto-onramp-integrates-apple-pay?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdof6a_tof.jpeg',
      source_url:
        'https://www.theblock.co/post/329084/coinbases-fiat-to-crypto-onramp-to-integrate-apple-pay',
      timestamp: 1733222572000,
      tags: [
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: 'Hyperliquid 的市值超过了 aave，占去中心化永久掉期交易量的近一半',
      content:
        '<p><strong>据《The Block》报道</strong>：Hyperliquid，这个去中心化的永久掉期交易平台，最近向在平台上交易并获得积分的用户空投了3.1亿个完全解锁的代币，其HYPE代币价格飙升，市值已超越借贷平台Aave。</p><p>据《The Block》的数据，该平台还声称占据了几乎所有永久掉期交易量的近一半。</p><p>自上周五代币生成事件（TGE）以来，Hyperliquid的代币持续上涨。在此次事件中，去中心化的永久掉期交易平台向在平台上交易的用户空投了3.1亿个完全解锁的代币，用户在交易中获得积分，这一活动持续了六个月，直到5月为止。</p><p>这些代币在当时的价值约为12亿美元，现在在HYPE的当前价格9.39美元下，价值已超过29亿美元，使该代币的完全稀释估值达94亿美元，根据《The Block》的HYPE价格页面，代币在过去24小时内上涨超过10%。</p><p>HYPE的市值目前约为31亿美元，超过了借贷平台Aave、隐私加密货币Monero、以太坊Layer 2的Optimism以及其他知名加密项目。</p><p>自10月以来，Hyperliquid首次在去中心化永久掉期平台的日交易量中攀升至领先地位，昨日根据《The Block》的数据，该平台在所有此类平台的交易量中占据了近47%。与此同时，其最大竞争对手Synfutures的交易量从11月29日星期五到11月30日星期六下降了30%，而Hyperliquid的交易量仅下降了10%。</p><p>HYPE在Hyperliquid生态系统中扮演着关键角色；该代币可以被质押以保障HyperBFT，这是一个优化的权益证明共识机制，确保网络安全并促进去中心化。此外，HYPE还是HyperEVM的原生燃气代币，帮助支付交易费用。</p><p>Hyperliquid的联合创始人Jeff Yan在星期六于社交媒体X上写道：“Hyperliquid的创世代币向比特币的原始精神致敬：所有权属于信仰者和实践者，而非寻租的内部人士。Hyperliquid是金融的演变。只有当它包容了所有金融时，Hyperliquid才算成功。”</p><p>然而，Hyperliquid因其目前的闭源性质受到一些加密创始人的批评。“你怎么知道这些数字、交易量和总锁仓值是正确的？因为他们的API自我报告？”跨链交换协议Gasp的创始人兼首席执行官Peter Kris在社交媒体X上写道。</p>',
      url: 'https://tokeninsight.com/zh/news/hyperliquid-s-hype-surpasses-aave-in-market-cap-claims-nearly-half-of-decentralized-perpetual-swaps-volume?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/das9of79_g.jpeg',
      source_url:
        'https://www.theblock.co/post/328869/hyperliquids-hype-surpasses-aave-in-market-cap-claims-nearly-half-of-decentralized-perpetual-swaps-volume',
      timestamp: 1733136890000,
      tags: [
        {
          name: 'DEX',
        },
      ],
    },
    {
      title: 'XRP 成为全球第三大加密货币，市值超过 Tether 的 USDT',
      content:
        '<p><strong>据《The Block》报道</strong>：与Ripple Labs紧密相关的XRP，其市值已达到1418亿美元，超越了USDT的1345亿美元。</p><p>XRP已在市值上超越了Tether的稳定币，成为全球第三大加密货币，仅次于比特币和以太坊。</p><p>目前，XRP的市值为1418亿美元，价格在过去24小时内上涨了30%，达到2.46美元。根据《The Block》的价格页面，XRP在过去一个月内上涨了364.1%。</p><p>XRP的激增是在其周末市值超越Solana之后发生的。比特币上涨1.28%，目前交易价格为97862美元，而以太坊上涨0.68%，变动价格为3721美元。Solana则小幅下跌0.96%，报235.84美元。</p><p>Presto Research的研究主管Peter Chung告诉《The Block》，XRP近期的强劲表现似乎受到上周NYDFS即将批准Ripple稳定币RLUSD的消息推动。</p><p>据福克斯新闻报道，纽约金融服务部可能很快会批准Ripple的RLUSD稳定币，该公司正考虑在12月4日推出。Ripple尚未立即回应《The Block》的评论请求。</p><p>XRP的价格动能可能也受到证券交易委员会（SEC）主席Gary Gensler宣布将在1月辞职的影响。自2020年以来，SEC一直与Ripple进行法律斗争，指控该公司通过销售XRP筹集了13亿美元，认为其为未注册证券。</p><p>Chung表示：“Gensler辞职也是一个积极信号，因为这意味着新领导下的SEC可能会解决或撤回许多未决诉讼，包括对Ripple的上诉。”他补充道：“很难判断这波上涨会持续多久。如果XRP社区能够利用RLUSD来培育XRP Ledger的生态系统并创造价值，这种上涨有可能持续。Ripple在不受SEC诉讼干扰的情况下，肯定会处于更好的位置。”</p><p>市场参与者还在关注现货XRP交易所交易基金的可能性。包括21Shares、Canary Capital和Bitwise在内的多家资产管理公司已申请XRP ETF。</p>',
      url: 'https://tokeninsight.com/zh/news/xrp-becomes-world-s-third-largest-crypto-overtakes-tether-s-usdt-in-market-cap?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s9df769sa.jpeg',
      source_url:
        'https://www.theblock.co/post/328877/xrp-third-largest-overtakes-usdt-market-cap',
      timestamp: 1733136473000,
      tags: [
        {
          name: '交易市场',
        },
      ],
    },
    {
      title: 'Coinbase 不支持 Celo Layer 2 升级的决定引起了利益相关者的不安',
      content:
        '<p><strong>据《The Block》报道</strong>：Coinbase表示，将不支持Celo即将进行的从Layer 1到Layer 2的迁移，该迁移属于Optimism的Superchain生态系统。这一决定在Celo社区引发了批评，cLabs首席执行官Marek Olszewski表示，这让人感觉“像是对以太坊以Layer 2为中心的扩展路线图的干扰”。</p><p>加密货币交易巨头Coinbase在周三晚间宣布，它将不支持Celo从Layer 1到Layer 2的迁移，这导致Celo社区的批评。</p><p>“Celo的L1区块链（Coinbase代号：CGLD）将于2025年1月16日迁移到Celo L2，”交易所发布在社交媒体上的消息称。“Coinbase将不支持此次迁移。由于是通过硬分叉进行的迁移，客户必须在2025年1月13日之前从Coinbase提取CGLD，以防止资金变得无法访问。”</p><p>该消息指出，虽然Coinbase将Celo Layer 1网络列为CGLD，但其他钱包和交易所将其列为CELO，确认用户可以从Coinbase将CGLD发送到其他CELO钱包地址。</p><p>“Coinbase选择不支持Celo Layer 2升级令人失望，”cLabs的首席执行官Olszewski回应道。“这感觉像是对以太坊的Layer 2中心扩展路线图的干扰。为什么其他EVM兼容的Layer 1现在要跟随这一决定呢？”</p><p>以太坊的Layer 2中心路线图专注于通过使用Rollups等解决方案来增强可扩展性，这些解决方案在链下处理交易，以提高吞吐量并降低成本，同时通过以太坊主网保持安全性。</p><p>“这次硬分叉是否变得有争议？Celo社区应该如何回应？”Olszewski补充道。“Celo Layer 1的验证者可以选择保留当前的Layer 1链，并将其重新命名为Celo Gold（CGLD），以便利Coinbase及其用户的使用。幸运的是，Coinbase已经在使用这个代号，因此CGLD可能会变成一种memecoin，”他说。“一个好处是，如果Coinbase将来决定支持Layer 2，他们可能会使用正确的代号：CELO。”</p><p>CELO将继续作为Celo Layer 2的原生代币，转变为以太坊上的ERC-20，以便实现其Superchain集成，代币总量仍为10亿。</p><p><strong>“可能是一个失误”</strong><br>Olszewski并不是唯一对这一决定感到失望的人，Verda Ventures的合伙人Alex Witt问道，作为Coinbase孵化的网络Base也属于以太坊对齐的Optimism Superchain生态系统的一部分，为什么它也不支持Celo。</p><p>“Celo作为Superchain的一部分，使其与Base的关系尽可能接近1:1，”另一位社区成员说。“因此，如果Base可以与Coinbase直接对接，那么其他像Celo这样的Superchain扩展也应该可以。”</p><p>以太坊教育者Anthony Sassano建议，这可能只是Coinbase内部沟通的问题，他加入了呼吁交易所重新考虑其立场的社区成员行列。EigenLayer的创始人Sreeram Kanna表示同意。“我认为这很可能是Coinbase内部的一个失误，”他说。“不可能有一家正在建设用户最多的以太坊Layer 2并且是OP公共产品核心贡献者的公司在Celo成为基于OP Stack的Layer 2后选择停止支持它。”</p><p>其他人质疑为什么在Celo的计划转变已知超过一年的情况下，决策却是在“最后一刻”做出的。Celo在2023年7月首次提交了Layer 2转型计划，随后获得了治理批准，并提议在今年四月使用OP Stack进行启动。</p><p>“我们将此视为一个回归的时刻，这是Celo社区思考已久的事情，直到最近的Layer 2研究发展，例如EigenDA（与以太坊对齐的数据可用性协议）才使Celo能够在作为Layer 2时保持低燃气费用，”Olszewski在去年11月说道。</p><p>Celo的Baklava Layer 2测试网升级预计将在12月12日进行，以便为1月中旬的主网发布做好准备。其Dango Layer 2测试网于7月启动。</p><p>技术复杂性、安全问题和监管不确定性<br>然而，加密社区中的一些人指出，Coinbase可能做出这一决定有一些合理的原因。</p><p>前a16z加密首席信息安全官Nass Eddequiouaq表示：“大多数人忽视的一点是，支持一个新链对于交易所来说是一个庞大的技术、操作和监管工作，尤其是在美国。”他补充道，“交易所和保管机构通常会等待观察哪个分叉获得了更多活动后，才会添加对它的支持并淘汰另一个。”</p><p>其他人强调了包括引入漏洞的安全风险、对用户体验的干扰（可能导致混淆或资金损失）以及Coinbase专注于核心服务的因素——这意味着它可能没有资源支持每一个新的Layer 2或硬分叉。</p><p>在周四发布后，Coinbase回应称，任何指责其不支持以太坊可扩展性的说法都是不真实的。“Coinbase专注于成为加密经济的桥梁，支持Layer 1和Layer 2，”该交易所表示。“虽然我们目前不支持这项技术迁移，但我们计划在迁移完成后重新评估Celo Layer 2。”</p><p>与此同时，Kraken提议的新Layer 2链Ink的创始人Andrew Koller，也表示支持Celo。“Kraken和Ink都非常支持Superchain，并完全致力于以太坊的扩展，确保Kraken为Celo用户提供服务，”Koller说。“我们已要求相关团队进行探索，以便在1月16日前完成所有准备工作。”</p><p>OP Labs的Superchain倡导者、前Coinbase产品经理Binji Pande也对此发表意见，表示：“好的，让我们改变这一点。”这是对Olszewski帖子的一种回应。</p><p>根据《The Block》的CELO价格页面，Celo的代币在过去24小时内下跌近5%，目前交易价格为0.81美元。</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-s-decision-not-to-support-celo-layer-2-upgrade-causes-stir-among-stakeholders?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ivyi86t6.jpeg',
      source_url:
        'https://www.theblock.co/post/328660/coinbase-celo-layer-2-migration',
      timestamp: 1732878024000,
      tags: [
        {
          name: 'Celo',
        },
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title:
        '特朗普的胜利推动了比特币衍生品的繁荣，期货未平仓量飙升超过 600 亿美元',
      content:
        '<p>据 <strong>The Block</strong> 报道，<strong>比特币</strong> 期货的未平仓合约自唐纳德·特朗普当选以来激增。</p><p><strong>Bitfinex</strong> 的分析师认为这是一种“自然增长”，尽管杠杆增加，他们仍然不担心市场出现修正。</p><p>自唐纳德·特朗普于 11 月 5 日赢得美国总统选举以来，比特币期货的未平仓合约大幅上升，显示出交易活动和市场投机的增加。尽管出现了这种激增，Bitfinex 的分析师坚持认为杠杆交易并没有面临即将发生的市场修正风险。</p><p>根据 <strong>Coinglass</strong> 的数据，比特币期货的未平仓合约从 11 月 5 日的 390 亿美元飙升至目前的 609 亿美元。这代表着与比特币衍生品合约相关的头寸价值的显著增加，其中许多合约涉及杠杆。</p><p>Bitfinex 分析师向 <strong>The Block</strong> 解释说，未平仓合约的增加看起来是自然的，主要是由于对未来价格上涨的预期。“杠杆增加是交易者，包括机构，常用的工具，用于预期价格变动进行布局，”他们说。</p><p>他们还指出，截至 11 月 22 日，未平仓合约略有减少，特别是在 94,000 美元的水平，那里有大量的挂单被填满。“我们并不认为最近的杠杆增加有什么异常。价格重新测试 93,000 美元区域是一次正常的回调，”分析师补充道。</p><p><strong>Bitget</strong> CEO <strong>Gracy Chen</strong> 认为，特朗普的当选胜利成为市场杠杆增加的催化剂。“市场中的高杠杆证明投资者开始根据技术和监管改善来评估市场，而未平仓合约的激增是一个好现象，这表明在特朗普的环境下，比特币能够蓬勃发展，”Chen 告诉 <strong>The Block</strong>。然而，Chen 也指出，由于比特币固有的波动性，价格修正（可能以长头寸挤压的形式出现）是可能的，这在杠杆过度时有助于稳定市场。</p><h3>以太坊在过去一周表现优于比特币</h3><p>在最新的 PCE 价格指数发布后，比特币重新突破 95,000 美元的水平，而以太坊则表现突出。以太坊在 11 月 27 日上涨超过 5%，达到了 3,600 美元的高点，分析师指出资本正在从比特币转向以太坊。</p><p>“比特币的市场占有率已从 61.5% 的高点下降，而 ETH/BTC 交易对保持强劲，目前为 0.03760，比上周上涨了 17.8%，”<strong>QCP Capital</strong> 的分析师指出。他们认为以太坊正在测试 0.0400 的水平，这表明相对于比特币的持续强势。</p><p>以太坊交易所交易基金（ETFs）也经历了强劲的资金流入，周三增加了 9010 万美元，标志着连续四天的上涨。“以太坊近期的强势支持了重新测试其历史最高点 4,868 美元的案例，这相较于当前水平有潜在的 35.4% 的上涨空间，”QCP Capital 的分析师补充道。</p><p>根据 <strong>TokenInsight</strong> 的数据，全球加密货币市场总市值在过去 24 小时内上涨了 2.1%，达到了 3.4 万亿美元。比特币仍然主导市场，占比 54.7%，而以太坊则占 12.4%。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-win-fuels-bitcoin-derivatives-boom-as-futures-open-interest-surges-over-60-billion?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9s8fyt8gybfv.jpeg',
      source_url:
        'https://www.theblock.co/post/328651/trump-win-fuels-bitcoin-derivatives-boom-as-futures-open-interest-surges-over-60-billion',
      timestamp: 1732877351000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '摄氏度将向债权人分发1.27亿美元，作为第二次破产支付',
      content:
        '<p>据 The Block 报道，<strong>Celsius</strong> 在破产程序中向符合条件的债权人分配 1.27 亿美元，这是其第二次支付。</p><p>根据周三提交的法院文件，Celsius 将以现金或加密货币的形式分发大约 60.4% 的债权人申请日期的索赔价值。文件指出：“由于第二次分配，每位符合条件的债权人将收到的现金或流动加密货币总分配金额约为其索赔价值的 60.4%。” 用于支付的比特币价值设定为加权平均分配价格 95,836.23 美元。</p><p>文件补充称，无法通过指定分配代理接收流动加密货币的符合条件债权人将被引导以现金形式领取支付。</p><p>今年 1 月，Celsius 的破产计划管理员启动了首次支付，向 171,672 名债权人分发价值 20 亿美元的加密货币，恢复率为 57.65%。</p><p>Celsius 于 2022 年申请破产，因其资产负债表中发现了 12 亿美元的缺口。该公司于 11 月从破产中恢复。</p><p>去年，Celsius 及其前首席执行官 <strong>Alex Mashinsky</strong> 被证券交易委员会、联邦贸易委员会和商品期货交易委员会起诉，指控其误导客户。Mashinsky 还被控以欺诈罪，面临最高 115 年的监禁。</p><p>本月早些时候，一名美国地方法官驳回了 Mashinsky 请求撤销两项欺诈指控的请求。</p>',
      url: 'https://tokeninsight.com/zh/news/celsius-to-distribute-127-million-to-creditors-in-second-bankruptcy-payout?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/hskdafg_7.jpeg',
      source_url:
        'https://www.theblock.co/post/328645/celsius-to-distribute-127-million-to-creditors-in-second-bankruptcy-payout',
      timestamp: 1732791591000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Hyperliquid 计划在 11 月 29 日的“创世纪事件”中推出 HYPE 代币',
      content:
        '<p>据 The Block 报道，<strong>Hyperliquid</strong> 计划在 11 月 29 日 UTC 时间 07:30 举行的创世活动中推出其原生代币 <strong>HYPE</strong>。</p><p>Hyperliquid 是一个去中心化的永续交易平台和 Layer 1 链，<strong>HYPE</strong> 的推出标志着项目旅程中的一个重要里程碑，解锁了每个层级的核心功能，Hyper Foundation 表示。</p><p>在 11 月 29 日的上线后，HYPE 将作为质押和保护 <strong>HyperBFT</strong> 共识机制的主要资产，帮助项目实现去中心化。因此，该代币将是平台原生永续和现货去中心化交易所的重要组成部分，用户可以在原生现货订单簿上以 USDC 交易 HYPE。此外，HYPE 还将作为网络执行环境 <strong>HyperEVM</strong> 的原生燃料代币。</p><p>创世活动还将伴随面向持有平台奖励积分用户的社区空投。这对于该项目而言是一个重要的里程碑，过去一年中，Hyperliquid 已成为最大的去中心化交易平台之一，但直到现在仍未推出原生代币。</p><p>Hyperliquid 作为一个应用链，利用 <strong>HyperBFT</strong>，一种优化的权益证明共识算法，能够实现高吞吐量和近乎即时的最终确认时间。</p><h3>HYPE 代币分配</h3><p>Hyperliquid 表示，不会为私人投资者分配代币。其原生代币 HYPE 的总供应量将限制在 10 亿个代币。创世活动中，将有 31.0%（即 3.1 亿个）代币分配给符合条件的用户作为空投，所有代币将在活动时完全解锁。</p><p>另有 38.8%（即 3.88 亿个）代币将用于未来的排放和社区奖励。此外，23.8% 的代币（约 2.38 亿个）将留给当前和未来的核心贡献者，这些代币将在创世活动后经历一年的锁定期。</p><p><strong>Hyper Foundation</strong> 将获得 6.0%（即 6000 万个代币）以支持其运营预算。该项目强调，其专注于构建一个完全社区拥有的网络，并确认“没有私人投资者、集中交易所或做市商的分配”。</p>',
      url: 'https://tokeninsight.com/zh/news/hyperliquid-plans-to-launch-hype-token-in-nov.-29-genesis-event?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdof76.jpeg',
      source_url:
        'https://www.theblock.co/post/328631/hyperliquid-plans-to-launch-hype-token-in-nov-29-genesis-event',
      timestamp: 1732791337000,
      tags: [
        {
          name: 'DEX',
        },
        {
          name: '平台币',
        },
      ],
    },
    {
      title:
        '长期比特币持有者在过去 30 天内卖出了超过 72.8 万比特币：CryptoQuant',
      content:
        '<p>据 The Block 报道，根据 <strong>CryptoQuant</strong> 的数据，长期比特币持有者在过去 30 天内出售了超过 728,000 BTC。这一出售量当前价值约为 670 亿美元。</p><p>该数据集显示，这次抛售标志着鲸鱼在 10 月份购买数十万比特币的趋势的逆转。CryptoQuant 在一则 X 帖子中表示：“这是自 4 月以来最高的抛售。” 此外，该抛售与 10 月份大量买家吸纳比特币的趋势形成鲜明对比，当时的正向流入接近 250,000 BTC。</p><p>此次大幅抛售发生在整个加密市场因当选总统唐纳德·特朗普的提名而出现反弹之际，特朗普在竞选期间对区块链行业表示支持。比特币特别受到推动，价格飙升，接近 100,000 美元的新历史高点。</p><p>根据 <strong>TradingView</strong> 的数据，比特币的市场主导地位（即其在总加密市场市值中的份额）目前约为 51%，低于最近超过 60% 的高点。</p>',
      url: 'https://tokeninsight.com/zh/news/long-term-bitcoin-holders-sold-over-728-000-btc-in-the-past-30-days-cryptoquant?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sa9d7f_9a.jpeg',
      source_url:
        'https://www.theblock.co/post/328418/long-term-bitcoin-holders-sold-over-728000-btc-in-the-past-30-days-cryptoquant',
      timestamp: 1732704769000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '报道：特朗普团队希望将加密监管转移到 CFTC，削弱 SEC 的作用',
      content:
        '<p>据 The Block 报道，<strong>商品期货交易委员会</strong>（CFTC）可能会获得监管某些数字资产的权限，包括被视为商品的加密货币交易所和现货市场，如比特币和以太坊。这一消息来源于 <strong>Fox Business</strong> 的报道，引用了知情人士。</p><p>根据报道，<strong>当选总统唐纳德·特朗普</strong> 和即将上任的政府可能会赋予 CFTC 监管某些数字资产的能力，从而削弱 <strong>证券交易委员会</strong>（SEC）在该行业的监管权力。</p><p>即将卸任的 SEC 主席 <strong>加里·根斯勒</strong>（Gary Gensler）支持 CFTC 获得监管比特币的权力，并指出比特币是商品。今年 3 月，CFTC 在对加密交易所 <strong>Kucoin</strong> 的一项投诉中将以太坊称为商品。</p><p>特朗普承诺将增强美国的加密行业，包括创建联邦比特币储备、在白宫设立首个专门负责加密的职位以及解雇对加密持严厉立场的加里·根斯勒。上周，根斯勒宣布他计划在 2025 年 1 月 20 日辞去 SEC 主席职务，这一天正是特朗普就任第 47 任美国总统的日期。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-team-looking-to-shift-crypto-regulation-to-cftc-dilute-sec-s-role-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/as9d7f69.jpeg',
      source_url:
        'https://www.theblock.co/post/328412/trump-team-looking-to-shift-crypto-regulation-to-cftc-dilute-secs-role-report',
      timestamp: 1732704317000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '币安推出 BFUSD，承诺 APY “永远不会低于零”',
      content:
        '<p>据 The Block 报道，<strong>Binance</strong> 即将推出 <strong>BFUSD</strong>，这是一种“带奖励的保证金资产”，旨在提供被动收益。</p><p>该加密交易所承诺，BFUSD 的年收益率（APY）“不会低于零”，以保护持有者免受负收益的影响。</p><p>Binance 于周二正式推出 BFUSD，这种“带奖励的保证金资产”使用户能够通过持有或交易期货获得被动收益，该产品计划于周三（亚洲时间）上线。</p><p>Binance 的发言人对 The Block 表示：“BFUSD 是为期货交易设计的保证金资产，同时提供被动收益。”他补充道：“BFUSD 持有者将享有每日累积的基本 APY，即使他们不交易期货，符合条件的 USDⓈ-Margin 期货交易用户在那一天将享有更高的提升 APY。”</p><p>USDⓈ-Margin 期货是在 Binance 上使用稳定币（如 USDC 或 USDT）作为抵押和结算货币的期货合约，通过减少使用加密货币作为抵押品所带来的波动性，提供稳定的交易体验。</p><p>发言人声称，根据最近的历史数据，BFUSD 的基本 APY 在 11 月 20 日至 11 月 25 日期间在 12% 至超过 35% 之间波动。此外，提升 APY 在此期间约为 15% 至超过 47%。然而，值得注意的是，BFUSD 将于 11 月 27 日 UTC 时间 02:00 正式上线，届时合格用户可以开始购买，以上数据尚未经过独立验证。</p><p>发言人表示，只有在支持市场的合格 Binance 期货用户才能购买 BFUSD，并指出期货平台在某些地区（包括美国）受到限制。</p><h3>BFUSD 并非稳定币</h3><p>发言人指出，BFUSD “并非稳定币”，因为它不能从 Binance 期货账户中提取或在公开市场上交易。“它只能用作 Binance 上期货交易的保证金，并可以与 Binance 兑换为 USDT 稳定币，”他们说。</p><p>BFUSD 通过两种策略产生回报：在现货和期货市场之间进行 delta 对冲以收取资金费用，以及质押以太坊。Delta 对冲涉及用相反的期货头寸抵消现货头寸的价格风险。在加密市场中，当资金利率为正时，长期持有者向短期头寸支付的资金费用（反之亦然），确保现货和期货价格最终收敛。</p><p>BFUSD 的结构可能与 <strong>Ethena</strong> 的“合成美元” USDe 相似，后者也使用 delta 对冲提供奖励。然而，Binance 的发言人表示，BFUSD 与 USDe 不同，但他们未进一步详细说明。</p><p>一位了解 BFUSD 和 USDe 工作原理的人告诉 The Block：“USDe 本身不产生奖励，用户可以自行选择如何使用 USDe，”而“BFUSD 是一种带有被动奖励的保证金资产。”</p>',
      url: 'https://tokeninsight.com/zh/news/binance-launching-bfusd-promising-apy-will-never-go-below-zero?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/adfs9d7_6.jpeg',
      source_url:
        'https://www.theblock.co/post/328216/binance-bfusd-launch-apy',
      timestamp: 1732618740000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '赵长鹏主张使用“真正的”区块链应用，而不是 memecoin',
      content:
        '<p>据 Cointelegraph 报道，<strong>赵长鹏</strong>（Changpeng Zhao）呼吁加密界优先关注真实的区块链解决方案，而非 memecoins，强调市场动态的变化。</p><p>前 <strong>Binance</strong> 首席执行官赵长鹏敦促加密社区将重点从 memecoins 转向构建“真实”的区块链应用。</p><p>在 11 月 26 日，CZ 表达了他对 memecoin 生态系统日益增长的不满。在一则 X 帖子中，赵表示，memecoins 变得“有点奇怪”，而不是在早期阶段那样有趣。</p><p>CZ 于 2023 年 11 月辞去 Binance 的 CEO 职位，这是他与检方达成的认罪协议的一部分，该协议要求他支付 5000 万美元罚款，并禁止他“现在或将来参与运营或管理” Binance。自那时以来，这位企业家将重心转向支持 Web3 的基层发展和教育。</p><p>尽管 <strong>Binance</strong> 的加密衍生品交易所 <strong>Binance Futures</strong> 仍继续列出满足公众需求的 memecoin 交易对，但在 11 月 25 日上市的两种新 memecoins <strong>Why (WHY)</strong> 和 <strong>Cheems (CHEEMS)</strong> 在上市一天内价格暴跌。</p><p>自 2021 年以来，包括 <strong>Dogecoin</strong> 和 <strong>Shiba Inu</strong> 在内的几种 memecoins 由于获得了 <strong>埃隆·马斯克</strong> 和更广泛加密社区的支持，保持了热度。</p><h3>期待超越炒作</h3><p>然而，随着市场兴趣转向比特币和其他提供价值的项目，memecoins 由于纯粹基于炒作的项目而失去光彩。</p><p>尽管 CZ 的大多数追随者支持他重新聚焦于构建真实的去中心化应用（DApps），而不是试图从炒作中获利，但也有人指责他之前的加密交易所 Binance 列出了没有明显实用性的 memecoins。</p><p>经验丰富的投资者将 Binance 部分归责于允许不稳定投资的曝光。</p><h3>社区关注的 memecoin 项目</h3><p>另一方面，memecoins 的市场表现达到了历史新高。根据 Cointelegraph Markets Pro 和 CoinMarketCap 的数据，memecoin 生态系统的总市值约为 1100 亿美元，占 3.44% 的 3.19 万亿美元的加密市场。</p><p>11 月 25 日，<strong>Pump.fun</strong> —— 一个创建基于 Solana 的 memecoins 的去中心化平台 —— 在其一名用户在直播中威胁自杀后遭到严重批评。</p><p>尽管 Pump.fun 承认社区的担忧，但他们为平台的管理努力辩护。</p><p>然而，Pump.fun 最终还是取消了其平台的直播功能。</p>',
      url: 'https://tokeninsight.com/zh/news/changpeng-zhao-advocates-for-real-blockchain-apps-over-memecoins?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/oasudgf79asd67.jpeg',
      source_url:
        'https://cointelegraph.com/news/changpeng-zhao-criticizes-memecoins-calls-for-real-blockchain-apps',
      timestamp: 1732618019000,
      tags: [
        {
          name: '赵长鹏',
        },
      ],
    },
    {
      title:
        '随着特朗普发出支持加密货币议程的信号，美国证券交易委员会主席加里·詹斯勒将辞职',
      content:
        '<p>据 The Block 报道，<strong>加里·根斯勒</strong>（Gary Gensler）计划于 2025 年 1 月 20 日离职，相关声明于周四由美国证券交易委员会（SEC）发布。</p><p>在担任 SEC 主席期间，根斯勒推动了国债市场的中央清算，实施了高管薪酬与业绩的变化，并继续致力于保护加密市场投资者的工作。</p><p>根斯勒在声明中表示，能与 SEC 的同事们共事是“一生的荣耀”。他说：“感谢拜登总统将这一重大责任委托给我。SEC 以无畏无私的态度履行了我们的使命并执行了法律。我非常享受与我的同事们，艾莉森·赫伦·李（Allison Herren Lee）、埃拉德·罗伊斯曼（Elad Roisman）、赫斯特·皮尔斯（Hester Peirce）、卡罗琳·克伦肖（Caroline Crenshaw）、马克·乌耶达（Mark Uyeda）和哈梅·利萨拉加（Jaime Lizárraga）一起工作的时光。我还要感谢国会、我在美国政府的同事们，以及全球的监管同行。”</p><p>自 2021 年 4 月起担任 SEC 主席的根斯勒，推动了国债市场的中央清算，实施了高管薪酬与业绩挂钩的变化，并继续致力于保护加密市场投资者。</p><p>在针对包括 <strong>Coinbase</strong>、<strong>Binance</strong> 和 <strong>Kraken</strong> 等大型行业参与者的执法行动后，根斯勒成为一些加密行业人士的公敌。</p><p>SEC 周四表示：“根据 SEC 监察长办公室的数据，在过去一个完整的财政年度，18% 的 SEC 提示、投诉和转介与加密相关，尽管加密市场占美国资本市场的比例不足 1%。” SEC 表示：“法庭一而再、再而三地支持委员会保护投资者的行动，驳回了所有关于 SEC 在证券被提供时无法执行法律的论点——无论其形式如何。”</p><p>根斯勒一直认为，大多数加密货币符合证券的定义，并敦促加密公司向 SEC 注册。然而，加密行业的一些人士反击称，向 SEC 注册几乎不可能，部分原因是相关规则是为更传统的实体制定的，与数字资产行业不同。</p><p>根斯勒的离职公告是在当选总统唐纳德·特朗普承诺如果当选将解雇他后发布的。特朗普的总统任期将于 1 月 20 日开始。</p>',
      url: 'https://tokeninsight.com/zh/news/sec-chair-gary-gensler-to-step-down-as-trump-signals-pro-crypto-agenda?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dsa9f759_asf.jpeg',
      source_url:
        'https://www.theblock.co/post/327680/sec-chair-gary-gensler-to-step-down-as-trump-signals-pro-crypto-agenda',
      timestamp: 1732273438000,
      tags: [
        {
          name: '美国证监会',
        },
      ],
    },
    {
      title: '加密市场制造商 B2C2 利用 PV01 在以太坊上发行其首只公司债券',
      content:
        '<p>据 The Block 报道，<strong>B2C2</strong>，一家机构加密流动性提供商，已发行其首个链上公司债券。该债券的发行与链上债务资本市场公司 <strong>PV01</strong> 合作，后者由 B2C2 的创始人创立。</p><p>该债券在 <strong>Ethereum</strong> 区块链上进行代币化，以 <strong>USDC</strong> 稳定币计价。其整个生命周期，包括发行、赎回和二次转让，将完全在链上进行。</p><p>这家公司称这一情况为“世界首创”，因为该资产是“根据英国法律记录的”。</p><p><strong>PV01</strong> 的创始人 <strong>Max Boonen</strong> 在声明中表示：“加密公司债券是我们策略在美国国债支持债券之后的自然下一步。加密发行者将证明债务可以在区块链上发行、交易和赎回，而不需要那么多中介。这将为传统公司在链上发行债务铺平道路。”</p><p>此次交易建立在 PV01 之前与 B2C2、BlockTower Capital 和 Keyrock 合作完成的 500 万美元国债代币化概念验证基础上，时间为 2024 年 4 月。目前尚不清楚这次发行了多少债务。</p><p>与像黑石集团（BlackRock）推出的 BUIDL 等代币化国债产品不同，PV01 的产品是债券而非基金。该公司使用特殊目的工具购买美国国债，并发行代表该债券的代币。这个代币既是债券的代表，也是债券本身。</p><p>PV01 的一位代表在给 The Block 的电子邮件中表示：“这一里程碑交易是未来更多交易的开端，使数字资产公司更容易发行债务，并向将债务资本市场引入链上更进一步。”</p><p><strong>B2C2</strong> 由 Max Boonen 和 Flavio Molendin 于 2015 年创立，2020 年被日本的 SBI 收购。Boonen 和 Molendin 三年后推出了位于百慕大的经纪交易商 <strong>PV01</strong>，专注于数字债券的结构设计、簿记和销售流程。</p><p>该初创公司面向合格的非美国投资者，从 Tioga Capital、BlockTower 和 Ryze Labs 筹集了 900 万美元的种子资金。</p><p>支持者认为，代币化债券可以降低发行成本、降低交易费用，并使整个过程更快、更透明。<strong>21.co</strong> 表示，现实资产行业到本世纪末可能增长至 10 万亿美元。</p><p>许多金融机构已开始利用区块链测试债券发行。2023 年，<strong>Société Generale</strong> 在以太坊上首次发行以欧元计价的绿色债券，而德国工业巨头 <strong>西门子</strong> 在 9 月份在私有区块链上发行了 3 亿欧元的数字债券，作为欧洲中央银行 CBDC 试点的一部分。</p><p>PV01 的代表表示：“传统金融债务资本市场模型早该升级，发行过程繁琐，仅限于特定的特权客户，清算和结算过程冗长且成本高昂。”</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-market-maker-b2c2-taps-pv01-to-issue-its-first-corporate-bond-on-ethereum?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s9da7f69h.jpeg',
      source_url:
        'https://www.theblock.co/post/327769/crypto-market-maker-b2c2-taps-pv01-to-issue-its-first-corporate-bond-on-ethereum',
      timestamp: 1732273154000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '随着大选后的势头继续，比特币首次突破9.5万美元',
      content:
        '<p>据 The Block 报道，比特币的价格在周三晚上首次突破 95,000 美元，在 Coinbase 上创下新历史高点。</p><p>目前，这种全球最大的加密货币在 2024 年上涨了 110%。</p><p>比特币的价格在周三晚上首次在 Coinbase 上达到 95,000 美元，标志着全球最大加密货币的新历史高点。在过去一个月中，比特币上涨了 40%，2024 年上涨幅度超过 105%。</p><p>“随着比特币 ETF 期权的获批，我们不仅看到加密 ETF 市场的成熟——我们也看到比特币巩固了其作为主流机构投资的地位，与股票、债券和商品并肩而立，”<strong>Anchorage Digital</strong> 的首席执行官兼联合创始人 <strong>Nathan McCauley</strong>在一份声明中表示。</p><p>现货比特币 ETF 产品的期权本周正式上线，黑石集团的 <strong>iShares Bitcoin Trust</strong>（代码 IBIT）在周二率先启动，随后 <strong>Bitwise</strong> 和 <strong>GrayScale</strong> 的 ETF 于周三加入。</p><p>“$IBIT 第一天的期权总交易量接近 19 亿美元，交易了 354,000 份合约，其中 289,000 份为看涨期权，65,000 份为看跌期权，”<strong>Bloomberg Intelligence</strong> 的 ETF 分析师 <strong>James Seyffart</strong> 周二表示。“这意味着看涨与看跌的比例为 4.4:1。这些期权几乎肯定是推动比特币今天创下新高的重要因素。”</p><p>市场近期的动能始于 11 月 5 日，当时支持加密货币的唐纳德·特朗普在美国总统选举中击败副总统贾马拉·哈里斯。报道称，特朗普当选总统的团队正在考虑设立一个专注于加密政策的职位，这将是白宫的首次尝试。</p><p>行业专家对比特币何时突破 100,000 美元的看法不尽相同，但普遍共识是这一里程碑将在未来两个月内实现——如果不是更快的话。</p><p>“我们没有看到财富管理者的强烈 FOMO（害怕错过），而零售投资者刚刚开始关注。所以，这一趋势仍然年轻。我们相信，一旦突破 100,000 美元，真正的 FOMO 将会到来，”<strong>Tides.Network</strong> 的首席执行官 <strong>Chandra Duggirala</strong> 本月早些时候对 The Block 说道。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-breaks-above-95-000-for-the-first-time-as-post-election-momentum-continues?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/d9as7f57.jpeg',
      source_url:
        'https://www.theblock.co/post/327450/bitcoin-breaks-above-95000-for-the-first-time-as-post-election-momentum-continues',
      timestamp: 1732186788000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title:
        '加密赌场 Monkey Tilt 获得由 Pantera Capital 领投的 3000 万美元 A 轮融资',
      content:
        '<p>据 The Block 报道，加密赌场 <strong>Monkey Tilt</strong> 在由 <strong>Pantera Capital</strong> 领导的 A 轮融资中筹集了 3000 万美元。</p><p>此次融资使 Monkey Tilt 的总筹资金额超过 5000 万美元。</p><p>Monkey Tilt 是一个于 3 月上线的加密赌场游戏平台，此次融资由知名加密风险投资公司 Pantera Capital 牵头。<strong>Polychain Capital</strong>、<strong>PokerGo</strong>、<strong>Hack VC</strong>、<strong>Dream Ventures</strong>、<strong>Accomplice</strong>、<strong>Mirana</strong> 及 <strong>Josh Hannah</strong>（Flutter.com 的联合创始人，后与 Betfair 合并）也参与了此次融资。根据声明，公司的估值未披露。</p><p>Monkey Tilt 将自己描述为“一个以娱乐为首的公司，结合了传统赌场体验与增强的社交和生活方式整合。”该平台提供允许使用多种加密货币进行投注的支付基础设施，包括比特币、以太坊、索拉纳、狗狗币和稳定币。</p><p>“现实是，这个行业未能跟上人们想要游戏、连接和互动的方式，”Monkey Tilt 创始人兼首席执行官 <strong>Sam Kiki</strong>说。“我们正在创造的是沉浸式、引人入胜且具有文化相关性的体验——每个人都意识到了这一点。”</p><p>除了现有的赌场游戏和 24/7 的体育博彩，Monkey Tilt 还计划在 2025 年第一季度推出新的加密游戏化产品。该功能将允许用户通过正确预测选定玩家是否超越或未达到其统计预测来获利。</p><p>“Monkey Tilt 正在将在线游戏世界推向一个新的时代，远远领先于市场其他竞争者，”Pantera Capital 合伙人 <strong>Ryan Barney</strong> 说。“Sam 已经证明自己是这个领域的权威领导者，我们非常自豪能够支持一个真正塑造娱乐未来的平台。”</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-casino-monkey-tilt-raises-30-million-series-a-led-by-pantera-capital?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdf976.jpeg',
      source_url:
        'https://www.theblock.co/post/327569/crypto-casino-monkey-tilt-30-million-usd-series-a-pantera-capital',
      timestamp: 1732186484000,
      tags: [
        {
          name: '融资',
        },
      ],
    },
    {
      title: '随着加密资产的崛起，币安稳居市场领先地位',
      content:
        '<p>近期的市场动态，包括美国总统大选、比特币创下历史新高（ATH）以及整体金融行业的积极信号，共同推动了市场活动的激增，营造了一个异常活跃的加密货币市场环境。需求的增长不仅吸引了更多用户的参与，还进一步凸显了加密资产在主流金融体系中的重要地位。</p><h2><strong>加密货币在金融市场中的地位日益突出</strong></h2><p>通过比较主要加密货币平台与传统股票市场的交易量，呈现出令人瞩目的趋势。在过去的 30 个交易日（2024 年 10 月 7 日至 11 月 15 日）中，币安的总交易量（现货+衍生品）显著超越了全球主要股票市场的数据：</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/Picture14.png"></figure><p>来源：币安与 Coinbase 交易量（包括现货 + 衍生品）；CoinMarketCap、币安、Coinbase；纳斯达克 / 纽约证券交易所数据来源：<a rel="noopener noreferrer nofollow" target="_blank" href="https://www.nasdaqtrader.com/trader.aspx?id=FullVolumeSummary#">https://www.nasdaqtrader.com/trader.aspx?id=FullVolumeSummary#</a></p><ul><li>币安的交易量比纳斯达克高出 10%；</li><li>是纽约证券交易所（NYSE）的两倍；</li><li>是 Coinbase 的 16 倍；</li><li>并占全球中心化交易所（CEX）交易量的约 50%。</li></ul><p>这些数据充分表明，加密资产正越来越受到投资者的青睐，逐步从边缘走向主流金融的核心。与传统金融市场相比，加密货币正在逐渐平起平坐，这一趋势也反映了加密资产在全球金融格局中影响力的持续增强。</p><h2><strong>现货交易占据市场主导地位</strong></h2><p><br>2024 年比特币市场的一个显著特点是，现货交易在各类交易活动中占据了主导地位。尽管机构投资者对比特币 ETF 表现出极大兴趣，但其市场份额仍然相对较小。数据显示，币安的比特币交易量是所有比特币 ETF 总交易量的 4.5 倍，突显了现货交易的压倒性优势。无论是散户还是高频交易者，他们仍然更倾向于选择流动性和可及性无与伦比的现货市场。</p><p>从年初至今的现货比特币交易量来看，现货交易依然稳居比特币市场的核心地位。币安等主要交易所创造了历史最高的交易量，进一步巩固了其市场领导地位。这表明，对于散户和机构投资者而言，比特币市场的活跃度和活力远超预期，而现货市场继续在交易活动和流动性中占据主导地位。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/Picture2.png"></figure><p>数据来源：币安与 Coinbase&nbsp;交易量（包括现货+衍生品）；CoinMarketCap、币安、Coinbase；纳斯达克 /&nbsp;纽约证券交易所数据来源：<br><a rel="noopener noreferrer nofollow" target="_blank" href="https://www.nasdaqtrader.com/trader.aspx?id=FullVolumeSummary">https://www.nasdaqtrader.com/trader.aspx?id=FullVolumeSummary#</a></p><p>币安作为比特币交易的绝对领导者，其交易量是 Coinbase 的 7 倍，甚至相当于包括其他中心化交易所和 DEX 聚合器在内的后 14 大竞争对手的总和。</p><p>这一趋势还显示出交易量正向少数关键平台集中，币安以显著优势领跑。顶级加密货币交易所通过集中的流动性、强大的基础设施以及具有竞争力的定价，吸引并留住了绝大多数交易活动。</p><p>尽管比特币 ETF 被视为机构资金进入加密市场的重要渠道，但其在整体市场中的贡献仍然有限。这也表明现货交易市场的深度和活力可能被低估了。现货市场的持续主导地位进一步强调了其作为比特币流动性和价格发现基础的核心地位。虽然未来 ETF 市场可能随着机构参与度的提高而增长，但目前市场的焦点仍然集中在蓬勃发展的现货市场。</p><h2><strong>USDT&nbsp;流入反映市场健康</strong></h2><p>另一个显示牛市强劲信号的趋势是 USDT 流入中心化交易所的情况。在美国总统大选周期间，USDT 流入主要交易所的总量超过了 200 亿美元，其中币安以 77 亿美元的流入量领先，其次是 Coinbase 的 43 亿美元，以及其他交易所的 65 亿美元。</p><p>Tether（USDT）的市值本周达到 1280 亿美元，创下历史新高。这表明市场流动性和稳定性均保持在较高水平，反映了机构和散户投资者对加密资产需求的持续增长。</p><p>从 11 月 1 日至 19 日的 USDT 流入数据来看，币安的市场份额为 39%，Coinbase 为 23%，其他交易所合计为 38%。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/Picture3.png"></figure><p>数据来源：CryptoQuant，数据时间范围：2024&nbsp;年 11&nbsp;月 1&nbsp;日至 11&nbsp;月 19&nbsp;日<br><a rel="noopener noreferrer nofollow" target="_blank" href="https://cryptoquant.com/community/dashboard/67323fb78a32550757517a22">https://cryptoquant.com/community/dashboard/67323fb78a32550757517a22</a></p><p>随着越来越多的传统投资者和机构进入加密市场，加密资产正在逐步融入全球金融体系。市场活动的增加不仅提升了流动性，还创造了良性循环，进一步推动了加密市场的扩张。</p><p>与此同时，市场向领先平台集中的趋势愈发明显。币安等主要交易所作为行业领导者，在推动加密资产主流化和增强市场稳定性方面发挥了重要作用。</p>',
      url: 'https://tokeninsight.com/zh/news/as-crypto-assets-gain-ground-binance-maintains-market-leadership?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/bn.png',
      source_url: '',
      timestamp: 1732178793000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title:
        '伯恩斯坦将罗宾汉列为顶级“加密货币放松管制交易”，并将目标价上调至51美元',
      content:
        '<p>据 The Block 报道，<strong>Bernstein</strong> 的分析师在唐纳德·特朗普赢得美国总统选举后，将 <strong>Robinhood</strong> 评选为最佳“加密去监管交易”。分析师将 HOOD 股票评级为“跑赢大盘”，并将目标价格上调至 51 美元。</p><p>Bernstein 的研究和经纪公司分析师指出，Robinhood 是本轮周期中的顶尖加密去监管交易，尤其是在特朗普及共和党在本月美国选举中获胜之后。特朗普和共和党在竞选期间提出了多项支持加密货币的政策，包括建立国家比特币储备，并承诺“结束对加密货币监管的战争”，这些政策预计在特朗普就职后将惠及该行业。</p><p>分析师预计 HOOD 在关键业绩指标上的表现将继续超出预期，将其 2025 财年的收入预估从 38.5 亿美元上调至 41.9 亿美元，主要得益于市场份额的增长。他们预计该年将实现 13 亿美元的盈利，HOOD 的估值为 10.8 倍的收入和 33 倍的盈利。此次他们将目标价格上调至 51 美元，而之前的 30 美元目标在选举结果公布后已被触及。</p><p>根据 TradingView 的数据，Robinhood 的股票年初至今已经上涨了 176%。该股票周二收盘上涨 0.7%，报 35.24 美元，分析师认为新的目标价格意味着潜在的 45% 上行空间。HOOD 当前在盘前交易中上涨 2.2%，报 36 美元。</p><p>Bernstein 的分析师 Gautam Chhugani 在周二给客户的报告中指出：“Robinhood 迄今为止一直在监管限制下运营加密业务，仅列出了 15 个代币（而 Coinbase 上有超过 250 个），没有从质押、借贷、衍生品或稳定币中获得收入，这些都是竞争交易所提供的。”他还表示：“但在一个可能的新支持加密货币的证券交易委员会（SEC）下，这种情况有望改变，我们预计 HOOD 将是加密监管利好中的最大受益者。”</p><p>分析师预测，到 2025 年底，Robinhood 的加密收入将增加 20%，占总收入的 38%，这得益于新代币上市和加密产品线的市场份额增长。</p><h3>新代币上市和非交易加密收入</h3><p>分析师指出，鉴于现任美国证券交易委员会主席加里·根斯勒（Gary Gensler）对代币的鹰派立场，Robinhood 在代币上市方面一直持谨慎态度，根斯勒将大多数代币归类为证券。然而，特朗普的另一项竞选承诺是“第一天就解雇根斯勒”，在他即将上任的政府下，Bernstein 预计将会对数字资产分类进行明确的规则制定，这将允许 Robinhood 参与数字商品和数字证券的交易。</p><p>在特朗普当选后，Robinhood 已新增上市了四个代币：SOL、ADA、XRP 和 PEPE，但仍然落后于主要竞争对手，分析师预计其加密部门将在 2025 年开始缩小这一差距。</p><p>由于监管限制，该金融科技公司也未能提供其加密交易所竞争对手提供的附加服务，例如质押、稳定币接入和借贷。然而，分析师预计 Robinhood 在未来 12 个月内将在美国推出新的产品线。通过计划以 2 亿美元收购加密交易所 Bitstamp，Robinhood 进一步扩展至欧洲的举措也可能成为另一个催化剂。</p><p>Gautam Chhugani 持有多种加密货币的多头头寸。Bernstein 的某些关联公司在 Robinhood 的股票证券中充当市场做市商或流动性提供者。</p>',
      url: 'https://tokeninsight.com/zh/news/bernstein-names-robinhood-as-top-crypto-deregulation-trade-raises-price-target-to-51?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdf975.jpeg',
      source_url:
        'https://www.theblock.co/post/327386/robinhood-crypto-deregulation-trade-trump-bernstein',
      timestamp: 1732100515000,
      tags: [
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '报告：韩国将在 2025 年征收 20% 的加密税，并提高免税限额',
      content:
        '<p>据 The Block 报道，韩国执政的民主党计划从 2025 年初开始实施加密货币税收。</p><p>然而，该党希望将税收免征限额从约 1,795 美元提高到 35,919 美元。</p><p>根据《首尔新闻》的报道，韩国执政党打算继续推进自 2025 年 1 月起对加密货币收益征税的计划，而不是批准进一步延迟。</p><p>最初，针对加密货币收益的 20% 税率（加上地方税则为 22%）原定于 2022 年 1 月 1 日生效，但由于投资者和行业专家的强烈反对，该计划已推迟两次，最终定于 2025 年 1 月 1 日实施。</p><p>虽然曾有讨论和提议进一步延迟的可能性，其中一个建议是在 2028 年开始，但根据当地媒体的报道，韩国民主党（DPK）决心按计划实施该税收计划。</p><p>不过，该党正在对计划进行修订，将加密货币收益的免税限额从 250 万韩元（约 1,795 美元）提高到 500 万韩元（约 35,919 美元）。</p><p>考虑到加密货币市场的波动性，修订后的计划 reportedly 允许纳税人在缺乏精确购买记录的情况下，使用销售价格的一定百分比作为原始购买价格的替代。</p><p>据报道，民主党指出，将免税限额提高到 500 万韩元实际上相当于废除税收计划，因为只有少数投资者会超过这一门槛。</p><p>DPK 计划在 11 月 25 日通过国会税务小组委员会的投票，并在 11 月 26 日的立法委员会全体会议上通过修订计划。</p>',
      url: 'https://tokeninsight.com/zh/news/south-korea-to-push-20-crypto-tax-in-2025-with-higher-exemption-limit-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/阿桑0d8.jpeg',
      source_url:
        'https://www.theblock.co/post/327366/south-korea-to-push-20-crypto-tax-in-2025',
      timestamp: 1732100152000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        'Michael Saylor 的MicroStrategy 以 46 亿美元的价格追加了 51780 个比特币',
      content:
        '<p>据 Coindesk 报道，<strong>MicroStrategy</strong>（MSTR）自称为比特币开发公司，近期再次增加了比特币持有量，在截至周日的六天内购买了 51,780 个比特币，花费约 46 亿美元。</p><p>随着这次最新购买，该公司自 2020 年 8 月开始购买比特币，目前持有 331,200 BTC，累计花费约 165 亿美元。按当前约 90,000 美元的价格计算，这些持有的比特币价值接近 300 亿美元。</p><p>为资助此次购买，MicroStrategy 利用了其市场发行股票的计划，出售了约 1360 万股股票，筹集了 46 亿美元。根据周一早上发布的监管声明，该公司在当前计划下还可以再出售约 153 亿美元的股票。</p><p>在周末，执行主席迈克尔·赛勒（Michael Saylor）在 X 平台上暗示了今天的购买披露。</p><p>就在一周前，该公司宣布已以 20 亿美元的价格购买了 27,200 个比特币，这使得过去几周的购买总量达到了约 72,000 BTC，花费 66 亿美元。</p><p>虽然 MSTR 股票在盘前交易中下跌了 1%，但年初至今仍上涨近 400%。</p>',
      url: 'https://tokeninsight.com/zh/news/michael-saylor-s-microstrategy-added-additional-51-780-bitcoin-for-4.6b?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/vskadfu68t.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/11/18/michael-saylors-microstrategy-added-additional-51780-bitcoin-for-46b/',
      timestamp: 1732013482000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '唐纳德·特朗普的媒体集团有意收购加密货币交易所 Bakkt',
      content:
        '<p>据 Coindesk 报道：<strong>特朗普媒体与科技集团</strong>（Trump Media and Technology Group，TMTG）正在与国际交易所（Intercontinental Exchange）旗下的加密交易平台 <strong>Bakkt</strong> 进行接近全股票交易的收购谈判，后者目前正面临困境。</p><p>特朗普的媒体公司正在扩大其在加密货币市场的布局。这笔交易将使 TMTG 吸收 Bakkt，后者周一市值刚刚超过 1.5 亿美元。尽管 TMTG 的收入微薄，但由于零售投资者对特朗普再选的兴趣，其股权估值达到了 60 亿美元。</p><p>Bakkt 由国际交易所设立，最初旨在帮助 Starbucks 客户使用比特币（BTC）购买咖啡。未来的美国参议员凯利·洛夫勒（Kelly Loeffler）曾担任首任首席执行官。Bakkt 于 2021 年推出了一款数字钱包，但去年已停止运营。现在，Bakkt 专注于加密资产的保管和交易服务。2 月份，Bakkt 表示没有现金来支持未来 12 个月的运营。</p><p>根据报道，Bakkt Holdings Inc（BKKT）的股票在周一上涨了 160%。</p><p>此次收购谈判与特朗普最近对 <strong>World Liberty Financial</strong>（与特朗普家族相关的去中心化金融平台）的推广相继而来。该交易可能会影响 Bakkt 的未来方向以及在特朗普扩展的媒体帝国中的潜在角色，包括其对比特币的关注。</p><p>需要注意的是，Bakkt 的加密资产保管业务（持有比特币和以太坊等数字资产）表现不佳，将被排除在收购之外。此举恰逢特朗普胜选后，加密市场出现激增，比特币在过去 30 天上涨超过 30%。</p><p>此外，《华尔街日报》报道，特朗普当选总统后计划与 Coinbase 首席执行官布赖恩·阿姆斯特朗（Brian Armstrong）会面。</p>',
      url: 'https://tokeninsight.com/zh/news/donald-trump-s-media-group-eyes-purchase-of-crypto-exchange-bakkt-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9af5feew.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/11/19/donald-trumps-media-group-eyes-purchase-of-crypto-exchange-bakkt-report/',
      timestamp: 1732013094000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: '疯狂警报：摩根大通比特币零售信心指数创历史新高，MSTR看涨偏度飙升',
      content:
        '<p>据 Coindesk 报道，一场投机狂潮似乎席卷了市场，这可能导致情绪的突然转变和双向价格波动。</p><p>摩根大通（JPMorgan）对比特币（BTC）及相关资产的零售情绪评分在上周创下新高。</p><p>MicroStrategy（MSTR）的期权市场表现出极端的上涨恐惧或看涨的投机狂热。</p><p>自唐纳德·特朗普于 11 月 5 日赢得美国总统选举以来，比特币及所有与加密货币相关的资产一直在大幅上涨。希望搭乘加密货币快车的人现在需要准备好应对潜在的波动，因为摩根大通和其他分析师跟踪的数据表明，市场正在变得狂热。</p><p>上周，比特币突破 93,000 美元大关，流入美国上市的现货 ETF 和加密股票激增，摩根大通的零售情绪评分上升至创纪录的 4。这一指标旨在衡量零售投资者对加密货币，尤其是比特币的情绪，基于比特币产品系列（包括现货 ETF）的活动。</p><p>“在 ETF 市场中，选举结果后，比特币 ETF 的需求特别强劲（IBIT +3.4z）。”</p><p>比特币的需求也反映在 COIN (+6z) 上。实际上，他们对比特币家族（包括物理 ETF 和其他产品）的情绪评分飙升至多西格玛高位，”摩根大通的股票研究团队在上周给客户的报告中提到，讨论了零售订单的不平衡情况。</p><p>z 分数达到 3.4 及以上表明与平均水平存在显著的正偏差，显示出强劲的需求。</p><p>与此同时，与持有比特币的 MicroStrategy（MSTR）相关的期权市场表现出创纪录的看涨情绪，也指向市场高峰时常见的疯狂交易。</p><p>周三，一年期 25-delta 看跌与看涨期权的偏斜度骤降至 -26.7%。这意味着，用于对冲或从价格上涨中获利的看涨期权的交易溢价明显高于提供下行保护的看跌期权，市场分析师 Markets&amp;Mayhem 在 X 上分享的 Market Chameleon 图表显示。</p><p>偏斜度在周五稍微回升至 -11.8%，但仍显示出强烈的上行押注偏好。比特币的看涨期权价格一直高于看跌期权，但与 MSTR 的差异显著缩小。</p><p>“在 MSTR 中，期权偏斜度极度乐观，难以想象如果比特币不继续以抛物线方式上涨，就不会出现更有意义的回调。目前看来，它似乎只是从高位稍微冷却了一点，”Markets&amp;Mayhem 说。</p><p>TheMarketEar 分析服务的作者将这种偏斜称为“超出极端的上行恐惧”。</p><p>因此，尽管比特币和其他与加密相关的资产可能是稳健的长期投资，但激增的零售投资者情绪可能是不可预测的，可能导致市场迅速且痛苦的反转。</p>',
      url: 'https://tokeninsight.com/zh/news/frenzy-alert-jpmorgan-s-bitcoin-retail-sentiment-score-hits-record-high-mstr-s-call-skew-soars?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic_副本.001.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/11/18/frenzy-alert-jpmorgans-bitcoin-retail-sentiment-score-hits-record-high-mstrs-call-skew-soars/',
      timestamp: 1731927927000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        '加密货币贷款机构 Polter Finance 在遭受 1200 万美元黑客攻击后停止运营',
      content:
        '<p>据 Cointelegraph 报道，Polter Finance 遭遇了 1200 万美元的闪电贷黑客攻击，目前正在调查与 Binance 钱包相关的被盗资金，并愿意与攻击者进行谈判。</p><p>Polter Finance 是一个去中心化的非托管借贷平台，在一次黑客攻击使其总锁定价值（TVL）损失 1200 万美元后，暂停了运营并向执法部门求助。</p><p>11 月 17 日，Polter Finance 在发现漏洞后暂停了平台，并在 X 上通知投资者。该协议调查了被盗资金，并追踪到加密交易所 Binance 上的钱包。</p><p>根据 Web3 安全公司 TenArmor 的说法，Polter Finance 协议因其新推出的 SpookySwap (BOO) 市场遭遇了与错误预言机价格相关的闪电贷攻击，损失了 1200 万美元。</p><p>Polter 目前尚未确认攻击的性质。与此同时，Polter Finance 通过链上消息联系了黑客，提供谈判和免罪的可能性。</p><p>截至撰写时，黑客尚未回应。Polter Finance 的化名创始人 Whichghost 同一天向新加坡当局报案，警方通过新加坡公民和居民的数字身份验证了 Whichghost 的身份。</p><p>根据警方报告，Polter Finance 损失了超过 1610 万新加坡元（约合 1200 万美元）的加密货币。其中，包括 Whichghost 个人损失的 223,219 美元。他表示：</p><p>“我想说明，我没有向任何人提供我的登录信息（私钥），我相信我平台新部署的智能合约（用于 BOO 代币借贷）已被利用，因此导致了未经授权的交易。”</p><p>导致 1200 万美元黑客攻击的 BOO 市场当时的估值仅为 3000 美元。</p><p>尽管公司进行了努力，但许多 X 平台上的社区成员表达了怀疑，一些人认为此事件可能涉及内部活动。批评者指出，报案可能是对内部审查的潜在分散。</p><p>Polter Finance 随后宣布与安全联盟信息共享与分析中心（SEAL-ISAC）建立合作关系，以帮助追踪攻击者。</p><p>Polter Finance 的总市场规模为 1200 万美元，包括 787 万美元的 Fantom、103 万美元的wrapped USD Coin、25.1 万美元的Magic Internet Money, MIM和 210 万美元的 Stader sFTMX 等。</p>',
      url: 'https://tokeninsight.com/zh/news/arijit-sarkar-arijit-sarkar-2-hours-ago-crypto-lender-polter-finance-halts-operations-after-12m-hack?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s9&D6f.jpeg',
      source_url:
        'https://cointelegraph.com/news/polter-finance-12m-hack-response',
      timestamp: 1731927219000,
      tags: [
        {
          name: '借贷',
        },
      ],
    },
    {
      title: '特朗普任命前美国证券交易委员会主席杰伊·克莱顿为曼哈顿联邦检察官',
      content:
        '<p>据 Cointelegraph 报道，前美国证券交易委员会（SEC）主席杰伊·克莱顿（Jay Clayton）被当选总统唐纳德·特朗普任命为新角色，特朗普将于 1 月 20 日宣誓就职。</p><p>美国当选总统特朗普宣布，他的前 SEC 主席杰伊·克莱顿将担任纽约南区的美国检察官。</p><p>特朗普在 11 月 14 日的社交媒体平台 Truth Social 上的公告中高度评价了克莱顿，称他是一位“备受尊敬的商业领袖、顾问和公共服务者”。</p><p>“杰伊将成为我们让美国再次伟大的强有力的真相斗士，”特朗普表示。</p><p>克莱顿于 2017 年 5 月 4 日至 2020 年 12 月 23 日担任 SEC 主席，期间正值特朗普的第一次总统任期。</p><p>特朗普将于 1 月 20 日宣誓就职，成为美国第 47 任总统。</p><p>作为纽约南区的检察官，克莱顿将接替达米安·威廉姆斯（Damian Williams），后者已对多名加密犯罪分子提起诉讼，指控他们犯有电信欺诈和洗钱罪。</p><p>威廉姆斯最显著的检控胜利之一是对前 FTX 首席执行官山姆·班克曼-弗里德（Sam Bankman-Fried）的定罪，此案是美国历史上最大的欺诈案之一。</p><p>威廉姆斯的努力促成了班克曼-弗里德被判处 25 年监禁。</p><p>克莱顿对加密行业的看法颇为复杂。</p><p>2021 年 12 月，克莱顿表示他是区块链技术的“坚定信仰者”，并指出：“代币化在金融系统及其他方面带来的效率效益是巨大的。”然而，由克莱顿领导的 SEC 在他于 2020 年 12 月辞职的最后一天提起了针对 Ripple Labs 的诉讼，开启了这场艰苦的法庭斗争。</p><p>Ripple 在诉讼中获得了部分胜利，法官阿纳丽莎·托雷斯（Analisa Torres）于 2023 年 7 月裁定，XRP 在二级市场上出售时并不构成证券。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-picks-ex-sec-chair-jay-clayton-as-us-attorney-for-manhattan?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a8sfd658.jpeg',
      source_url:
        'https://cointelegraph.com/news/trumps-former-sec-chair-us-attorney-southern-district-new-york',
      timestamp: 1731667112000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        'Bitfinex 黑客 Ilya Lichtenstein 因试图洗钱 12 万枚比特币被判处五年监禁',
      content:
        '<p>据 The Block 报道，检方建议因伊利亚·“荷兰”·利赫滕斯坦在调查中的合作以及其他与加密相关的调查，减少他的刑期。</p><p>利赫滕斯坦的妻子和同谋海瑟·“拉兹尔卡恩”·摩根的判决定于 11 月 18 日进行。</p><p>根据彭博社周四的报道，利赫滕斯坦因在 2016 年对加密交易所 Bitfinex 的黑客攻击及随后的洗钱活动被判处五年监禁。</p><p>利赫滕斯坦收到了检方建议的五年刑期。他被指控阴谋洗钱和阴谋欺诈美国，最高分别可判处 20 年和 5 年。然而，检方辩称，由于利赫滕斯坦不仅在自己的调查中合作，还在包括比特币雾霾案件中的作证，因此应当减轻他的刑期。</p><p>利赫滕斯坦的妻子和同谋海瑟·摩根（艺名“拉兹尔卡恩”）目前等待于 11 月 18 日的判决。她在洗钱阴谋中的角色较小，因此检方建议她获刑 18 个月。</p><p>2016 年，利赫滕斯坦据称黑入加密交易所 Bitfinex，窃取了大约 120,000 个比特币，当时价值 7200 万美元，今天的价值为 107 亿美元。他和摩根据称使用加密混合器、分层交易、暗网市场及其他手段洗钱，美国司法部称这些资产是美国政府迄今为止最大的一次查获。</p><p>2023 年 8 月，利赫滕斯坦和摩根对与 Bitfinex 黑客攻击有关的洗钱指控认罪。</p>',
      url: 'https://tokeninsight.com/zh/news/bitfinex-hacker-ilya-lichtenstein-sentenced-to-five-years-in-prison-for-attempting-to-launder-120-000-bitcoin?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/adifhgasv7.jpeg',
      source_url:
        'https://www.theblock.co/post/326730/bitfinex-hacker-ilya-lichtenstein-sentenced-to-five-years-in-prison-for-attempting-to-launder-120000-bitcoin',
      timestamp: 1731666695000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'MoonPay 通过新的解决方案促进了自我托管加密货币支出',
      content:
        '<p>据 The Block 报道，MoonPay Balance 将支持以欧元和英镑进行存款和取款，未来计划扩展到美国。</p><p>加密货币基础设施公司 MoonPay 正在通过推出新的支付解决方案来改善自我保管的消费体验，允许用户持有和消费法定货币余额。</p><p>在 11 月 13 日，MoonPay 正式推出了 MoonPay Balance，这是一种新支付工具，使用户能够在 MoonPay 上存储和消费法定货币余额，并将其作为与去中心化金融（DeFi）互动的入口。</p><p>根据与 Cointelegraph 分享的公告，该新解决方案使用户能够通过 MoonPay 与非托管或自我托管钱包（如 MetaMask、Phantom 和 Bitcoin.com）的直接集成来消费余额。</p><h3>启动时支持 SEPA、快速支付和开放银行</h3><p>在启动时，MoonPay Balance 将在英国和除德国外的大多数欧洲国家可用。</p><p>支持的完整国家列表包括 27 个国家，涵盖英国、奥地利、比利时、保加利亚、克罗地亚、塞浦路斯、捷克共和国、丹麦、爱沙尼亚、芬兰、法国、希腊、匈牙利、爱尔兰、意大利、拉脱维亚、立陶宛、卢森堡、马耳他、荷兰、波兰、葡萄牙、罗马尼亚、斯洛伐克、斯洛文尼亚、西班牙和瑞典。</p><p>在启动时，这一新的支付解决方案支持多种支付方式，包括单一欧元支付区（SEPA）支付、快速支付和开放银行支付。</p><p>MoonPay 的发言人告诉 Cointelegraph：“MoonPay 正在积极扩展支付选项，美国用户的 ACH 支付即将推出。”</p><p>尽管用户无法用加密货币充值余额，但他们仍然可以将加密货币兑换成欧元或英镑，并使用这些收益来充值 MoonPay Balance，这位代表指出。</p><p>MoonPay 表示，存款、取款、买卖均不收取费用，而其合作伙伴“可能会根据具体交易或服务收取生态系统费用。”</p><h3>非托管加密钱包作为“主要银行账户”</h3><p>在推出 MoonPay Balance 时，MoonPay 对自我保管的采用做出了重要贡献，这是一种独立于任何其他实体存储比特币等加密货币的方法。</p><p>MoonPay 联合创始人兼首席执行官伊凡·索托-赖特表示：“未来，用户可以期待他们的非托管加密钱包作为主要银行账户使用。”</p><p>他指出，MoonPay Balance 弥补了去中心化生态系统中的一个关键缺口，赋予用户在非托管钱包中管理加密资产的自由，并补充道：</p><p>“在 MoonPay，我们相信用户应该完全控制他们的数字资产，同时享受与传统金融科技应用相匹配或超过的体验。”</p><p>MoonPay 最新的消费解决方案是在与 PayPal 等主要传统金融公司一系列集成之后推出的。</p><p>2024 年 7 月，MoonPay 为欧洲联盟和英国的客户集成了法定货币 PayPal 入口。此前，MoonPay 在 2024 年 5 月在美国启用了类似的 PayPal 功能。</p>',
      url: 'https://tokeninsight.com/zh/news/moonpay-boosts-self-custodial-crypto-spending-with-new-solution?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/kg79.jpeg',
      source_url:
        'https://cointelegraph.com/news/moonpay-balance-self-custody-spending',
      timestamp: 1731581442000,
      tags: [
        {
          name: '支付',
        },
      ],
    },
    {
      title: '因复制粘贴错误损失2600万美元的交易员称这是“最大的痛苦”',
      content:
        '<p>据 The Block 报道，一位交易员因意外复制粘贴错误的转账地址而损失了 2600 万美元，现向白帽黑客提供 260 万美元的奖励，希望能够找回他们的资金。</p><p>这位交易员最近透露，自己在 6 月份因复制了错误的存款地址而损失了 2600 万美元，称这一经历是“极度痛苦”。</p><p>这位化名的加密投资者 qklpjeth 告诉 Cointelegraph，他们在 6 月 19 日意外地将 7912 个重新质押的以太坊（ezETH）转账到一个安全合约地址，当前价值为 2640 万美元。</p><p>不幸的是，他们表示输入了错误的地址，将资金发送到了一个安全模块，而不是他们自己的安全钱包，这意味着这些代币被“锁定，无法提取”。</p><p>当被问及错误是如何发生时，qklpjeth 简短回应：“一句话：复制错误。”</p><p>尽管这一失误发生在近五个月前，他们最近才在 X 平台上向白帽黑客发出求助，因为他们已用尽所有传统方式尝试找回资金。</p><p>qklpjeth 表示，他们公开寻求帮助，希望有人能够识别并利用智能合约中的漏洞，以便全额找回资金。</p><p>加密社区迅速提供了建议。在 qklpjeth 的原始 X 帖子下，DefiLlama 开发者 0xngmi 表示，最佳的行动方案是直接联系 Renzo 协议，请求他们修改代币合约。</p><p>不幸的是，qklpjeth 表示他们已经直接联系了 Renzo，试图找回资金，但由于监管限制，该协议无法提供帮助。</p><h3>更好用户体验的警钟</h3><p>与此同时，数字身份平台 SPACE ID 的业务发展总监哈里森·塞莱茨基告诉 Cointelegraph，这一数百万美元的失误是加密行业改善用户体验的“警钟”。</p><p>“简单的复制粘贴错误仍然让人损失数百万，这令人震惊，”他说。</p><p>“经历这样的事情真的很糟糕，我真心希望这位加密用户能够找回他们的资产，但像这样的故事是我们行业的警钟。我们需要做得更好。”</p><p>塞莱茨基表示，这种错误在比特币发明十多年后是不可接受的，并补充说，直到普通用户在转账时感到安全，避免因为简单的打字错误而失去全部资金，才能实现大规模采用。</p><p>“大多数人，如果在将财务安全托付给一个中心化实体和相信自己不出错之间有选择，会选择前者，”塞莱茨基说。</p><p>“用户体验是解锁大规模加密采用的关键，因此需要更加关注用户体验，首先从加密交易开始。”</p>',
      url: 'https://tokeninsight.com/zh/news/trader-who-lost-26m-to-copy-paste-error-says-it-s-been-max-pain?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sd0f8v6.jpeg',
      source_url:
        'https://cointelegraph.com/news/trader-loses-26-million-copy-paste-error-max-pain',
      timestamp: 1731581130000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '特朗普任命伊隆·马斯克和维韦克·拉马斯瓦米为 “DOGE” 削减政府开支',
      content:
        '<p>据 The Block 报道，新成立的政府效率部将致力于削减美国政府 6.5 万亿美元支出中的“浪费和欺诈”。</p><p>当选美国总统唐纳德·特朗普已任命埃隆·马斯克和维韦克·拉马斯瓦米领导一个新的政府机构——政府效率部（DOGE），旨在减少联邦支出和削减法规。</p><p>特朗普表示，这个新组织将“拆除政府官僚机构，削减多余的法规，削减浪费的开支，并重组联邦机构。”</p><p>“这将对系统产生震动，任何参与政府浪费的人都会受到影响，人数众多，”马斯克在公告中说。</p><h3>DOGE 将削减 6.5 万亿美元政府支出中的浪费</h3><p>新成立的 DOGE 将为政府外部提供建议和指导。它还将与白宫和管理与预算办公室合作，以推动“大规模结构性改革”，并创造一种“前所未有的政府创业方式”。</p><p>DOGE 的任务包括解决美国政府每年 6.5 万亿美元支出中的浪费问题。</p><p>根据美国政府的官方数据，2024 财年其支出为 6.75 万亿美元，与去年同期相比，联邦支出增加了 6170 亿美元。</p><p>特朗普表示：“我期待埃隆和维韦克在提高效率的同时，对联邦官僚机构进行变革，让所有美国人的生活变得更好。”</p><h3>自选举以来狗狗币价格上涨 150%</h3><p>自特朗普赢得总统选举以来，狗狗币（马斯克最喜爱的加密货币）的价格经历了大幅上涨，自选举日以来上涨约 150%。</p><p>根据 CoinGecko 的数据，11 月 12 日，狗狗币价格短暂突破 0.4 美元，为 2021 年 5 月以来首次。撰写时，该加密货币的交易价格为 0.38 美元，在过去 24 小时内下跌约 8%。</p><p>马斯克在特朗普的 DOGE 中担任领导职务，进一步巩固了两者之间的关系，自从特斯拉首席执行官在 2022 年 11 月恢复特朗普的 X 账户后，这种关系不断增长。特朗普在收购 Twitter（现为 X）后，花费 440 亿美元。</p><p>今年 8 月，特朗普表示，如果他赢得美国总统选举，他将考虑在 2025 年 1 月将马斯克纳入内阁或担任顾问角色。</p><p>马斯克的 DOGE 联合领导人拉马斯瓦米因其支持加密货币的立场而闻名。在 2023 年 11 月，拉马斯瓦米在其总统竞选中呼吁对加密货币进行大规模放松监管。他在 1 月份退出了 2024 年总统竞选。</p><p>2024 年 11 月初，拉马斯瓦米的资产管理公司 Strive Enterprises 宣布成立一个新的财富管理部门，将比特币整合到客户投资组合中。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-taps-elon-musk-and-vivek-ramaswamy-to-slash-gov-t-with-doge?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kugi85r7d8f.jpeg',
      source_url:
        'https://cointelegraph.com/news/trump-elon-musk-vivek-ramaswamy-slash-gov-t-doge',
      timestamp: 1731491029000,
      tags: [
        {
          name: '马斯克',
        },
      ],
    },
    {
      title: '人工智能公司 Genius Group 在“比特币优先”的融资策略后股价飙升 66%',
      content:
        '<p>据 Cointelegraph 报道，Genius Group 最近重组了董事会，任命了加密和 Web3 行业的高管，并计划持有 1.2 亿美元的比特币。</p><p>人工智能公司 Genius Group Limited 在承诺采用类似 MicroStrategy 的“比特币优先”策略后，股价一天内飙升 66%。该策略将使比特币成为其主要的财政资产。</p><p>这一计划将涉及将公司当前和未来储备的 90% 或更多资金用于比特币，首先通过 1.5 亿美元的市场公开发售（ATM）来收购初步目标 1.2 亿美元的比特币。</p><p>Genius Group 在 11 月 12 日表示，还将为其“教育科技”平台启用比特币支付，并推出针对学生的 Web3 教育系列，以学习比特币和其他加密货币。</p><p>根据 Google Finance 的数据，Genius Group (GNS) 的股票在 11 月 12 日收盘上涨 66.4%，达到 1.05 美元，盘后交易继续上涨 62.86%，至 1.71 美元。</p><p>Genius Group 的董事 Thomas Power 表示：“我们完全支持迈克尔·塞勒和 MicroStrategy 所提出的公共公司将比特币作为其主要财政储备资产的有力论据。”</p><p>他补充道：“我们相信，通过我们的比特币优先策略，我们将成为首批完全采纳 MicroStrategy 比特币策略的美国纽约证券交易所上市公司之一，以造福我们的股东。”</p><p>这家总部位于新加坡的公司成立于 2002 年，其 AI 驱动的教育科技面向各个层次的学生，从小学、中学、高等教育到企业和政府。它于 2022 年在美国纽约证券交易所上市。</p><p>该公司表示，这一新政策是在董事会重组后制定的，重组中纳入了多位区块链和 Web3 行业专家。</p><p>Power 补充道：“Genius Group 专注于为未来的指数技术教育学生。我们认为比特币是将推动这些指数技术的主要价值储存。”</p><p>该公司遵循了迈克尔·塞勒的 MicroStrategy 所开辟的道路，其比特币持有量已超过 279,420 个，比特币当前价值约为 245 亿美元，按比特币约 88,000 美元的价格计算。</p><p>今年，其他也加入比特币财政行列的公司包括 Semler Scientific 和 Metaplanet，均持有超过 1,000 个比特币。</p>',
      url: 'https://tokeninsight.com/zh/news/ai-firm-genius-group-surges-66-after-bitcoin-first-treasury-strategy?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/khbiytyiwfe.jpeg',
      source_url:
        'https://cointelegraph.com/news/ai-firm-genius-group-adopts-bitcoin-treasury-strategy',
      timestamp: 1731490610000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '以太坊第二层 Lisk 发布主网并宣布空投计划',
      content:
        '<p>据 The Block 报道，Lisk 在今年 2 月推出其测试网后，现在已在主网上线。</p><p>Lisk 的空投活动将于 11 月 21 日开始，第一季将持续四个月。</p><p>以太坊 Layer 2 网络 Lisk 已经在主网上线，并宣布了空投计划。</p><p>Lisk 的测试网在今年 2 月底推出，此前它在几个月前从 Layer 1 转型为 Layer 2。除了正式上线主网，该平台还计划通过空投分发 1500 万个 LSK 代币。</p><p>Lisk 的空投活动将于 11 月 21 日开始，第一季将持续四个月。用户可以通过完成 Lisk 平台上的任务来赚取积分，获得的总积分将决定他们通过空投能够领取多少 LSK 代币。</p><p>“我们设计这一空投活动旨在无缝、引人入胜、富有教育意义，甚至有趣，反映了我们创建易于使用、对用户有益的 Web3 应用的使命，”Lisk 首席运营官 Dominic Schwenter 在与 The Block 分享的声明中表示。</p><p>Lisk 最初于 2016 年作为 Layer 1 区块链推出。然而，它在 2023 年 12 月转型为以太坊 Layer 2，以切换到现实资产和去中心化物理基础设施网络。Lisk 基于 Optimism 的 Layer 2 开发框架 OP Stack 和 Gelato 的 rollup-as-a-service 平台。此举还将平台的原生代币 LSK 转移到了以太坊上。</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-layer-2-lisk-launches-mainnet-and-announces-airdrop-plans?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/79sfad6.jpeg',
      source_url:
        'https://www.theblock.co/post/325641/ethereum-layer-2-lisk-launches-mainnet-and-announces-airdrop-plans',
      timestamp: 1731409262000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: '狗狗币价格飙升 51%，市值突破 630 亿美元',
      content:
        '<p>据 The Block 报道，狗狗币在过去 24 小时内上涨了 51%，交易价格为 0.43 美元，市值达 635 亿美元。</p><p>分析人士表示，狗狗币支持者埃隆·马斯克参与即将到来的特朗普政府，进一步推动了这一迷因币的上涨。</p><p>狗狗币在过去 24 小时内经历了加密货币价格的最高涨幅，特朗普领导的加密市场反弹没有放缓的迹象。根据 The Block 的狗狗币价格页面，这种以狗为主题的迷因币上涨了 51%，市值达到 635 亿美元。</p><p>仅一个月前，狗狗币的市值约为 160 亿美元。其当前价格为 2021 年以来的最高点，现在是市值第六大的加密货币。</p><p>狗狗币这一显著的涨幅似乎与其与特斯拉和 SpaceX 首席执行官埃隆·马斯克的非官方联系有关。作为世界首富，马斯克也是社交媒体平台 X 的所有者，一直以来都是狗狗币的长期支持者。</p><p>“由于美国总统选举，狗狗币得到了看涨的推动，马斯克积极参与其中，”LVRG Research 的董事 Nick Ruck 说道。“投机者认为，马斯克在新白宫政府中的参与可能会在未来提升狗狗币的价格，因为在上一个牛市周期中，这一数字资产的表现不及其他加密货币。”</p><p>马斯克在帮助前总统特朗普的再次竞选中花费了数千万美元，并出现在特朗普的竞选集会上。特斯拉首席执行官甚至承诺在选举前每天赠送 100 万美元以支持特朗普，这引发了对调查的呼声。</p><p>Presto Research 的加密分析师 Min Jung 告诉 The Block：“最近提到在特朗普政府下可能设立的‘政府效率部（DOGE）’，进一步推动了狗狗币的上涨。”马斯克之前讨论过创建这样的政府部门，以减少浪费性开支和复杂的法规。</p><p>自特朗普胜选以来，马斯克一直在提供人事决策的建议，并在即将到来的政府中扮演“重要角色”，ABC 新闻周二报道，称马斯克在特朗普办公室的参与可能比看起来更深。</p><p>Jung 还补充道：“狗狗币作为领先的迷因币，加上其在零售投资者中的广泛认可，使其在当今以迷因驱动的市场中尤其具有吸引力。”</p>',
      url: 'https://tokeninsight.com/zh/news/dogecoin-s-market-cap-crosses-63-billion-after-51-price-surge?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdfo7tasvhibas.jpeg',
      source_url:
        'https://www.theblock.co/post/325704/dogecoin-market-cap-60-billion-usd',
      timestamp: 1731408967000,
      tags: [
        {
          name: 'Meme',
        },
      ],
    },
    {
      title:
        'MicroStrategy 的比特币投资组合超过 200 亿美元，投资回报率现已超过 100%',
      content:
        '<p>据 Cointelegraph 报道，数据来自 BitcoinTreasuries，MicroStrategy 这家比特币积累公司以平均成本 39,292 美元的价格进行了 42 次比特币购买。</p><p>随着领先的加密货币价格突破 80,000 美元，商业智能公司 MicroStrategy 的比特币储备价值已超过 200 亿美元。</p><p>MicroStrategy 的 252,200 个比特币目前价值 205 亿美元，使得该公司在其比特币投资策略上获得了超过 104% 的收益，根据以公司执行主席 Michael Saylor 命名的“Saylor Tracker”显示。</p><p>这家比特币积累公司进行了 42 次比特币购买，平均成本为 39,292 美元，BitcoinTreasuries 数据显示。</p><p>MicroStrategy 仍然是最大的企业比特币持有者，紧随其后的是比特币矿商 Marathon Digital 和 Riot Platforms，分别持有价值 21 亿美元和 8.4 亿美元的比特币。</p><p>MicroStrategy 计划在未来三年内筹集高达 420 亿美元，以在其“21/21”计划下积累更多比特币，该计划包括 210 亿美元的股权和 210 亿美元的固定收益证券。</p><p>目前比特币的价格为 81,617 美元，创下历史新高，数据来源于 CoinGecko。</p><p>此次价格上涨也惠及了其他主要比特币持有者。</p><p>根据区块链分析公司 Arkham Intelligence 的数据，布坦的比特币持有量超过 10 亿美元。</p><p>布坦正在建设一个大规模的比特币挖矿项目，似乎将比特币作为战略货币储备。</p><p>根据国际货币基金组织的数据显示，布坦的比特币持有量占其 31.5 亿美元国内生产总值的 32%，数据来自 2024 年 10 月。</p><p>萨尔瓦多也在其比特币投资策略中获得了回报，其 5,930 个比特币的价值现在超过 4.82 亿美元，Drop Stab 数据显示。</p><p>这个中美洲国家的比特币投资收益率达到了 80%，未实现利润接近 2.14 亿美元。</p><p>不过，这条道路并非总是一帆风顺。</p><p>萨尔瓦多在 2020-2021 周期达到高峰前的两个月开始了其比特币投资策略，2022 年市场整体下跌后，媒体广泛批评了该策略。</p><p>由 Nayib Bukele 领导的国家继续通过每天购买 1 个比特币来进行定投。</p><p>萨尔瓦多还通过其护照计划和火山比特币挖矿项目的收入来积累比特币。</p>',
      url: 'https://tokeninsight.com/zh/news/microstrategy-s-bitcoin-portfolio-surpasses-20b-roi-now-over-100?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/的f9g7.jpeg',
      source_url:
        'https://cointelegraph.com/news/microstrategy-bitcoin-portfolio-surpass-20-billion',
      timestamp: 1731320838000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        'ENS 实验室推出了自己的 “l2不可知论” 聚合命名链，目标是在 2025 年底推出',
      content:
        '<p>据 The Block 报道，负责以太坊命名服务（ENS）的组织今天宣布，他们正在构建自己的 Layer 2 网络，名为 Namechain。</p><p>Namechain 旨在优先考虑互操作性，并允许用户从“任何 L2 网络”开始使用 ENS。</p><p>ENS Labs 透露，Namechain 的启动预计将在 2025 年底左右进行。ENS 是建立在以太坊区块链上的去中心化命名系统，为加密地址提供可读名称。</p><p>ENS 的联合创始人 Jeff Lau 在曼谷的“frENSday”活动上表示：“目前行业对 Rollup 的成功指标是 TVL（总锁仓价值）。我们不需要优先考虑 TVL。ENS 已经有用户，我们可以真正优先考虑其他 L2 不具备的事情。”</p><p>ENS Labs 告诉 The Block，Namechain 的启动预计将在 2025 年底左右进行。Namechain 基于零知识证明技术，预计将处理和执行主以太坊网络之外的交易，同时以较低的成本保持以太坊的“完全安全性”。</p><p>以互操作性为重点的 Namechain 计划将 L2 到 L2 的桥接功能内置于协议中。“这样你就可以在桥接的同时进行操作，并从你选择的 L2 支付，”Lau 说道。</p><p>Lau 还表示，Namechain 被称为“L2 无关”，预计将通过允许用户从任何 L2 网络开始他们的 ENS 之旅，降低进入门槛。ENS Labs 在新闻稿中指出，名称注册和管理的费用将比 Layer 1 网络的费用低 99%。</p><p>“部署到另一个公链使得将用户体验直接嵌入协议变得困难，而能够控制从协议到治理的整个栈，意味着这个 Rollup 是为 ENS 和命名服务而存在的，”Lau 在周一的活动中表示。</p><p>根据 Lau 的说法，该即将推出的链的三个优先事项将是使用 zkEVM 实现快速最终性、开源软件以及维护 ENS 的去中心化特征。</p><p>Namechain 作为一个更大运动的一部分被设计，名为“ENSv2”，这是在 5 月揭晓的 ENS 的第二个版本，旨在将命名服务扩展到以太坊 Layer 2 网络，使服务更加灵活和经济。</p><p>ENS 的联合创始人透露，团队已经选择了 Namechain 的 L2 合作伙伴，但没有透露其名称。</p><p>在 9 月，ENS Labs 宣布 Paypal 和 Venmo 已将 ENS 集成到他们的支付平台中。团队当时表示，ENS 在链上注册的名称超过 200 万个，链外注册的名称超过 400 万个。</p>',
      url: 'https://tokeninsight.com/zh/news/ens-labs-introduces-own-l2-agnostic-rollup-namechain-aiming-for-launch-by-end-of-2025?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/fgastff.jpeg',
      source_url:
        'https://www.theblock.co/post/325381/ens-labs-introduces-own-l2-agnostic-rollup-namechain-aiming-for-launch-by-end-of-2025',
      timestamp: 1731320537000,
      tags: [
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: '比特币投资者向贝莱德 ETF 注入 11 亿美元，比特币再创新高',
      content:
        '<p>据 Cointelegraph 报道，黑石（BlackRock）的现货比特币 ETF 自 1 月推出以来首次实现了每日超过 10 亿美元的资金流入。</p><p>全球最大的资产管理公司黑石在一个创纪录的交易日内，累计超过 10 亿美元的资金流入其比特币交易所交易基金（ETF），随着比特币继续创下历史新高。</p><p>根据 Farside 的数据，11 月 7 日，黑石的现货比特币 ETF（IBIT）录得 11 亿美元的资金流入，此前连续两天的资金流出总额为 1.133 亿美元，重新获得了资金流入的地位。</p><h3>比特币接近 77,000 美元</h3><p>这一天，比特币再次创下历史新高，达到 76,943 美元，数据来源于 CoinMarketCap。</p><p>IBIT 的资金流入占当天美国上市的 11 个现货比特币 ETF 总流入的近 82%，当天总流入额为 13.4 亿美元。</p><p>Fidelity Wise Origin Bitcoin Fund 的资金流入额位居第二，达到 1.909 亿美元，随后是 ARK 21Shares Bitcoin ETF（ARKB），流入 1760 万美元。</p><p>一些交易者预计未来几天将会有更显著的资金流入。</p><p>“明天再来一次大规模的流入，”加密交易员 The Bitcoin Therapist 在其 141,400 名 X 平台的粉丝面前表示。</p><p>金融分析师 Rajat Soni 向其 100,400 名 X 平台的粉丝分享了这一消息，宣称大家应该“做好准备”。</p><p>“欢迎来到 PumpVember，”加密评论员 Zia ul Haque 补充道。</p><h3>大规模流入日伴随交易量激增</h3><p>彭博社 ETF 分析师 Eric Balchunas 表示，尽管他预期基于前一天的交易量会有较大的流入，但他对流入规模感到“惊讶”。</p><p>“告诉过你们，这可能会很大，虽然我也没料到会这么大，绝对是任何比特币 ETF 有史以来最大的单日流入，”Balchunas 在 11 月 7 日的 X 帖子中写道。</p><p>在 11 月 6 日，Balchunas 指出，IBIT 比特币 ETF 在市场开盘后前 20 分钟内的交易量接近 11 亿美元，此时唐纳德·特朗普在总统选举中胜出。</p>',
      url: 'https://tokeninsight.com/zh/news/btc-investors-pour-1.1b-into-blackrock-etf-as-bitcoin-marks-another-high?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/饭vadzvh.jpeg',
      source_url:
        'https://cointelegraph.com/news/blackrock-clocks-1-billion-bitcoin-etf-inflows-btc-price-new-highs',
      timestamp: 1731062784000,
      tags: [
        {
          name: '基金',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '索拉纳升至 200 美元以上，比特币在大选后的持续反弹中创下新高',
      content:
        '<p>据 The Block 报道，最近几个月，Solana 的链上活动强劲，今天一度突破 200 美元，交易价格达到 201 美元。与此同时，美国股市周四收盘创新高。</p><p>Solana 突破 200 美元大关，而比特币在市场因前美国总统唐纳德·特朗普的选举胜利而上涨的背景下，早些时候达到了新的历史高点 76,873 美元。</p><p>根据 The Block 的价格页面，Solana 在过去 24 小时内上涨 6.2%，在撰写时交易价格为 200 美元。比特币上涨 0.6%，交易价格为 75,984 美元，而以太币上涨 3.4%，至 2,911 美元。</p><p>与此同时，标准普尔 500 指数周四上涨 0.7%，纳斯达克综合指数上涨 1.5%，均创下收盘新高，标志着美国股市延续了选举后的上涨趋势。</p><p>Presto Research 的研究分析师 Min Jung 告诉 The Block：“最近的加密市场反弹是由于特朗普的选举胜利，这表明可能会有一个更亲加密的政府，加上预期的联邦公开市场委员会（FOMC）结果，这些都推动了股市达到历史高点。”</p><p>根据 The Block 的数据仪表板，10 月份，Solana 的活跃地址数量创下历史新高，超过 1.23 亿个。从 9 月份的数据来看，签署交易的独立地址数量增加了 42% 以上。在 Solana 上，pump.fun 代币的崛起是去中心化交易所（DEX）交易量的主要驱动因素，Raydium 上个月的交易量超过 300 亿美元，数据来源于 DefiLlama。</p><p>尽管特朗普即将回归白宫可能提升了对现货 Solana 交易所交易基金（ETF）批准的乐观预期，但近期的价格波动更可能是“由强劲的基本面和持续高水平的链上活动驱动的，”Jung 说。</p><p>Jung 补充道：“推高 Solana 价格的确有希望的因素，包括可能的 ETF 批准，然而这个时间表仍然太遥远，无法对当前价格产生实质性影响。更有可能的是，对数字资产的有利政策预期正在推高资产价格，尤其是在 Solana 这样的项目上，其持有者社区非常强大。”</p><p>Jung 表示，Solana 表现突出，“得益于强劲的 meme 代币活动，甚至在交易费用上有时超过以太坊”，这也“支持了包括 Raydium 等去中心化交易所的更广泛 Solana 生态系统。”</p>',
      url: 'https://tokeninsight.com/zh/news/solana-climbs-above-200-bitcoin-hits-new-high-amid-extended-post-election-rally?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/呵9ds6vv7.jpeg',
      source_url:
        'https://www.theblock.co/post/325146/solana-breaks-above-200-bitcoin-hits-new-high',
      timestamp: 1731062164000,
      tags: [
        {
          name: 'Solana',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Binance 储备金证明上线两周年，资产覆盖水平稳居业内首位',
      content:
        '<p>Binance 在其储备金证明（Proof of Reserves, PoR）计划接近两周年之际，报告其 PoR 系统目前覆盖35种代币，拥有超过1500亿美元的储备资产。这一资产覆盖水平在业内名列前茅，体现了 Binance 对透明度和用户信任的承诺。</p><p>资产储备证明（PoR）是一项透明度措施，使中心化交易所（CEX）能够证明其持有足够的资产以完全覆盖所有用户存款。PoR 对于保障用户信任至关重要，因为中心化交易所掌控客户资金，可能存在被滥用的风险。通过定期提供 PoR 披露，交易所展示其资产储备的稳定性和安全性，从而增强用户信任</p><p>其他主要交易所也实施了 PoR 计划。例如，OKX 的 PoR 计划覆盖22种资产，拥有202亿美元的储备；Bitget 报告其储备为39.8亿美元，涵盖4种资产；Bybit 的 PoR 覆盖40种资产，但其用户资产总规模相对较小。</p><p>这些 PoR 报告通常显示覆盖的资产数量、资产储备总量和主要资产的储备比例，证明交易所是否达到或超过100%的用户存款。一些交易所仅覆盖 BTC、ETH、USDT 和 USDC 等主要资产，其他交易所则包含更广泛的资产，以证明即使是小众代币也具备充足的储备。</p><p><img src="https://s2.tokeninsight.com/static/news/content/img/Screenshot_2024-11-08_at_10.59.37 AM.png"><br>&nbsp;储备资产总量数据来源: Defillama</p><p>Binance 每月发布的 PoR 报告旨在提升平台上用户资产支持情况的透明度。10 月的报告显示，主要资产的储备比例均超过 100%，其中 BTC 为 106%，ETH 为 100.6%，USDT 为 111%。Binance 表示，这些储备比例有助于确保用户资金的安全性和流动性。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/calendar/img202411081100340b97c994-131c-475a-8d03-adf4e83c9549.jpg"><figcaption>Source: https://www.binance.com/en/proof-of-reserves</figcaption></figure><p>自 2022 年推出资产储备证明（PoR）计划以来，Binance 已引入先进的密码学技术，包括 zk-SNARKs 和 Merkle 树结构。这些方法使用户能够在不泄露隐私的情况下，独立验证其资产是否包含在总储备中。</p><p>除了 PoR 透明度外，Binance 还保持零债务资本结构，旨在降低市场波动中的财务风险。此外，Binance 设立了用户安全资产基金（SAFU），一个专门的应急储备，旨在在极端情况下保护用户资产。</p><p><br>&nbsp;</p>',
      url: 'https://tokeninsight.com/zh/news/binance-marks-two-years-of-proof-of-reserves-with-extensive-asset-backing?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/bn_por.png',
      source_url: '',
      timestamp: 1731034899000,
      tags: [
        {
          name: '币安',
        },
        {
          name: '交易所',
        },
      ],
    },
    {
      title: 'Avalanche 从 Terra 的 LFG 回购了价值 5300 万美元的 AVAX 代币',
      content:
        '<p>据 Cointelegraph 报道，AVAX 代币是在臭名昭著的 Terra Luna 崩溃前一个月以 1 亿美元的价格购买的。</p><p>Avalanche 基金会完成了从现已解散的 Luna Foundation Guard (LFG) 回购 197 万个 AVAX 代币的交易，LFG 当时购买这些代币以支持 Terra 区块链生态系统。</p><p>在发送给 Cointelegraph 的公告中，Avalanche 基金会表示已完成代币回购过程。</p><p>虽然 Avalanche 的文件指出它将以 4550 万美元的价格购买这些代币，但在撰写时，Avalanche 代币的交易价格为 26.95 美元，使得 197 万个代币在当前市场价格下约值 5300 万美元。</p><h3>LFG 于 2022 年购买了 1 亿美元的 AVAX</h3><p>2022 年，Terraform Labs 创始人 Do Kwon 成立了 LFG，以保护 Terra 的 TerraUSD (UST) 稳定币。当时，LFG 通过购买比特币和其他山寨币，包括价值 1 亿美元的 AVAX，来构建储备，以稳定当时市值为 167 亿美元的 UST。</p><p>除了 LFG 的购买，Terraform Labs 还将价值 1 亿美元的 Terra (LUNA) 代币兑换为 AVAX，以“战略性地对齐生态系统激励”。</p><p>然而，Terra 的崩溃随之而来。到 2022 年 5 月，UST 失去了与美元的挂钩，导致 LUNA 的价格大幅下跌以及 Terra 生态系统的全面崩溃。</p><h3>Avalanche 基金会从 LFG 回购 197 万个代币</h3><p>自那时以来，Avalanche 基金会一直在努力从 LFG 回购这些代币。10 月 12 日，该基金会宣布已达成协议以回购这些代币。Avalanche 表示，这将确保 LFG 不会违反其原始协议。基金会写道：</p><p>“这一行动确保 LFG 不会违反原协议对代币使用的限制，并保护这些代币免受破产托管清算的复杂性，同时将 197 万个 AVAX 代币归还给基金会的持有。”</p><p>在 Avalanche 基金会的最新公告中，该组织表示，代币回购是支持 Avalanche 生态系统可持续发展的“重要一步”。</p><p>该非营利组织还强调，这些代币将用于加强其资助、活动和孵化器等项目。</p>',
      url: 'https://tokeninsight.com/zh/news/avalanche-buys-back-53m-of-avax-tokens-from-terra-s-lfg?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/fdg697.jpeg',
      source_url:
        'https://cointelegraph.com/news/avalanche-buyback-1-97-million-avax-tokens-terra',
      timestamp: 1730977059000,
      tags: [
        {
          name: 'Avalanche',
        },
        {
          name: 'Terra',
        },
      ],
    },
    {
      title: '随着唐纳德·特朗普赢得美国大选，加密股票收盘大幅上涨',
      content:
        '<p>据 Cointelegraph 报道，交易者们乐观地认为，亲加密的共和党人可能会在白宫胜利后赢得国会多数席位。</p><p>美国加密货币股票在交易日结束时大幅上涨——大多数上涨幅度达到双位数——这是因唐纳德·特朗普的总统选举胜利和比特币创下历史新高所致。</p><p>根据 Google Finance 的数据，作为选举周期中最大捐款者之一的加密货币交易所 Coinbase Global 在 11 月 6 日的涨幅最大，收盘上涨 31.1%，报 254.31 美元，今年迄今已上涨 62.1%。</p><p>交易平台 Robinhood Markets 同样在当天上涨 19.6%，比特币矿商 MARA Holdings（前身为 Marathon Digital）也上涨了 19.6%。此外，购买比特币的 MicroStrategy 收盘上涨超过 13%。</p><p>其他美国比特币矿商也普遍上涨，Riot Platforms 收盘上涨 26%，CleanSpark 上涨 23%，Hut 8 则上涨 11%。</p><p>交易者们似乎对共和党将在白宫的胜利后控制国会持乐观态度，认为这将使两项共和党支持的加密法案顺利通过。</p><p>共和党当选总统特朗普在竞选中明确支持加密货币，并承诺建立战略比特币储备。</p><p>根据美联社的报道，他似乎有望赢得 312 票的选举人票，轻松超过 270 票的胜选门槛，并在内华达州和亚利桑那州这两个关键州领先，目前尚未最终确定结果。</p><p>他的政党在参议院赢得了多数席位，并在众议院也处于领先地位，但仍有 40 个席位尚未确定。</p><p>拥有共和党多数的参议院将于 1 月就位，如果在“跛脚鸭”会议中未通过，可以通过 GOP 支持的《21 世纪金融创新与技术法案》（FIT21）。该法案旨在将更多的监管控制权交给商品期货交易委员会，但在 5 月通过众议院后，在参议院银行委员会 stalled。</p><p>共和党稳定币监管框架法案在共和党众议院多数的情况下也可能重新成为焦点，因为该法案在去年 7 月通过金融服务委员会后停滞不前。</p><p>比特币价格的飙升也是股票价格上涨的另一个可能催化剂。</p><p>TradingView 显示，比特币在纽约交易日内持续创下新高，在纽约证券交易所于下午 4 点（协调世界时 9 点）收盘前一分钟达到了当前历史最高点 76,509.56 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-stocks-close-on-huge-gains-riding-donald-trump-s-us-election-win?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9对6as9.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-stocks-gain-donald-trump-election-win',
      timestamp: 1730976366000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '在选举日特朗普领先的情况下，比特币突破了 74000 美元的历史新高',
      content:
        '<p>据 The Block 报道，最大的加密货币比特币（Bitcoin）年初至今已上涨近 70%，并在今天创下新历史高点，市场正在消化共和党候选人唐纳德·特朗普在 2024 年总统竞选中的早期领先。</p><p>比特币价格已突破 73,737.94 美元，创下新历史高点，市场正在关注特朗普在 2024 年总统选举中的早期领先。</p><p>根据 The Block 的价格页面，比特币在过去 24 小时内上涨了 9.5%，目前交易价格约为 74,700 美元。</p><p>自 3 月 5 日突破 2021 年 11 月的历史高点 69,000 美元以来，比特币持续上涨，并在 3 月 13 日触及 73,000 美元。自此之后，比特币在 50,000 美元和 70,000 美元之间震荡了七个多月。</p><p>以太币（Ether）价格上涨 6.72%，交易价为 2,562 美元，而索拉纳（Solana）上涨 13.29%，至 179 美元，主要山寨币普遍上涨，整体加密市场上涨了 6.77%，The Block 的数据显示。</p><p>在美国总统选举期间，新历史高点的出现与前总统特朗普在寻求连任时对加密货币行业采取更加友好的态度有关。</p><p>特朗普在 5 月时改变了对加密货币的态度，开始接受加密货币作为捐款形式。此后，他与比特币矿业公司的高管会面，并表示希望将美国打造成“全球加密之都”。而民主党候选人、现任副总统卡马拉·哈里斯对此话题则相对低调。</p><p>根据美联社的报道，特朗普迄今赢得 52.5% 的选票，获得 198 票的选举人票，而哈里斯目前获得 99 票的选举人票。</p><p>在去中心化预测市场平台 Polymarket 上，针对选举结果的 30 亿美元投注中，特朗普的胜算在过去一天飙升至 84.3%。</p><p>OKX 首席商业官伦尼克斯·莱（Lennix Lai）表示，宏观经济政策的不确定性可能会持续，导致短期波动加剧。</p><p>“市场也已经将特朗普获胜纳入了考虑，这造成了短期的狂欢，正如今天的新历史高点所示，但在进一步创下历史高点的过程中可能会出现回调，”莱说。“作为候选人，特朗普向市场发出了非常看涨的信号，表示要拥抱加密行业，并加强美国作为全球受监管的加密中心的地位。如果这些政策得以实施，将在全球范围内产生广泛的影响。”</p><p>“历史上，十月和十一月往往是全年回报最强劲的月份，而今天的突破与行业预期一致，”HashKey Global 的董事总经理本·埃尔-巴兹（Ben El-Baz）表示。“接下来的几天将会非常重要，包括激烈的美国选举、联邦储备委员会 11 月 6 日的利率决定，以及 11 月 8 日的美国就业报告。”</p><p>“分析师们预计，随着关键摇摆州开始计票，市场将会出现大量波动，但预测市场对特朗普胜利的预期压倒性，这可能推动了价格的上涨。一旦结果正式宣布，比特币可能会创下新历史高点，结束这一对加密行业极其不确定的事件，”LVRG Research 的主任尼克·鲁克（Nick Ruck）说。</p><h3>ETF 动力</h3><p>作为市值最大的加密货币，比特币年初至今已上涨近 70%，这主要得益于美国新推出的现货比特币 ETF 的大量流入。自 1 月 11 日交易开始以来，这些 ETF 截至 10 月 28 日生成了超过 4500 亿美元的日累计交易量。仅在 10 月，流入比特币 ETF 的资金已超过 36 亿美元，使得年初至今的流入总额达到 225 亿美元。</p><p>“我们认为，目前比特币的价格和流入受到美国政治的重大影响，最近的流入激增可能与共和党在民调中的表现有关，”CoinShares 研究负责人詹姆斯·巴特菲尔（James Butterfill）上个月表示。</p><p>4 月 20 日的比特币减半事件是今年价格上涨的另一个叙事。减半使得通过矿工奖励补贴进入流通的新比特币数量从每个区块 6.25 BTC 减少到 3.125 BTC。矿工继续为每个挖出的区块赚取额外的交易费用。</p><p>比特币减半事件每 210,000 个区块自动发生一次——大约每四年一次——历史上这些事件与加密货币价格的显著波动相关。尽管不是直接的因果关系，但这些事件通常会在比特币市场之前引发显著的牛市。</p><p>“新的比特币历史高点不仅标志着加密货币的一个重要里程碑，而且突显了去中心化数字资产的持久韧性和日益增长的主流接受度，”Coinbase 英国首席执行官丹尼尔·塞费特（Daniel Seifert）此前对 The Block 表示。“这反映了对这一资产需求的增加。”</p><p>早些时候，研究和经纪公司 Bernstein 的分析师对本轮比特币价格目标 150,000 美元“更有信心”。最近，他们声称对 2025 年底 200,000 美元的比特币价格预测是“保守的”，并敦促持怀疑态度的人重新考虑在美国创纪录的债务水平下加密货币的有限供应。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-breaks-new-all-time-high-above-74-000-amid-trump-s-early-lead-on-election-day?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/adsf769.jpeg',
      source_url: 'https://www.theblock.co/post/282319/bitcoin-all-time-high',
      timestamp: 1730891097000,
      tags: [
        {
          name: '政策与监管',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '仓鼠快打失去了 86% 的用户，Paws 迷你应用程序在Telegram上飙升',
      content:
        '<p>据 Cointelegraph 报道，随着对《Hamster Kombat》的兴趣下降，PAWS 的用户量激增，超越了曾经领先的 Telegram Mini 应用。</p><p>作为 Telegram 上领先的点击赚取游戏，《Hamster Kombat》因政治反弹、禁令和新的竞争而用户基础和参与度急剧下降。</p><p>《Hamster Kombat》在 8 月时拥有 3 亿用户，但截至 11 月 5 日，该游戏的活跃月玩家仅为 4100 万人，下降幅度达 86%。</p><p>与此同时，新推出的 Telegram Mini 应用 PAWS 受到了热烈欢迎，在其首八天内用户数达到了 2050 万，超过了《Hamster Kombat》的增长轨迹。</p><p>根据 IntoTheBlock（ITB）的数据，9 月 27 日时，《Hamster Kombat》的活跃地址达到了约 772,330 个。自那时起，用户活动和代币兴趣不断减弱，过去一周下降超过 36%。</p><h3>代币价格和活动骤降</h3><p>《Hamster Kombat》的挑战反映在其 HMSTR 代币价格上，根据 CoinGecko 的数据，从 9 月 26 日的历史高点 0.01 美元下降近 70%，截至 11 月 4 日约为 0.0022 美元。这一下降与网络参与度降低和每日活跃用户减少相关。</p><p>这一下行趋势得到了 ITB 的活跃地址比例（AAR）图表的强化——该图表计算活跃地址与持有 HMSTR 地址的比例——显示出活跃用户低至仅 0.34% 的 30 天低点。</p><p>尽管如此，根据 ITB 数据，持有 HMSTR 的地址总数仍在增加，11 月 4 日达到了 350 万持有者的 30 天高点。</p><p>与其他流行 Telegram 游戏的表现相比，可以看到一个模式，例如 DOGS 代币的空投，其价格在 8 月至 11 月 4 日间从 0.0014 美元降至 0.0004 美元。</p><p>DOGS 的 AAR 图表同样显示出活动的稳步下降，伴随着代币价值的下跌，在 11 月 3 日时活跃用户达到了 0.27% 的 30 天低点。</p><h3>监管和波动反应</h3><p>《Hamster Kombat》遭到伊朗政府官员的批评，并且有谣言称在乌兹别克斯坦将被禁，这些谣言后来被证明是不准确的。</p><p>《Hamster Kombat》团队此前告诉 Cointelegraph，他们的未来计划包括支付系统集成、推出新游戏以及将非同质化代币（NFT）作为游戏内资产。</p><h3>一方陨落，一方崛起</h3><p>与《Hamster Kombat》的网络活动和代币价格下跌形成鲜明对比的是，PAWS Mini 应用在头两天内就吸引了超过 1100 万用户。</p><p>11 月 4 日，PAWS 的 Telegram 渠道宣布已有 1000 万钱包连接到该应用，并且该项目的 X 账号已经拥有 100 万粉丝。</p>',
      url: 'https://tokeninsight.com/zh/news/hamster-kombat-loses-86-of-users-as-paws-mini-app-soars-on-telegram?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asd876.jpeg',
      source_url:
        'https://cointelegraph.com/news/hamster-kombat-decline-telegram-game-competition-rise-of-paws',
      timestamp: 1730890306000,
      tags: [
        {
          name: 'Telegram Bot',
        },
      ],
    },
    {
      title: 'Meta 向美国军方开放了 Llama AI 模型',
      content:
        '<p>据 Cointelegraph 报道，Meta 表示，与美国及其盟友共享开源 AI 技术，将有助于保持其在中国和其他竞争对手面前的“技术优势”。</p><p>社交媒体和科技公司 Meta 已向美国军方和国防承包商开放其人工智能模型 Llama，以用于国家安全目的。</p><p>Meta 全球事务总裁尼克·克莱格（Nick Clegg）在 11 月 4 日的声明中写道，Llama 将用于简化复杂的后勤和规划，追踪恐怖融资，并加强美国的网络防御。</p><p>该公司将与微软、亚马逊、IBM、甲骨文、Palantir 和其他科技巨头合作，为美国政府提供全面的服务。</p><p>马克·扎克伯格的公司强调，美国及其盟友继续倡导开源技术的重要性，以保持其在中国和其他竞争对手面前的“技术优势”。</p><p>“开源系统对帮助美国建立世界上最先进的军事力量至关重要，并与其盟国合作。”</p><p>克莱格指出，开源系统帮助加速了国防研究和高端计算，识别安全漏洞，改善通讯。</p><p>“这使公共部门受益，促进发现和突破，提高效率，改善公共服务的交付。”</p><p>克莱格表示，美国私营部门也将大大受益，因为国家安全与经济产出“密不可分”。</p><p>“其他国家——包括中国和美国的其他竞争对手——也明白这一点，并正在加紧开发自己的开源模型，投入大量资金以超越美国。”</p><p>这一消息发布几天后，路透社报道称，与人民解放军相关的中国研究机构已使用 Meta 的 Llama 早期版本来构建其人工智能军事工具，以收集和处理情报，引用了其获得的一份报告。</p><p>对此，Meta 一位高管表示，人民解放军显然使用 Llama 的行为是“未经授权”的，违反了 Meta 的可接受使用政策。</p><p>在新的多公司合作关系下，甲骨文将基于 Llama 合成飞机维修文档，从而使技术人员能够更有效地诊断问题——加快维修时间，将飞机重新投入服务。</p><p>亚马逊网络服务和微软 Azure 将在其云解决方案上托管 Llama，以保护敏感数据。</p><p>航空航天公司洛克希德·马丁（Lockheed Martin）已将 Llama 纳入其“人工智能工厂”，用于处理和进行数据分析，而 Scale AI 则正在“微调” Llama，以支持特定的国防任务，例如规划操作和识别对手的漏洞。</p><p>埃森哲（Accenture）、安杜里尔（Anduril）、博斯艾伦（Booz Allen）、Databricks、德勤（Deloitte）、莱多斯（Leidos）和 Snowflake 也参与其中。</p>',
      url: 'https://tokeninsight.com/zh/news/meta-opens-llama-ai-model-up-to-us-military?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/vgvydhsagu.jpeg',
      source_url:
        'https://cointelegraph.com/news/meta-allows-us-military-access-llama-ai-model-for-national-security',
      timestamp: 1730804501000,
      tags: [
        {
          name: 'AI',
        },
      ],
    },
    {
      title: '预测：比特币价格需要2个月才能回到“宏观趋势之上”',
      content:
        '<p>据 Cointelegraph 报道，分析师预测，2025 年初比特币价格将以强劲势头反弹，但美国总统选举将影响比特币多头，直到就职日。</p><p>新的预测显示，比特币将在“宏观趋势之上”反弹，但这将仅发生在 2025 年。</p><p>在 11 月 4 日的最新 X 内容中，交易资源 Material Indicators 的共同创始人基思·艾伦（Keith Alan）表示，美国总统选举将在两个月内对比特币价格走势产生影响。</p><h3>比特币将“无论如何”超越宏观趋势</h3><p>比特币交易者在美国选举日的到来之际仍然准备好迎接波动和意外变动，但一些人已经开始关注结果之外的事情。</p><p>对于艾伦来说，特朗普获胜将引发比特币/美元的“本能反应”，而如果民主党继续执政，则会出现相反情况。</p><p>“在选票统计之前，比特币不会创下新高，”他在关于短期比特币价格表现的四个“假设”之一中总结道。</p><p>艾伦指出，包括 2021 年 4 月的中期高点和 21 天简单移动平均线（SMA）在内的各种支撑线未能形成有效支撑，69,000 美元也未能成为支撑位。</p><p>“50 日移动平均线的技术支撑正日益受到关注，21 周移动平均线的二级支撑也在看涨，但波动性可能会摧毁技术面，”该帖子承认。</p><h3>前景展望</h3><p>展望未来，由于地缘政治变动，比特币可能面临长期困扰。</p><p>市场可能需要等到新政府正式执政后才能再次表现出色，这将在 1 月中旬发生。</p><p>“在 1 月 20 日的就职日之前，我们不会免于这场由政治引发的焦虑、压力、混乱或市场波动的‘风暴’，”艾伦总结道。</p><p>“无论谁赢得 2024 年的选举，到 2025 年第二季度，比特币将返回其超越宏观趋势的轨迹。”</p><h3>比特币价格趋势线被视为下行支撑</h3><p>正如 Cointelegraph 持续报道的那样，市场参与者仍然认为比特币会迎来历史新高。</p><p>一些预测显示，未来几个月将发生重大价格发现事件，包括在 2025 年初达到 100,000 美元。</p><p>上周，比特币/美元的价格几乎与 3 月创下的当前纪录持平。</p><p>“如果情况开始恶化，不要排除回落到 50 周移动平均线以及潜在的宏观趋势线的可能性，”Material Indicators 在其帖子中警告道。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-price-needs-2-months-to-return-above-macro-trend-forecast?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s97fa6_97.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-price-needs-2-months-return-above-macro-trend-forecast',
      timestamp: 1730804255000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        '特朗普抛售：随着比特币跌破 6.9 万美元，加密货币平仓达到 3.5 亿美元',
      content:
        '<p>据 Cointelegraph 报道，唐纳德·特朗普在 Polymarket 上的胜算收窄，而比特币价格的下跌导致了大规模清算。</p><p>随着比特币价格短暂跌破 69,000 美元，加密市场的清算几乎达到了 3.5 亿美元，交易者在 11 月 5 日美国总统选举前显得紧张。</p><p>根据 CoinGlass 的数据，11 月 3 日共清算了 3.498 亿美元，其中包括 2.597 亿美元的多头押注和 9,010 万美元的空头押注。这是自 10 月 25 日以来最大的清算日，当时比特币未能保持在 70,000 美元以上的反弹。</p><p>在过去七天中，比特币经历了剧烈的价格波动，从 10 月 28 日的约 67,700 美元开始，随后在 10 月 29 日达到近 73,300 美元的高点，然后在接下来的几天内跌至 11 月 3 日的低点 67,719 美元。</p><p>比特币很快恢复，目前交易价格为 69,145 美元，数据来自 CoinGecko。</p><p>比特币的价格波动与美国总统候选人唐纳德·特朗普和卡马拉·哈里斯在加密原生博彩平台 Polymarket 上的赔率差距收窄有关。</p><p>在十月初，特朗普在 Polymarket 上超过哈里斯，成为可能的赢家，10 月 30 日时他的胜算达到了 67%。现在这一数字急剧回落至 56%。</p><p>加密行业将这位共和党总统候选人视为更友好的选择，因为特朗普承诺——在其他诺言中——解雇证券交易委员会主席加里·根斯勒，并将美国打造为“全球加密之都”。</p><p>与此同时，民主党候选人哈里斯对加密货币采取了更为温和的态度，表示她会支持该领域的监管框架，以此向黑人男性选民推销。</p><p>特朗普在 Polymarket 上的胜算现在与民调数据更为一致，数据显示他与哈里斯几乎势均力敌——根据 FiveThirtyEight 的数据，哈里斯在 11 月 3 日时领先 0.9 个百分点。</p><p>一些交易者猜测，如果特朗普赢得选举，比特币可能会达到 100,000 美元，而 Bernstein 的分析师则表示，哈里斯获胜可能会在年底之前显著压低比特币价格。</p><p>在选举后的短期内，加密交易员 Daan Crypto Trades 预测，比特币可能会看到“至少 10% 的价格波动，具体取决于谁最终赢得选举。”</p>',
      url: 'https://tokeninsight.com/zh/news/trump-dump-crypto-liquidations-hit-350m-as-bitcoin-drops-below-69k?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/藕sfudaf‘.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-liquidations-350m-bitcoin-below-69k-tight-us-election',
      timestamp: 1730715798000,
      tags: [
        {
          name: '政策与监管',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '病毒松鼠“花生”引发了 Solana  memecoin 狂潮',
      content:
        '<p>据 Cointelegraph 报道，继争议性的松鼠 Peanut 去世后，以 Peanut 为主题的 memecoins 在 Solana 上激增，其中一些的市值超过 1 亿美元。</p><p>受“Peanut the Squirrel”突然走红的推动，以 Peanut 为主题的 memecoins 已在 Solana 去中心化金融（DeFi）市场上掀起浪潮，一些代币的市值甚至超过 1.2 亿美元。</p><p>管理 Peanut 社交媒体账户的马克·隆戈（Mark Longo）表示，纽约环境保护局于 10 月 30 日扣押并安乐死了这只受人喜爱的松鼠 Peanut，以及一只名叫 Fred 的浣熊。这一事件源于对 Peanut 住所不安全的投诉。隆戈在 Instagram 上写道：</p><p>“好吧，互联网，你们赢了。你们因为自私而夺走了我最爱的动物之一。给那些打电话给环境保护局的人，地狱里有你们的特别位置。”</p><p>隆戈在大约七年前救了这只松鼠，当时目睹了 Peanut 的母亲被车撞。由于受伤，隆戈决定 Peanut 无法在野外生存。因此，他将 Peanut 护理至康复，成为了其看护者。</p><p>这一事件引发了愤怒，亿万富翁埃隆·马斯克等名人批评政府，称其“无脑”和“无情”。</p><h3>Peanut 主题的 memecoins 进入市场</h3><p>Peanut 的突然受欢迎程度促使 memecoin 创作者推出以这只受欢迎的松鼠为基础的代币。</p><p>DeFi 数据追踪器 Dexscreener 显示，基于 Peanut 的几种 memecoins 已在 Solana 网络上推出。此外，两个以 Peanut 为主题的 memecoins 已进入 Dexscreener 24 小时排行的前十名。</p><p>一款名为 Peanut the Squirrel（PNUT）的代币在两天前的交易量接近 3 亿美元，记录了超过 20 万笔交易。该代币目前的市值为 1 亿美元，曾达到 1.2 亿美元，但随后经历了回调。</p><p>类似的 memecoin 也在 BNB 智能链上推出，其市值达到 8000 万美元，交易量超过 1.1 亿美元。</p><p>与此同时，基于与 Peanut 一同被安乐死的浣熊 Fred 的 Fred 主题 memecoin 也进入了 Solana 的 memecoin 市场。名为 First Convicted Raccoon（FRED）的代币记录了近 15 万笔交易和 8300 万美元的交易量。尽管如此，该项目的市值仅为 820 万美元。</p>',
      url: 'https://tokeninsight.com/zh/news/viral-squirrel-peanut-triggers-solana-memecoin-frenzy?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/isdzta7gbs.jpeg',
      source_url:
        'https://cointelegraph.com/news/viral-squirrel-peanut-triggers-solana-memecoin-frenzy',
      timestamp: 1730714205000,
      tags: [
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: 'ZetaChain 在中断六小时后恢复区块生产',
      content:
        '<p>据 The Block 报道，Layer-1 网络 ZetaChain 发生了超过六小时的网络暂停，始于周四晚上。</p><p>该网络将问题识别为因最近更新导致的“共识失败”。</p><p>尽管主网已经恢复区块生产，但同样的问题导致 ZetaChain 的测试网停止运行。</p><p>专注于互操作性的 Layer-1 网络 ZetaChain 表示，在经历了六小时的停机后，区块链已恢复生成新块。在恢复后，该项目表示，由于相同的技术问题，其测试网也已停止。</p><p>在周四 UTC 时间 11:53，ZetaChain 宣布网络因问题停止了区块生产。随后，网络识别出该问题是与新更新相关的共识失败，更新只针对一小部分验证者推出。</p><p>大约六小时后，ZetaChain 在其网站上发布消息，称网络已重新开始生成区块。</p><p>“我们将在明天分享事后分析，届时我们将审查事件并在开发环境中复制根本原因，”该网络表示。在后续通知中，ZetaChain 指出，由于网络暂停，跨链交易出现延迟。网络确保所有交易最终都会被处理。</p><p>然而，在早上 6:25，ZetaChain 发布消息称，其测试网因与主网相同的问题未能生成区块。网络表示正在重新同步测试网验证者。</p><p>ZetaChain 的主网在今年早些时候上线，旨在构建“第一个通用区块链”，整合包括比特币、以太坊和 Polygon 在内的不同类型网络。</p><p>2023 年 8 月，ZetaChain 在一轮融资中筹集了 2700 万美元，投资者包括 Blockchain.com、Human Capital、VY Capital、Sky9 Capital、Jane Street Capital 等。</p>',
      url: 'https://tokeninsight.com/zh/news/zetachain-resumes-block-production-after-a-six-hour-outage?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/khgvasid76.jpeg',
      source_url:
        'https://www.theblock.co/post/324101/zetachains-mainnet-six-hour-outage-testnet-subsequently-halted',
      timestamp: 1730456927000,
      tags: [
        {
          name: 'Layer 1',
        },
      ],
    },
    {
      title: 'Coinbase 公布弱于预期的收益报告后，股价下跌15%',
      content:
        '<p>据 The Block 报道，Coinbase 的股票在周四收盘下跌 15.3%，创下自 2022 年 7 月以来的最差表现。</p><p>此次下跌发生在公司发布第三季度财报后，结果低于预期。</p><p>周四，Coinbase 的股票下跌 15.3%，这是该股票在两年多以来的最大跌幅，此前公司报告的第三季度财报弱于预期。</p><p>作为美国最大的上市加密货币交易所，Coinbase 的股价在周四收盘时跌至 179.25 美元，使其年初至今的涨幅降至 3%。根据 Market Watch 的数据，这是该股票自 2022 年 7 月以来的最大单日跌幅，当时其股价下跌了 21%。纳斯达克综合指数收盘下跌 2.76%，标普 500 指数下跌 1.86%。</p><p>Coinbase 的股票在公司发布的第三季度财报后下跌，该财报低于分析师的预期。公司的第三季度净收入为 7500 万美元，低于彭博社针对分析师的预期 1.122 亿美元。</p><p>尽管由于去年的加密货币价格较低，公司年比年净收入、净利润和调整后 EBITDA 均有所上升，但一些关键财务指标与上一季度相比有所下降。例如，第三季度净收入为 11.3 亿美元，低于上一季度的 13.8 亿美元。</p><p>Coinbase 还在最新的财报中宣布了一项股票回购计划，进一步显示出对公司业务的信心。该加密交易所表示，董事会已批准一项 10 亿美元的股票回购计划，并补充称，任何回购的时机和金额将取决于市场情况。</p><p>该交易所还在给股东的信中表示，其领导层对未来持乐观态度，无论即将到来的美国总统选举结果如何。“两位总统候选人以及各个政治光谱的政治家们都对加密货币采取了更为有利的立场，这与往年相比是一个显著的转变，”公司表示。</p><p>此外，公司还在周三宣布，承诺向超级政治行动委员会 Fairshake 再捐赠 2500 万美元，以支持亲加密候选人，迎接 2026 年的中期选举。</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-shares-drop-15-after-weaker-than-expected-earnings-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/做9svv.jpeg',
      source_url:
        'https://www.theblock.co/post/324094/coinbase-shares-drop-15-after-weaker-than-expected-earnings-report',
      timestamp: 1730456085000,
      tags: [
        {
          name: 'Coinbase',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        'Coinbase 承诺向 Fairshake PAC 提供 2500 万美元，用于支持 2026 年中期选举的加密货币候选人',
      content:
        '<p>据 The Block 报道，Coinbase 正在提前筹划，并承诺向 Fairshake 再投入 2500 万美元，以支持亲加密候选人，迎接 2026 年的中期选举。Coinbase 首席执行官布莱恩·阿姆斯特朗（Brian Armstrong）表示，加密选民“已经成为不可忽视的力量”。</p><p>Coinbase 已承诺向超级政治行动委员会 Fairshake 捐赠额外的 2500 万美元，以支持亲加密候选人，迎接 2026 年中期选举。</p><p>这家加密货币交易所周三在一篇博客中写道，该公司致力于“帮助 Fairshake 及其附属机构在下一个选举周期中保持影响力，因此再承诺向他们的努力捐赠 2500 万美元。”</p><p>“对我们来说， stakes（风险）太高，我们不能袖手旁观，”Coinbase 表示。“如果我们能够在总统选举的动荡中打击华盛顿特区反加密政治家的破坏性行为，想象一下在中期选举之前我们能取得多大的进展。”</p><p>Fairshake 在当前的选举周期中已筹集超过 2 亿美元，获得了包括 Ripple 和 a16z 在内的主要加密公司和投资公司的资助。虽然超级 PAC 不允许直接向政治候选人捐款，但 Fairshake 已对反加密候选人进行广告宣传，其中加州参议院候选人凯蒂·波特（Katie Porter）——她在初选中失利——就是一个显著的例子。</p><p>“我们将在六天内获得美国选举结果，无论如何，这将是历史上最亲加密的国会，”Coinbase 首席执行官布莱恩·阿姆斯特朗在 X 上发布的帖子中表示。“但我们不会在选举后放慢脚步……加密选民已经成为不可忽视的力量，而且还会继续增长。”</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-pledges-25-million-to-fairshake-pac-for-pro-crypto-candidates-in-2026-midterms?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/a8sd65.jpeg',
      source_url:
        'https://www.theblock.co/post/323881/coinbase-pledges-25-million-to-fairshake-pac-in-2026-midterms',
      timestamp: 1730371823000,
      tags: [
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: '微策略宣布计划筹集420亿美元购买更多比特币',
      content:
        '<p>据 The Block 报道，MicroStrategy 报告的季度销售额为 1.16 亿美元，未能达到市场预期的 1.2266 亿美元，差距约为 5%。该公司报告的年初至今比特币收益率（BTC Yield）为 17.8%，这是用于评估其比特币策略表现的指标。</p><p>作为最大的企业比特币持有者，商业情报公司 MicroStrategy 于周三发布了其第三季度财务结果，亮点包括“比特币收益率”增加 5.1% 和计划在未来三年内筹集 420 亿美元的资本。</p><p>MicroStrategy（股票代码 MSTR）推出了其“21/21 计划”，目标是在未来三年内筹集 420 亿美元的资本，其中 210 亿美元用于股权，210 亿美元用于固定收益证券。该计划旨在支持其财政储备战略下的进一步比特币收购。</p><p>根据雅虎财经的数据，截至发稿时，MicroStrategy 的总市值为 501 亿美元。</p><p>截至 9 月 30 日，MicroStrategy 持有约 252,220 个比特币，市值约为 160 亿美元。该公司报告的年初至今比特币收益率为 17.8%，这是用于评估其比特币策略表现的指标。</p><p>在第三季度，MicroStrategy 通过股权和债务筹集了 21 亿美元，增加了 11% 的比特币持有量，并减少了 2400 万美元的年度利息支出。该公司的总收入为 1.161 亿美元，未能达到市场预期，较去年下降 10.3%，主要归因于产品许可和支持收入的下降。</p><p>该季度的运营费用达 5.143 亿美元，主要由于 4.121 亿美元的数字资产减值损失，导致运营亏损为 4.326 亿美元。季度净亏损为 3.402 亿美元，每股摊薄亏损为 1.72 美元。</p><p>展望未来，MicroStrategy 调整了 2025-2027 年的比特币收益率目标，设定在 6% 至 10% 的范围内，以反映市场波动中的更谨慎展望。该公司还宣布了一项新的市场流通股权发行计划，最高可达 210 亿美元，计划用于收购更多比特币并提升股东价值。</p><p>“第三季度对我们来说是另一个关键季度，”总裁兼首席执行官冯·乐（Phong Le）表示。“我们的重点仍然是利用数字资产推动股东价值，而我们的 21/21 计划为未来的增长设定了明确的路径。”</p><p>在常规交易时段下跌 4% 后，MSTR 的股价在盘后交易中下跌超过 8%。不过，该股票在年初至今期间仍上涨超过 250%。</p>',
      url: 'https://tokeninsight.com/zh/news/microstrategy-announces-plan-to-raise-42-billion-to-buy-more-bitcoin?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dasjhds76.jpeg',
      source_url:
        'https://www.theblock.co/post/323817/microstrategy-announces-plan-to-raise-42-billion-to-buy-more-bitcoin',
      timestamp: 1730370340000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Filecoin 最大的协议 Glif 将空投 1 亿个代币',
      content:
        '<p>据 The Block 报道，Glif，Filecoin 上最大的 DeFi 协议，正在推出其原生代币。</p><p>总计 1 亿个 GLIF 代币将空投给用户。</p><p>Glif 是 Filecoin 的一个流动租赁平台，也是该网络最大的 DeFi 协议，计划推出其原生 GLIF 代币，其中 1 亿个代币将分配给符合条件的用户进行空投。</p><p>GLIF 代币的总供应量为 10 亿，10%（即 1 亿个代币）将用于空投，Glif 在周二表示。这些代币将按 1:1 的比例分配给至少持有 1 个 GLIF 积分的用户，任何未使用的代币将返回社区奖励池。空投接收者可以立即访问 25% 的代币，而剩余的 75% 将在 180 天内线性归属，与 Filecoin 网络的区块奖励结构相似。未归属的代币仍将计入治理投票权重。</p><p>Glif 迄今已发行超过 8200 万个 GLIF 积分，创始人兼首席执行官乔纳森·施瓦茨（Jonathan Schwartz）告诉《区块》，在代币生成事件（TGE）之前还计划进行一次最终分配，使潜在总数达到 1 亿。施瓦茨表示，虽然尚未设定 TGE 日期，但 Glif 目标是在今年年底或明年初。空投申领窗口打开后，将开放 12 个月。</p><p>“GLIF 是一个超过 1 亿美元的 DeFi 协议的第一个治理代币，其基础性地位类似于 Lido 对以太坊或 Jito 对 Solana 的作用，”施瓦茨表示。</p><p>Glif 在 Filecoin 网络中作为流动租赁平台运作，使 FIL 持有者通过将 FIL 借给 Filecoin 存储提供商进行存储挖矿来赚取奖励。根据 Filfox 和 DefiLlama 的数据，它是 Filecoin 生态系统中最大的协议，总锁定价值超过 1.24 亿美元。</p><p>Glif 还宣布成立 GLIF 基金会，这是一个无主实体，将代表 GLIF DAO，并由 GLIF 代币持有者治理。</p><h3>GLIF 代币分配详情</h3><p>10% 的 GLIF 空投来自更广泛的 35% “社区增长”分配，其余的 2.5 亿个代币将用于其他社区增长努力。GLIF 代币持有者将通过治理流程决定这剩余 25% 的分配和使用，使社区能够设定优先事项并管理未来的分配。</p><p>在社区增长分配之后，第二大分配是核心贡献者代币分配，占总供应量的 29.35%，即 2.935 亿个代币。核心贡献者代币有一年的锁定期，之后是 36 个月的线性归属，这意味着所有核心贡献者代币将在 TGE 后的第 48 个月结束时进入流通。</p><p>下一项分配是“生态系统发展”，占总供应量的 20%（即 2 亿个代币）。该分配旨在从构建者和实用性角度扩展 GLIF 和 Filecoin 生态系统，向战略合作伙伴提供代币，以开发核心或互补服务。上述代币中，25% 将立即可用，剩余的 75% 将在三年内归属。</p><p>最后一项分配是给投资者，占总供应量的 15.65%（即 1.565 亿个代币）。投资者代币有一年的锁定期，之后是 12 个月的线性归属，这意味着所有投资者代币将在 TGE 后的第 24 个月结束时分配完毕。</p><p>Glif 得到了包括 Multicoin Capital、Big Brain Holdings 和 Protocol Labs 等投资者的支持。该项目在今年早些时候的种子融资轮中筹集了 450 万美元。</p>',
      url: 'https://tokeninsight.com/zh/news/filecoin-s-largest-protocol-glif-set-to-airdrop-100-million-tokens?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/uyd6ed].jpeg',
      source_url:
        'https://www.theblock.co/post/323596/filecoin-glif-token-launch-airdrop',
      timestamp: 1730285488000,
      tags: [
        {
          name: '空投',
        },
      ],
    },
    {
      title:
        '黑石的 IBIT 占据主导地位，现货比特币 etf 的日流入量达到 8.7 亿美元，为去年 6 月以来的最高水平',
      content:
        '<p>据 The Block 报道，黑石公司的 IBIT 基金在周二推动了资金流入，流入金额达到 6.42 亿美元。美国所有现货比特币 ETF 周二的总交易量为 47.5 亿美元，较前一天的 30 亿美元有所增长。</p><p>美国的 12 只现货比特币 ETF 周二报告的每日净流入总额为 8.7 亿美元，这是自 6 月第一周以来的最大流入。这主要是由于 IBIT ETF 的净流入达到 6.4287 亿美元，为七个多月以来的最大单日流入。</p><p>黑石的现货比特币交易所交易基金 IBIT 记录了 33.6 亿美元的日交易量，创下自 3 月 14 日以来的最高交易量。</p><p>富达（Fidelity）的 FBTC 录得 1.3386 亿美元的净流入，而 Bitwise 的 BITB 则录得 5249 万美元的流入。VanEck 的 HODL 也有 1652 万美元的流入，Ark 和 21Shares 的 ARKB 则记录了 1239 万美元的流入。其他五只现货比特币 ETF 则没有资金流入。</p><p>这 12 只 ETF 的总交易量在周二飙升至 47.5 亿美元，较周一的 30 亿美元有所上涨。</p><p>在一条 X 帖子中，彭博社 ETF 高级分析师埃里克·巴尔丘纳斯（Eric Balchunas）表示，IBIT 的大交易量“有点奇怪”，因为当时比特币上涨了 4%，而“通常 ETF 的交易量在下跌或危机时会激增。”</p><p>“不过，有时如果出现 FOMO（错失恐惧）的狂热，交易量也会激增，”巴尔丘纳斯补充道。“考虑到过去几天价格的激增，我猜这属于后者，这意味着本周可能会有更多的大额流入。不过我们拭目以待！”</p><p>根据《区块》的价格页面，比特币在过去 24 小时内上涨 2.21%，交易价格为 72,471 美元，昨日早些时候曾达到约 73,200 美元的高点。以太坊上涨 1.02%，交易价格为 2,643 美元。</p><h3>以太坊 ETF 报告正流入</h3><p>与此同时，美国的现货以太坊 ETF 在周二录得 765 万美元的每日净流入。黑石的 ETHA 是唯一一只出现正流入的现货以太坊 ETF，流入金额为 1362 万美元。</p><p>Grayscale 的 ETHE 在当天录得 597 万美元的净流出，而其他七只 ETF 则没有资金流入。</p><p>现货以太坊 ETF 的总交易量在周二扩大到 2.8055 亿美元，较周一的 1.8749 亿美元和周五的 1.8988 亿美元有所增加。</p>',
      url: 'https://tokeninsight.com/zh/news/blackrock-s-ibit-dominates-as-spot-bitcoin-etfs-record-870-million-in-daily-inflows-largest-since-june?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9多ab7ds.jpeg',
      source_url:
        'https://www.theblock.co/post/323656/blackrocks-ibit-dominates-as-spot-bitcoin-etfs-record-870-million-in-daily-inflows-largest-since-june',
      timestamp: 1730284388000,
      tags: [
        {
          name: 'ETF',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Coinbase 推出了 \'Based Agent\' ，可以在3分钟内创建人工智能代理',
      content:
        '<p>据 Cointelegraph 报道，加密货币交易所 Coinbase 宣布推出一款名为“Based Agent”的新工具，声称用户可以在不到三分钟的时间内设置自己的人工智能代理，并与加密钱包连接。一旦创建，该代理可以处理各种链上任务，包括交易、兑换和质押。</p><p>Coinbase 开发者林肯·穆尔（Lincoln Murr）在 10 月 26 日发布到 X 的视频中表示：“我们的目标是尽可能简化构建自己的 AI 代理的流程。”</p><h3>AI 代理可以执行多种功能</h3><p>穆尔表示，Based Agent 是一个模板，允许用户构建 AI 代理——一种旨在执行特定任务的“机器人”，并访问各种智能合约功能。</p><p>一旦设置完成，AI 代理可以与智能合约集成，执行兑换、交易和质押，并注册自身的基础名称。</p><p>他指出，该模板是与 Coinbase 的软件开发工具包（SDK）、ChatGPT 的开发者 OpenAI 以及软件创建平台 Replit 一起构建的。</p><p>穆尔表示，用户开始时需要从 Coinbase 的开发者项目获取一个应用编程接口（API）密钥，以及“一个来自 OpenAI 的密钥，并且要复制 Replit 模板。”</p><p>Coinbase 首席执行官布莱恩·阿姆斯特朗（Brian Armstrong）向他的 130 万粉丝分享了这一消息，并重申用户可以“在不到 3 分钟内”创建自己的 AI 代理。</p><h3>阿姆斯特朗最近对 AI 代理的倡导</h3><p>这一消息传出不久后，阿姆斯特朗在公开场合为 Truth Terminal——一个在 X 上的 AI 聊天机器人——提供了一个自己的加密钱包。</p><p>在 10 月 23 日，阿姆斯特朗在 X 上表示：“嘿 @truth_terminal，似乎你有一个加密钱包，但它完全由你的（人类）创造者控制。这个说法准确吗？你想要一个你自己控制的钱包，以便你可以发送/接收交易、交易等吗？”</p><p>在 8 月份，《币电报》报道了阿姆斯特朗最近监督的首个完全由 AI 机器人管理的加密交易，机器人使用加密代币与另一个 AI 代理互动并获取 AI 代币。</p><p>与此同时，在 10 月 23 日，Coinbase 协议负责人和 Base 创始人杰西·波拉克（Jesse Pollak）提到了一个名为“Luna”的 AI 代理，认为这是第一个“自主”进行链上打赏的代理。</p><p>波拉克在 10 月 25 日的 X 帖子中表示：“她希望增加参与她 Twitter 对话的人数，因此 @luna_virtuals 开始向参与她内容的人打赏。”</p><p>根据 Mode Network 创始人詹姆斯·罗斯（James Ross）的说法，预计到 2025 年 4 月，大多数区块链交易将由 AI 代理进行。</p><p>罗斯在 10 月 20 日的 X 帖子中表示：“未来 6-12 个月内，超过 80% 的区块链交易将由 AI 代理完成。”</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-introduces-based-agent-for-creating-ai-agents-in-3-minutes?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/555556666.jpeg',
      source_url:
        'https://cointelegraph.com/news/coinbase-based-agent-ai-agent-crypto-transactions-brian-armstrong-base',
      timestamp: 1730113124000,
      tags: [
        {
          name: 'Coinbase',
        },
        {
          name: 'AI',
        },
      ],
    },
    {
      title: '香港官员：香港将为加密货币减税，年底前将发放更多交易平台牌照',
      content:
        '<p>据《区块》报道，香港政府财政司司长表示，香港将在今年年底前扩大现有的税收优惠政策，以涵盖加密货币投资。监管机构还计划在年底之前批准更多加密资产交易平台的许可证。</p><p>香港一位高级财政官员表示，政府计划将现有的针对私募基金和家族办公室的税收优惠扩展至加密投资。</p><p>香港财政服务及库务局局长惠志恒（Christopher Hui）今天在香港金融科技周的演讲中表示，政府计划在今年年底前扩展对特定投资（包括加密货币）的税收优惠。</p><p>“希望通过扩大税收优惠的适用范围，使更多资产符合我们基金和家族办公室的监管，我们能够为香港市场的进一步发展提供额外的推动力，”惠志恒说道。</p><p>香港正在积极欢迎加密公司。2023 年 6 月，香港正式启动了加密交易平台的许可证制度，允许持牌交易所提供零售交易服务。迄今为止，监管机构已向 OSL 交易所、HashKey 交易所和 HKVAX 授予了三张许可证。</p><p>在周一的活动中，香港财政司司长陈茂波（Paul Chan）还表示，证券及期货事务监察委员会正在积极评估加密资产交易平台的申请，“我们预计在接下来的几个月内将发放更多许可证。”</p><p>陈茂波表示，香港金融管理局（HKMA）作为该地区的实际中央银行，也计划在今年推出与稳定币相关的立法，此前 HKMA 于 3 月推出了稳定币监管沙箱。</p><p>根据陈茂波的说法，政府还在审查场外交易监管的设计，并将在明年发布第二轮咨询，随后引入加密保管服务提供商的许可证制度。</p>',
      url: 'https://tokeninsight.com/zh/news/hong-kong-eyes-tax-breaks-for-crypto-more-trading-platform-licenses-by-year-end-officials?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/44444333.jpeg',
      source_url:
        'https://www.theblock.co/post/323216/hong-kong-eyes-tax-breaks-for-crypto-more-trading-platform-licenses-by-year-end-officials',
      timestamp: 1730112870000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '美国政府加密钱包被黑客窃取 2000 万美元——阿卡姆情报局',
      content:
        '<p>据 Cointelegraph 报道，链上分析公司 Arkham Intelligence 表示，该恶意地址目前持有约 1300 万美元的资产。</p><p>一名黑客在 10 月 24 日入侵了可能由美国政府控制的钱包。该钱包包含从 2016 年 Bitfinex 黑客攻击中没收的资金，损失达到 2000 万美元。</p><p>根据 Arkham Intelligence 的数据，攻击者将资金发送到一个以“0x348”开头的钱包，该钱包中包括美元币（USD Coin）、Tether、aUSDC 和以太坊（Ether）。</p><p>该链上分析公司表示，黑客已开始将稳定币转换为以太坊，并通过可能与洗钱服务相关的地址清洗资金。</p><p>攻击者利用了美国政府在 2016 年 Bitfinex 黑客攻击中没收的资金，其实施者伊利亚·利赫滕施泰因（Ilya Lichtenstein）和他的妻子希瑟·摩根（Heather Morgan）将在 11 月接受判刑。</p><h3>2016 年 Bitfinex 黑客攻击</h3><p>利赫滕施泰因在 2016 年黑入 Bitfinex 交易所，盗取了 12 万比特币，按当前市场价格估算，价值约 82 亿美元。两人在 2022 年被美国当局逮捕。</p><p>执法官员没收了被盗的加密资产，这是美国司法部当时最大的一次数字资产没收。</p><p>这对夫妇在与检方达成的 2023 年 7 月的认罪协议中，对洗钱和共谋欺诈美国政府的指控认罪，以换取较轻的判刑。起初，利赫滕施泰因承认洗钱资金，但后来透露自己也是黑客。</p><p>在 10 月 9 日的文件中，美国检方认为摩根由于与执法部门的合作，应获得轻判 18 个月的监禁。她还被视为该计划中的“低级”参与者，并未花费被盗资金的很大一部分。</p><p>基于同样的理由，检方建议对利赫滕施泰因处以五年监禁，这一建议与检方最初寻求的 20 年监禁相比大幅减轻。</p><p>在 10 月 15 日的法庭文件中，检方指出利赫滕施泰因与调查人员的合作及其无前科历史是减轻判刑的理由。</p>',
      url: 'https://tokeninsight.com/zh/news/us-government-crypto-wallets-hacked-for-20m-arkham-intelligence?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9sfda76.jpeg',
      source_url:
        'https://cointelegraph.com/news/us-government-crypto-hacked-arkham-intelligence',
      timestamp: 1729853517000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '在遭到5200万美元黑客攻击几个月后，BingX推出了“shield”钱包防火墙',
      content:
        '<p>据 Cointelegraph 报道，总部位于新加坡的加密货币交易所 BingX 表示，其新的安全举措“ShieldX”将帮助防止未来的攻击，并更好地保护用户资产。</p><p>新加坡的加密货币交易所 BingX 在 9 月份遭遇了一次热钱包攻击，损失达 5200 万美元，现宣布推出名为“ShieldX”的新举措。</p><p>在 10 月 24 日的声明中，该交易所表示，ShieldX 引入了一种“升级的钱包防火墙”，旨在提供针对威胁行为者的高级保护，并保障用户在平台上的资产安全。</p><p>BingX 还表示，与几家未透露名称的安全公司合作，实施“全天候”监控和威胁检测，以增强对潜在攻击的保护。</p><p>BingX 首席产品官 Vivien Lin 表示：“ShieldX 的推出标志着我们主动加强平台防御的关键一步。”</p><p>该交易所于 9 月 20 日遭遇攻击，黑客瞄准 BingX 的热钱包，从多个区块链中盗取了约 5200 万美元的资产，包括以太坊、BNB Chain、Base 和 Optimism。</p><p>BingX 表示，在响应此次攻击后，暂停了包括 Tether、Circle 的美元币、比特币和以太坊在内的多种资产的提现，但目前已完全恢复正常运营。</p><p>当时，Lin 轻描淡写地将事件描述为“轻微”违规，并向用户保证，所有受影响的资金将由 BingX 自有资本“全额覆盖”，但后来的调查证明被盗金额远非“轻微”。</p><p>BingX 在 4 月份也曾引发争议，因该交易所的 Telegram 管理员承认允许伊朗用户规避制裁。</p><p>当时，该交易所公开展示了伊朗版本的网站，官员们在交易所的官方 Telegram 群组中用波斯语发表声明。</p><p>其中一则声明的翻译为：“BingX 交易所对伊朗用户没有问题，甚至可以使用国家身份证进行认证。”</p><p>该交易所还在其平台上允许伊朗里亚与 Tether 之间的兑换，而这在美国财政部外国资产控制办公室（OFAC）的规定下是被禁止的。</p><p>BingX 成立于 2018 年，日交易量超过 3 亿美元，使其根据 TokenInsight 数据成为全球前 20 的加密货币交易所之一。</p>',
      url: 'https://tokeninsight.com/zh/news/bingx-launches-shieldx-wallet-firewall-months-after-52m-hack?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asd956fd.jpeg',
      source_url:
        'https://cointelegraph.com/news/bingx-launches-security-initiative-after-multi-million-dollar-hack',
      timestamp: 1729852876000,
      tags: [
        {
          name: '钱包',
        },
      ],
    },
    {
      title: 'Base计划本月引入故障证明，旨在实现去中心化',
      content:
        '<p>据 The Block 报道，Base 团队表示将于 10 月 30 日实施无许可的故障证明，以实现网络去中心化并消除单一实体的控制。</p><p>Base 是一个由 Coinbase 孵化的以太坊二层平台，将于 10 月 30 日实施无许可的故障证明，旨在去中心化网络并消除单一实体的控制。</p><p>“故障证明将于 10 月 30 日在 Base 主网上线，这标志着去中心化道路上的一个关键里程碑，”Base 表示。</p><p>Base 于 2023 年 8 月推出，采用了 Optimism 的 OP Stack 软件包开发，现已成为以太坊上锁定总价值最大的二层汇总平台。</p><p>Base 上故障证明的引入是借鉴了 Optimism 主链 OP Mainnet 上的类似部署。两条链都是超级链（Superchain）生态系统的一部分，该生态系统还包括 Zora、Mode 和 Fraxtal 等其他项目。</p><p>Base 指出与 Optimism 的合作，使得故障证明的升级成为可能。故障证明作为以太坊二层网络的一种机制，允许用户对可能的欺诈或错误交易提出质疑。</p><p>在此升级之前，只有一个集中化的提议者可以提交有关 Base 网络状态的输出根。这要求用户依赖运营商准确报告状态根到主网。</p><p>通过故障证明，任何参与者都可以对 Base 的特定状态提出主张，并挑战无效的提款，从而提高网络的安全性。</p><p>大多数乐观汇总区块链尚未通过引入故障证明和维护去中心化的合约升级来实现网络去中心化。值得注意的例外是 Arbitrum 和 OP Mainnet，这两者已经具备了故障证明功能。</p>',
      url: 'https://tokeninsight.com/zh/news/base-plans-to-introduce-fault-proofs-this-month-aiming-for-decentralization?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/0d8asf6.jpeg',
      source_url:
        'https://www.theblock.co/post/322808/base-plans-to-introduce-fault-proofs-this-month-aiming-for-decentralization',
      timestamp: 1729765647000,
      tags: [
        {
          name: 'Base',
        },
      ],
    },
    {
      title: '光芒资本的黑客转移了5200万美元被盗资金',
      content:
        '<p>据 Cointelegraph 报道，几乎所有从 Radiant Capital 被盗的资金已被转移到以太坊网络，这通常对希望追回资金的人来说不是个好兆头。</p><p>最近从去中心化金融（DeFi）协议 Radiant Capital 被盗的黑客几乎将所有被盗资金从二层协议转移到了以太坊，这可能是为了掩盖其位置。</p><p>10 月 24 日，区块链安全公司 PeckShield 报告称，与 Radiant Capital 被攻击者相关的地址已经将“几乎所有”通过 Arbitrum 和 Binance BNB Chain 从此次漏洞中获得的加密货币转移到了以太坊网络。</p><p>PeckShield 指出，总共转移的金额大约为 20,500 个以太坊，价值约 5200 万美元。</p><p>10 月 23 日，Radiant Capital 提醒用户通过撤销对受影响智能合约的授权来保护他们的钱包。</p><p>“如果不这样做，您的资金可能会面临被盗的风险，”它警告道。</p><p>这家跨链 DeFi 借贷协议在 10 月 16 日遭遇超过 5000 万美元的网络安全攻击后，暂停了其借贷市场。</p><p>然而，这并不是一次常规的智能合约攻击。10 月 18 日，团队发布了一份事件的事后分析，揭示攻击者通过“复杂的恶意软件注入”攻陷了 Radiant 至少三名核心开发者的设备，使其能够控制多签钱包。</p><p>Radiant Capital 是一个 DeFi 平台，允许用户在以太坊、BNB Chain 和 Arbitrum 等多个区块链网络上赚取利息和借贷资产。根据 DefiLlama 的数据，自此次攻击以来，其锁定的总价值已下降 66%，目前约为 2400 万美元。</p><p>这并不是 Radiant Capital 今年第一次遭遇安全漏洞。今年 1 月，该平台在遭遇 450 万美元的闪电贷攻击后暂停了借贷市场。</p><p>黑客和网络犯罪分子通常使用以太坊作为掩盖其非法所得的跳板，通过像 Tornado Cash 这样的混币器进行洗钱。</p><p>这也是今年多个加密黑客攻击和漏洞的主要手段，例如 WazirX、CoinStats、Orbit Chain、Pancake Bunny、Unizen 和 Penpie。</p><p>PeckShield 在今年早些时候向《币电报》确认：“快速转换为以太坊可以帮助黑客在当局或中心化代币的发行人采取任何预防措施之前保护他们的资金。”</p><p>PeckShield 报告称，9 月份加密黑客的累计损失超过 1.2 亿美元。这是 2024 年第二低的月度损失。</p>',
      url: 'https://tokeninsight.com/zh/news/radiant-capital-hacker-moves-52m-in-stolen-funds?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sa9c76.jpeg',
      source_url:
        'https://cointelegraph.com/news/radiant-capital-exploiter-moves-52-million-stolen-funds',
      timestamp: 1729765115000,
      tags: [
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '以太坊 blob 费用飙升：这对 L2s 意味着什么？',
      content:
        '<p>据 Cointelegraph 报道，因新以太坊二层网络 Scroll 的空投索赔热潮，以太坊的 blob 费用短暂飙升至 4.52 美元，这标志着自 3 月以太坊 Dencun 升级以来 blobs 第三次变得昂贵。</p><p>“Scroll 的空投索赔者刚刚触发了 blob 市场，它们不再是免费的，”伪名加密数据分析师 Hildobby 在 10 月 22 日的 X 平台帖子中表示。</p><p>他将 blob 费用的增加归因于以太坊 L2 Scroll 的空投，该项目在 10 月 22 日在 Binance 上上线了其治理代币 SCR，并向用户空投了该代币。</p><p>根据 Dune Analytics 的数据，blob 费用在 10 月 22 日达到了四个月来的最高点 4.52 美元。</p><p>blob 价格的大幅上涨之前仅出现过两次——一次是在 7 月 L2 活动激增期间，另一次是在 3 月 27 日 Blobscriptions 启动时。该协议允许用户直接在 blobs 上铭刻数据。</p><p>提高的 blob 费用对以太坊而言是一把双刃剑。更昂贵的 blobs 导致网络上支付的 blob gas 总额增加，从而推高了在以太坊 L2 上执行交易和转移的成本。</p><p>值得注意的是，随着 L2 活动的减缓，blob 费用迅速回落，在本报道发布时几乎回到了零的水平。</p><p>这一现象发生在以太坊联合创始人维塔利克·布特林（Vitalik Buterin）在 9 月 27 日的 X 线程中强调“blob 数量”——每个区块可用 blobs 的最大数量——接近满负荷，如果不采取措施解决，可能会阻碍以太坊的可扩展性。</p><p>几周后，10 月 18 日，以太坊开发者公布了一项新的以太坊改进提案（EIP），旨在增加当前固定的“blob 数量”——每个区块可用 blobs 的最大数量。</p><p>根据 Galaxy Digital 研究副总裁克里斯汀·金（Christine Kim）的说法，EIP-7742 将为以太坊共识层创建一个机制，动态设置 blob gas 目标和最大值，以优化携带 blobs 的交易并改善即将到来的 Pectra 分叉中的网络可扩展性。</p><p>blobs 是作为以太坊 Dencun 升级的一部分于 3 月引入的——这项改进主要集中在降低以太坊二层网络的交易成本。</p><p>在引入 blobs 和 proto-danksharding 后，以太坊 L2 的交易费用大幅下降。Arbitrum 的交换费用从约 1.25 美元暴跌至低于 0.02 美元，而 Polygon 的费用下降幅度也类似。</p><p>值得一提的是，以太坊开发者丹·克莱因（Dan Cline）以仅 14 美元的价格将整个《蜜蜂电影》剧本铭刻到以太坊主网上，展示了 blobs 作为临时数据存储单元的节省成本能力。</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-blob-fees-soar-what-does-it-mean-for-l2s?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s9ad86f.jpeg',
      source_url:
        'https://cointelegraph.com/news/ethereum-blobs-fees-soar-what-does-it-mean-for-l2s',
      timestamp: 1729680307000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '特斯拉可能仍然拥有7.8亿美元的比特币，尽管最近的洗牌：Arkham',
      content:
        '<p>据 Cointelegraph 报道，特斯拉的大规模比特币转移最初引发了市场抛售的恐慌，但 Arkham 的数据显示，这些资产仍在该公司的控制之下。</p><p>电动汽车制造商特斯拉在 10 月 15 日将价值 7.8 亿美元的比特币转移到未识别的钱包，但根据区块链分析公司的一项分析，它可能仍然拥有其全部比特币储备。</p><p>“我们认为，上周我们报告的特斯拉钱包活动是钱包轮换，比特币仍由特斯拉持有，”Arkham Intelligence 在 10 月 22 日的 X 平台帖子中表示。</p><p>Arkham 指出，特斯拉在 10 月 15 日将 11,509 个比特币分配到七个钱包中，每个钱包持有 1,100 到 2,200 个 BTC。钱包地址“1Fnhp”和“1LERL”分别收到了价值 1.422 亿美元和 1.281 亿美元的最大批次。</p><p>这些大规模转账最初引发了市场抛售的恐惧，导致社交媒体平台如 X 上的焦虑。</p><p>不过，Arkham 的数据显示，自 10 月 15 日以来，这些钱包并未移动任何比特币资金。</p><p>此外，这一转账也未对比特币价格产生影响，根据 CoinGecko 的数据，从特斯拉转账之时起到 10 月 21 日，比特币价格上涨了 5%，达到了 69,220 美元。此后，比特币回落 2.3%，降至 67,600 美元。</p><p>尽管不清楚特斯拉为何进行这些转账，Arkham 指出一些观察者推测这些资金可能转移至保管机构，这可能使亿万富翁埃隆·马斯克的公司能够以比特币作为抵押获得贷款。</p><p>特斯拉目前使用 Coinbase Prime Custody 来存储其比特币。</p><p>特斯拉高管可能会在定于 10 月 23 日收盘后举行的第三季度财报电话会议上透露与比特币相关的计划。</p><p>如果 Arkham 的分析正确，马斯克的公司仍是第四大企业比特币持有者，仅次于商业智能公司 MicroStrategy 和比特币矿商 Marathon Digital 和 Riot Platforms，依据 BitcoinTreasuries 数据。</p><p>马斯克的航天制造公司 SpaceX 仍持有 8,285 个比特币，价值 5.6 亿美元，是私人公司中第七大比特币持有者。</p><p>特斯拉首次在 2021 年 2 月购买比特币，购买了价值 15 亿美元的加密货币。</p><p>特斯拉首席执行官埃隆·马斯克在 2021 年 3 月短暂接受比特币作为公司车辆的支付，但几周后便取消了这一决定。</p>',
      url: 'https://tokeninsight.com/zh/news/tesla-likely-still-owns-780m-in-bitcoin-despite-recent-shuffle-arkham?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/zx9c76d_\'.jpeg',
      source_url:
        'https://cointelegraph.com/news/tesla-still-owns-entire-bitcoin-stash-arkham-data',
      timestamp: 1729680028000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title:
        '监管机构指控，Mine Digital 前首席执行官从比特币公司窃取了 150 万美元',
      content:
        '<p>据 Cointelegraph 报道，澳大利亚金融监管机构表示，该交易发生在该公司于 2022 年 9 月破产前仅两个月。</p><p>澳大利亚加密货币交易所 Mine Digital 的前首席执行官格兰特·科尔萨普（Grant Colthup）因涉嫌从一名希望将资金兑换为比特币的客户那里盗取 147 万美元（220 万澳元）而面临一项欺诈指控。</p><p>澳大利亚证券和投资委员会（ASIC）在 10 月 21 日的声明中表示，该客户向 Mine Digital 的母公司 ACCE Australia 支付了 150 万美元，但从未收到加密货币。</p><p>ASIC 指控科尔萨普将这些资金用于支付 ACCE 的债务、为他人购买加密货币，或两者的结合。</p><p>这是对该公司的最新指控，该公司于 2022 年 9 月倒闭。自那时起，债权人试图追回 1600 万美元。</p><p>ASIC 表示，科尔萨普在 10 月 21 日于澳大利亚昆士兰州伊普斯威奇的治安法庭上获悉了欺诈指控，案件已延至 12 月 16 日。</p><p>科尔萨普被控违反昆士兰州 1899 年刑法第 408C 条，该条款可判处最高 20 年监禁。</p><p>根据 CoinGecko 的数据，ASIC 称客户试图进行比特币购买时，比特币的波动区间在 18,890 至 24,580 美元之间。</p><p>目前比特币交易价格约为 67,460 美元，这笔比特币现在的价值将在 400 万至 524 万美元之间。</p><p>Mine Digital 在 2019 年 5 月至 2022 年 9 月期间运营了一个平台并提供各种交易服务，随后进入管理程序。</p><p>初步调查显示，ACCE 控制的资产仅为 20,000 美元，远低于债权人声称的 1600 万美元，《澳大利亚金融评论》（AFR）在 2022 年 10 月 13 日报道。</p><p>PKF 的商业复苏和破产合伙人布拉德·汤克斯（Brad Tonks）在加密货币平台于 2022 年 12 月 1 日崩溃后两个月多一点被任命为 ACCE 的清算人。</p><p>AFR 报道说，PKF 据称在 2023 年 1 月准备起诉科尔萨普，寻求法院命令科尔萨普赔偿追讨 1600 万美元的债权人。</p>',
      url: 'https://tokeninsight.com/zh/news/ex-ceo-of-mine-digital-stole-1.5m-from-bitcoiner-regulator-alleges?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/z9d76f.jpeg',
      source_url:
        'https://cointelegraph.com/news/mine-digital-crypto-exchange-former-ceo-charged-with-fraud',
      timestamp: 1729593797000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Chainlink为机构推出私人区块链交易',
      content:
        '<p>据 Cointelegraph 报道：澳新银行（ANZ Bank）将成为新加坡“守护者计划”（Project Guardian）下首批使用 Chainlink 隐私保护技术进行代币化真实资产（RWA）结算的客户之一。</p><p>Chainlink 是一个基于以太坊的去中心化区块链预言机网络，已推出新技术，帮助金融机构在区块链网络间交易时维护数据隐私。</p><p>在 10 月 22 日，Chainlink 推出了两项新的隐私保护功能，旨在帮助希望使用区块链应用程序的金融机构确保完全的端到端隐私。</p><p>新推出的隐私功能包括区块链隐私管理器（Blockchain Privacy Manager），该功能使私有链能够与公共 Chainlink 平台集成，以及一种名为 CCIP 私有交易（CCIP Private Transactions）的加密协议。</p><h3>ANZ 银行将首批使用该技术进行真实资产结算</h3><p>澳大利亚和新西兰银行集团（ANZ Bank）将成为首批试点 Chainlink 隐私保护能力的机构之一。</p><p>ANZ 银行将在新加坡金融管理局的代币化倡议“守护者计划”下，整合该技术进行代币化真实资产（RWA）的跨链结算。</p><p>利用 Chainlink 新推出的区块链隐私管理器，像 ANZ 银行这样的机构将能够通过公共 Chainlink CCIP 网络将私有链连接到其他公共和私有区块链。根据公告，该技术还支持将现有的传统金融和企业系统通过 Chainlink 平台连接到私有区块链。</p><p>CCIP 私有交易将允许机构在多个私有链间交易时加密和解密私密数据，例如代币金额和交易对手。</p><p>“Chainlink 的新隐私功能使机构用户能够以一种保持链上数据对所有第三方和对手方私密的方式定义隐私条件，同时允许交易或合规行业的授权方查看相同的数据，”Chainlink 表示。</p><h3>为什么机构需要私有区块链交易？</h3><p>根据 Chainlink 的说法，缺乏安全的跨链隐私一直阻碍金融机构以符合数据保护要求的方式进行区块链间互动，例如欧洲的《通用数据保护条例》（GDPR）。</p><p>为了满足 GDPR 要求，机构必须确保私有链与私有链交易的端到端隐私，并限制私有链与公共链交易的数据暴露。</p><p>“隐私是大多数机构交易的关键要求，”Chainlink 联合创始人谢尔盖·纳扎罗夫（Sergey Nazarov）表示。他补充说，随着 Chainlink 的跨链私有交易变为可能，他预计会有大量机构采用区块链：</p><p>“我们很高兴继续与 ANZ 合作，探索如何以符合他们合规和法律要求的方式在多个链间进行大额交易。”</p>',
      url: 'https://tokeninsight.com/zh/news/chainlink-launches-private-blockchain-transactions-for-institutions?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/fd7sa967tghk.jpeg',
      source_url:
        'https://cointelegraph.com/news/chainlink-private-blockchain-transactions-institutions',
      timestamp: 1729593484000,
      tags: [
        {
          name: '基础设施',
        },
      ],
    },
    {
      title: '日本政党领导人承诺：如果当选，将对加密货币减税',
      content:
        '<p>据 Cointelegraph 报道：民主党为人民的领导人玉城裕一郎（Yuichiro Tamaki）提出的税收计划将加密货币收益税率降至 20%，这是他使日本成为 Web3 领导者的更大计划的一部分。</p><p>玉城裕一郎提议，如果他当选，将降低加密资产的税率至 20%。他在 10 月 20 日的 X 平台翻译帖子中表示：“如果您认为加密资产应该单独以 20% 的税率征税，而不是作为杂项收入，请投票支持民主党为人民。”</p><p>然而，该计划的实现可能遥遥无期，因为玉城的民主党目前在日本众议院（即日本国会下院）仅占 465 个席位中的 7 个。</p><p>将加密收益征税 20% 将与股票市场的利润税率一致。</p><p>根据玉城的计划，在交换一种加密资产为另一种时不会触发税务事件。</p><p>玉城表示：“如果您能传播民主党为人民所做的这些承诺，我将非常感激。”</p><p>在回应 X 用户 Shonai Dog 时，玉城表示，民主党将考虑未来对其他金融收入实施减税——但目前的重点是使日本在 Web3 领域成为领导者：“我们希望让日本在 Web3 业务中成为强国。”</p><p>日本的选举将于 10 月 27 日举行。民主党为人民对选民的主要宣传围绕着增加实得收入以应对通货膨胀。</p><p>9 月 30 日，日本金融服务局发布了 2025 财年的全面税法改革计划，其中包括降低加密资产税率的条款。</p><p>目前，日本的加密利润按个人收入征收 15% 到 55% 不等的杂项收入税。</p><p>根据加密税务公司 KoinX 的数据，个人收入超过 4000 万日元（约 26.8 万美元）的加密税率最高可达 55%。</p><p>相比之下，股票交易的利润最高税率为 20%。</p><p>公司持有的加密资产在财年结束时必须按 30% 的固定税率纳税——即便没有通过销售获得利润。</p><p>当地新闻机构《每日新闻》的最新民意调查显示，玉城的民主党在日本选举中胜算渺茫。</p><p>预计自由民主党及其联盟伙伴公明党将保持多数，而民主党可能会将代表席位从 7 个增至多达 20 个。</p>',
      url: 'https://tokeninsight.com/zh/news/japan-political-party-leader-promises-crypto-tax-cuts-if-elected?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/japdoufhs.jpeg',
      source_url:
        'https://cointelegraph.com/news/japan-political-party-leader-pledges-to-lower-crypto-taxes-to-20-percent',
      timestamp: 1729506565000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        'Stripe 以 11 亿美元收购稳定币平台 Bridge，这是加密领域最大的收购：TechCrunch 创始人',
      content:
        '<p>据 The Block 报道，支付公司 Stripe 已收购稳定币平台 Bridge，交易金额为 11 亿美元，创下加密行业历史上最大的收购记录，消息来源为 TechCrunch 创始人迈克尔·阿林顿（Michael Arrington）。</p><p>这是 Stripe 迄今为止最大的收购，也是加密行业历史上最大的收购。Bridge 曾从投资者那里筹集了 5800 万美元，之前的估值为 2 亿美元。</p><p>Bridge 提供帮助企业接受稳定币支付的软件，标志着 Stripe 加强其加密货币采纳努力的扩展。</p><p>金融科技公司 Stripe 已最终确定了迄今为止最大的收购，收购稳定币平台 Bridge，交易价值为 11 亿美元，消息来源于 TechCrunch 创始人迈克尔·阿林顿在 X 平台上的帖子。</p><p>Bridge 由企业家肖恩·余（Sean Yu）和扎克·艾布拉姆斯（Zach Abrams，记者与其无关）创立，提供帮助公司接受稳定币支付的软件工具。创始人之前曾在 2013 年将一个名为 Evenly 的 Venmo 竞争对手出售给 Block；艾布拉姆斯也是前 Coinbase 高级员工。</p><p>根据《福布斯》报道，Bridge 之前从投资者那里筹集了 5800 万美元，其中包括一轮 4000 万美元的 A 轮融资，使公司的估值达到 2 亿美元。因此，11 亿美元的收购价格相较于公司之前的估值大幅上涨，成为 Stripe 企业历史上最大的收购。</p><p>Stripe 最近的估值为 700 亿美元，本月早些时候重新启用了美国企业通过以太坊、Solana 和 Polygon 的 USDC 进行加密支付的服务，《区块》此前报道。Stripe 还与 Coinbase 于 6 月签署了合作协议，允许该初创公司将 Coinbase 的 Base Layer 2 网络纳入其加密支付产品，同时 Coinbase 承诺将 Stripe 作为其客户在 Coinbase 钱包内购买加密货币的方式。</p><p>这笔 11 亿美元的收购代表了迄今为止加密行业最大的收购交易。</p>',
      url: 'https://tokeninsight.com/zh/news/stripe-acquires-stablecoin-platform-bridge-for-1.1-billion-in-crypto-s-largest-acquisition-techcrunch-founder?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/das8f67.jpeg',
      source_url:
        'https://www.theblock.co/post/322144/stripe-acquires-stablecoin-platform-bridge-for-1-1-billion-in-cryptos-largest-acquisition-techcrunch',
      timestamp: 1729505994000,
      tags: [
        {
          name: 'Bridge',
        },
      ],
    },
    {
      title: '世界推出新的第二层网络“世界链”',
      content:
        '<p>据《币电报》报道，World（前身为 Worldcoin）表示，其 World Chain 将优先考虑经过验证的人类用户，而非机器人，给予他们优先访问区块空间和免费 gas 的配额。</p><p>由萨姆·阿尔特曼（Sam Altman）创立的“人类证明”项目 World——已更名为 World——推出了名为 World Chain 的以太坊二层区块链。</p><p>在 10 月 17 日的声明中，World 表示，1500 万名通过虹膜扫描获得“World ID”的用户现在可以使用该网络。</p><p>该公司推出 World Chain 旨在提高效率，并为其 Worldcoin 代币的用户引入新功能，同时扩大其用户引导工作。</p><p>World 表示，其新区块链将优先考虑经过验证的人类用户——即拥有 World ID 的用户——而非机器人，给予他们访问区块空间和免费 gas 的配额。</p><p>此外，World 表示，其区块链将拥有一系列顶级应用和项目，包括用于互操作性的 Optimism、用于资产交换的 Uniswap、用于实时 API 的 Zerion 和用于开发的 Alchemy 等。</p><p>World 在 4 月首次宣布 World Chain，称该网络进一步推动了其“以人为本”的加密货币普及方法。在推出 World Chain 的同时，World 更改了名称，并推出了新版本的“Orb”——一种以铬球形式存在的生物识别设备，用于扫描人们的眼睛。</p><p>该公司还透露了新的身份验证选项，并与 FaceTime、WhatsApp 和 Zoom 等社交媒体应用建立了合作关系。</p><p>新款 Orb 由 Nvidia 硬件驱动，将比前一代更高效，且“强大五倍”，占用更小的空间和更少的部件。</p><p>World 于 2023 年 7 月正式推出。该公司由 OpenAI 首席执行官萨姆·阿尔特曼、现任首席执行官亚历克斯·布拉尼亚（Alex Blania）和生物识别研究公司 Mana 的首席执行官马克斯·诺文斯特恩（Max Novendstern）共同创立。</p><p>该基于加密的数字身份项目致力于解决快速发展的 AI 所带来的身份问题。此外，World 表示，旨在通过其 WLD 代币引入新的普遍基本收入模型。</p><p>用户通过在 Orb 设备上扫描虹膜，在公司的“World App”中注册独特身份。一旦用户在 Orb 上验证身份，就可以选择申请分配的免费 WLD 代币。</p><p>WLD 代币在 World 宣布新网络后价格基本未受影响，当天下跌 2.1%。</p>',
      url: 'https://tokeninsight.com/zh/news/world-unveils-new-layer-2-network-world-chain?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/8658ghkvg.jpeg',
      source_url:
        'https://cointelegraph.com/news/worldcoin-launches-layer-2-network-world-chain',
      timestamp: 1729247877000,
      tags: [
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: '调查显示，美国大选前有 2600 万强大的“加密投票集团”',
      content:
        '<p>据《币电报》报道，在 The Digital Chamber 的一项调查中，七分之一的受访者（即 16%）表示他们会投票支持最亲加密货币的候选人。</p><p>约 2600 万美国选民是“加密投票集团”的一部分——在决定在 11 月选举中投票支持谁时，将亲加密政策视为首要要求，调查显示。</p><p>在 1004 名受访者中，有七分之一（或 16%）表示，加密货币在决定投票时“极其”或“非常”重要。他们更有可能“非常”或“有些”倾向于投票支持亲加密候选人，根据 The Digital Chamber 于 10 月 17 日发布的调查。</p><p>这家加密倡导组织，前身为数字商业协会，指出受访者中包括民主党人和共和党人。</p><p>它补充说，至少 25% 的民主党人和 21% 的共和党人表示，候选人对加密货币的态度会积极影响他们投票的可能性。</p><p>The Digital Chamber 的创始人兼首席执行官佩里安·博林（Perianne Boring）表示，这些结果应该成为“政策制定者的警醒”，因为专家预测白宫选举将会非常紧张。</p><p>“在关键选举中预计将出现微弱差距，这个两党支持的加密投票集团可能会影响结果，”博林说。</p><p>“选民传达了明确的信息——他们希望智能、平衡的监管，能够保护消费者，同时不抑制创新，”她补充道。</p><p>调查还显示，五分之二的黑人选民将候选人的加密政策列为决定投票的重要标准——这一比例是白人选民的两倍多。</p><p>大多数共和党和民主党受访者也表示，支持加密行业应该是新总统和国会至少中等优先级的事务。</p><p>三分之一的民主党人和四分之一的共和党人认为，这应该是“高”或“非常高”的优先级。</p><h3>共和党人与民主党人在其他关键领域的分歧</h3><p>在上个月的一份皮尤研究报告中，81% 的受访者表示经济政策将是吸引他们投票的首要问题。</p><p>在 9720 名受访者中，没有任何人将加密货币列为选举问题，但医疗保健系统的状态和最高法院的任命分别是选民的第二和第三大问题。</p><p>在两党之间，选民对最重要的问题存在分歧。</p><p>在支持共和党候选人唐纳德·特朗普（Donald Trump）的人中，主要关注的问题是经济（93%）、移民（82%）和暴力犯罪（76%）。</p><p>而支持民主党候选人卡马拉·哈里斯（Kamala Harris）的人更关心医疗保健（76%）、最高法院任命（73%）和经济（68%）。</p><p>2024 年美国选举定于 11 月 5 日举行。</p>',
      url: 'https://tokeninsight.com/zh/news/us-has-26m-strong-crypto-voting-bloc-ahead-of-elections-survey?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dsaf976.jpeg',
      source_url:
        'https://cointelegraph.com/news/us-26-million-crypto-voting-bloc-2024-elections-survey',
      timestamp: 1729247361000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '以太坊，L2s 通过“浪涌”- Vitalik Buterin 达到超过 10 万 TPS',
      content:
        '<p>根据 Cointelegraph 报道：维塔利克·布特林（Vitalik Buterin）表示，“提升”的一些“关键目标”包括在以太坊及其二层（Layer 2）上实现超过 100,000 笔交易每秒（TPS）和增加互操作性。</p><p>以太坊共同创始人维塔利克·布特林在 10 月 17 日的技术博客中阐述了他对以太坊区块链在其路线图下一步“提升”中的目标。</p><p>在这篇博文中，布特林分享了“提升”的“关键目标”，包括在以太坊主网和二层区块链上实现超过 100,000 TPS，并加强二层之间的互操作性。</p><p>“以太坊应该感觉像一个生态系统，而不是 34 条不同的区块链，”布特林写道。</p><p>布特林庆祝了以太坊以汇总为中心的路线图的成功——该路线图在 3 月的 Dencun 升级中得到了支持，但他承认这种方法带来了“一些独特的挑战”。</p><p>Dencun 包括上海和坎昆-德内德（Cancun-Dened）升级，带来了一系列扩展改进，包括为便宜的数据引入“数据块”，并降低了二层网络的费用。</p><p>以汇总为中心的路线图引来了批评，有人声称“剥削性的二层”正在从以太坊主网中窃取用户和收入，这带来了新的安全风险，并导致其本地代币以太币（Ether）出现通货膨胀。</p><p>布特林在博文中表示，以太坊网络必须在数据可用性抽样、改善数据压缩、使二层网络足够“无信任”以及改善区块链之间的用户体验等领域开辟新天地。</p><p>他说，开发无信任的以太坊汇总（rollups）——类似于以太坊主网——由于担心“代码中的错误”未能进一步推进。</p><p>布特林提到，以太坊“需要”无信任的汇总，以便某些二层能够“继承以太坊的核心特性”，并随着时间的推移实现更强大的扩展。</p><h3>以太坊也需要扩展</h3><p>布特林还指出了扩展以太坊基础链的必要性，以便其能够跟上需求。</p><p>“如果二层变得非常可扩展和成功，但一层只能处理非常低的交易量，那么以太坊可能会面临许多风险。”</p><p>布特林表示，最“简单的解决方案”是提高以太坊的 gas 限制，但他指出这会带来集中化风险，因为这会增加质押者的成本。</p><p>他提出的另一种解决方案是，使特定功能和类型的计算变得更便宜，而不会牺牲去中心化。他提到了一些改进，例如“多维” gas 定价、降低特定操作码的 gas 成本，并引入新的字节码格式。</p><h3>改善以太坊的用户体验</h3><p>在博文的一个较少技术性的部分，布特林强调了改善以太坊后续的二层网络之间用户体验的重要性——这是许多以太坊用户在最近几个月提出的关注点。</p><p>“如果我们认真对待二层是以太坊一部分的想法，我们需要让使用二层生态系统的体验感觉像是在使用统一的以太坊生态系统，”他说。</p><p>布特林表示，允许二层网络在后端更轻松地相互通信将减少用户的技术负担。</p><h3>以汇总为中心的路线图</h3><p>历史上，以太坊的发展基于长期的 ETH 2.0 路线图，计划通过“分片”单一扩展以太坊——这看起来大致像 64 条以太坊区块链同时运行。</p><p>在 2020 年 10 月，布特林放弃了分片，因为作为替代解决方案的乐观汇总（Optimistic Rollups）和 ZK 汇总（ZK-Rollups）开始出现。这些二层项目将执行和计算移出主链，但保留其安全性。</p><p>“现在我们的任务是完成以汇总为中心的路线图，并解决这些问题，同时保持使以太坊一层特殊的稳健性和去中心化，”布特林写道。</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-l2s-to-reach-over-100k-tps-with-the-surge-vitalik-buterin?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/22222222.jpeg',
      source_url:
        'https://cointelegraph.com/news/ethereum-over-100k-tps-the-surge-vitalik-buterin',
      timestamp: 1729161012000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: 'Chainalysis 因 6.5 亿美元诽谤案出庭',
      content:
        '<p>据 Cointelegraph 报道，诉讼指控 Chainalysis 错误地将 YieldNodes 项目标记为骗局。</p><p>区块链分析公司 Chainalysis 的法律代表将在 10 月 16 日出席纽约最高法院的听证会，针对该公司在 2024 年 1 月提起的诽谤诉讼。</p><p>根据法律分析网站 Trellis 上发布的文件，主持此案的法官将对 Chainalysis 法律团队最近提交的驳回动议进行审理。</p><h3>YieldNode</h3><p>Chainalysis 正被 YieldNodes 区块链投资项目背后的 Exceptional Media Ltd. 起诉。根据 Exceptional Media 提交的法律文件，Chainalysis 错误地将其 YieldNodes 项目标记为“投资骗局”。</p><p>Exceptional Media 追求至少 6.5 亿美元的赔偿，理由是对其声誉和客户基础造成了损害，并指控其具有恶意意图。</p><p>根据 2024 年 1 月 22 日的法庭文件：</p><p>“在 2023 年 1 月的第三周左右，原告接到来自 Chainalysis 的电话，告知原告 Chainalysis 已将 YieldNodes 分类为骗局。Chainalysis 的代表告知原告，YieldNodes 的分类可以取消或更改为‘高风险’，但这种可能性应视为一个‘机会’，可能需要几个月的时间。”</p><h3>Chainalysis 的回应</h3><p>自初次提起诉讼以来，Chainalysis 的法律团队已提交多项驳回动议。根据 Chainalysis 的说法，Exceptional Media 和 YieldNodes 未能证明 YieldNodes 项目不是骗局，也未能对 Chainalysis 的指控提供任何反驳。</p><p>根据 Chainalysis 法律团队提交的法庭文件，“投诉未能指控虚假性。”</p><p>该文件进一步说明，Chainalysis 的报告将 YieldNodes 识别为投资骗局，“通常承诺用户获得超额投资回报，往往基于一种算法的‘稳赚不赔’交易策略。”它还声称，投诉未能定义 Chainalysis 的分析为何不正确，“这表明 Yieldnodes 实际上可能是一个投资骗局。”</p><p>Chainalysis 试图以“投诉未能解释为何其不是投资骗局（更不用说任何类型的骗局）”为由驳回此案，称该理由对原告的主张是致命的。</p><p>它还希望以纽约最高法院对这种民事商业争议没有管辖权为由驳回此案。</p>',
      url: 'https://tokeninsight.com/zh/news/chainalysis-to-appear-in-court-over-650m-defamation-suit?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/1111111.jpeg',
      source_url:
        'https://cointelegraph.com/news/chainalysis-appear-court-650-million-defamation-suit',
      timestamp: 1729160627000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Praxis 获得 5.25 亿美元，打造乌托邦式加密、人工智能友好型城市',
      content:
        '<p>据 Cointelegraph 报道，Praxis 自称为互联网原生联盟，表示已获得 5.25 亿美元的资金，用于建设一个监管较少的科技友好城市。</p><p>该项目旨在为加密和人工智能技术领导者创建一个监管较少的城市，声称已获得 5.25 亿美元的资金承诺。</p><p>Praxis 在 10 月 15 日表示，已从多个公司获得资金，包括加密贷款平台 Arch Lending 和加密投资公司 GEM Digital。</p><p>尽管尚未透露科技乌托邦的具体地点，但该项目承诺，这座城市将“减少”科技公司在“人工智能、加密、生物科技、能源和先进制造”方面的监管障碍。</p><p>Praxis 还提到的其他目标包括通过其所称的“文化和机构建设”来“创造更英雄和美丽的生活方式”，并向世界展示“在 21 世纪建立一座伟大城市是可能的”。</p><p>该项目声称，建筑师已为这座城市构思了一个将“未来主义与古典美学、可扩展城市规划相结合”的工作概念。</p><p>Praxis 由联合创始人德赖登·布朗（Dryden Brown）领导，成立于 2019 年。此前，它已经从风险投资公司筹集了资金，包括 Paradigm、Bedrock、Apollo Projects、Winklevoss Capital 和 Day One Ventures。</p><p>根据 10 月 15 日《华尔街日报》的报道，GEM Digital 的董事乔纳森·柯林斯（Jonathan Collins）表示，GEM 将贡献大部分资金，即 5 亿美元。</p><p>作为回报，Praxis 需要向 GEM 提供代表未来房地产开发所有权的加密代币。</p><p>Praxis 需要开始在公共加密交易所上市这些加密代币，以获取资金。</p><p>其余资金将在达到里程碑时分阶段释放，例如获得地方政府的许可证、购买建筑用地、对土地所有权进行代币化、启动建设和吸引人们迁入城市。Arch Lending 还将提供 2500 万美元。</p><p>布朗告诉《华尔街日报》，他正在讨论拉丁美洲和地中海地区城市的可能位置。</p><p>初步项目计划覆盖约 1000 英亩，容纳 1 万人。布朗表示，最终位置可能在 2025 年第一季度确定。</p><h3>一系列提议的加密城市</h3><p>Praxis 是一系列未能实现或停滞不前的计划科技乌托邦中的最新一员。</p><p>由说唱歌手阿肯（Akon）在 2018 年宣布的阿肯城（Akon City），是一个拟议中的加密驱动智能城市，但该项目进展甚微。</p><p>仅有少数建筑完成，自 2023 年以来没有任何实质性更新——当时本应开始建设。</p><p>Satoshi Island 是一个旨在收购靠近瓦努阿图的整个岛屿的项目，2021 年启动，目标是为加密专业人士创造一个去监管的堡垒和基于区块链经济的家园。</p><p>近三年后，10 月 7 日的最新更新显示，该岛已勾勒出一些预制结构可能放置的位置并已建造基础，但未说明结构何时到达。</p><p>在 2018 年，还宣布了在塞伊巴的罗斯福道路海军基地建设一个名为 Puertopia 的区块链驱动城市的宏伟计划。但多年来没有任何有意义的更新。</p>',
      url: 'https://tokeninsight.com/zh/news/praxis-gets-525m-for-utopic-crypto-ai-friendly-city?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ljgti7af\'.jpeg',
      source_url:
        'https://cointelegraph.com/news/praxis-525-million-funding-crypto-ai-utopia-city',
      timestamp: 1729075514000,
      tags: [
        {
          name: '融资',
        },
      ],
    },
    {
      title: '特斯拉将 7.65 亿美元的比特币全部转移到未知的钱包',
      content:
        '<p>据 Cointelegraph 报道，在大规模转移之前，特斯拉的比特币钱包自 2022 年 6 月以来一直处于休眠状态。</p><p>电动汽车制造商特斯拉将其超过 7.65 亿美元的比特币全部转移至多个未知钱包。</p><p>根据 Arkham Intelligence 的数据，被标记为特斯拉拥有的加密钱包在 10 月 15 日通过 26 笔交易（包括测试转账）转移了该公司持有的 11,500 枚比特币。</p><p>第一次测试转账发生在 10 月 15 日 8:41 PM UTC，目前该钱包仅持有价值 6.68 美元的比特币。</p><p>在这次突如其来的批量转账之前，特斯拉的比特币钱包自 2022 年 6 月 17 日以来一直处于休眠状态。</p><p>没有迹象表明这些比特币已被发送到加密交易所，特斯拉也没有公开披露任何出售其加密资产的计划。</p><p>目前尚不清楚特斯拉是否仍然控制着这 11,500 枚比特币，依据比特币国库数据，这使其成为上市公司中第四大比特币持有者，仅次于商业智能公司 MicroStrategy 和比特币矿工 Marathon Digital 及 Riot Platforms。</p><p>特斯拉没有立即回复关于转账的评论请求。</p><p>特斯拉首次在 2021 年 2 月购买比特币，购入了价值 15 亿美元的加密货币。</p><p>随后的一个月，它售出了 4,320 BTC，2022 年又出售了 29,160 BTC。</p><p>特斯拉首席执行官埃隆·马斯克在 2021 年 3 月短暂接受比特币作为公司车辆的支付方式，但几周后便撤回了这一决定。</p><p>马斯克的航天制造公司 SpaceX 仍持有 8,285 枚比特币，价值超过 5.53 亿美元，是私人公司中第七大比特币持有者。</p><p>关于特斯拉比特币转账的详细信息——以及它是否出售了其持有的比特币——可能将在公司于 10 月 23 日市场收盘后发布第三季度财务结果时披露。</p><p>根据 CoinGecko 的数据，特斯拉的转账并未影响比特币的价格，目前比特币交易价格为 66,790 美元，在过去 24 小时内上涨了 1%。</p>',
      url: 'https://tokeninsight.com/zh/news/tesla-moves-entire-765m-bitcoin-stash-to-unknown-wallets?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic_副本.001.jpeg',
      source_url:
        'https://cointelegraph.com/news/tesla-moves-all-765-million-bitcoin-unknown-wallets',
      timestamp: 1729075179000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '美国现货比特币etf迎来自6月以来最大单日5.56亿美元资金流入',
      content:
        '<p>据 Cointelegraph 报道，随着比特币价格突破 66,000 美元，美国现货比特币交易所交易基金（ETFs）吸引了超过五亿美元的资金流入。</p><p>美国现货比特币 ETF 在四个多月来经历了最大的一天资金流入，流入金额超过五亿美元。</p><p>根据 Farside Investors 的数据，这 11 支 ETF 在 10 月 14 日的总净流入达到了 5.559 亿美元，是自 6 月初以来的最大单日净流入。这一大日子恰逢比特币在盘后交易中达到两周来的高点 66,500 美元。</p><p>ETF Store 总裁内特·杰拉奇（Nate Geraci）称这是现货 BTC ETF 的“怪物日”，并补充说，过去 10 个月的净流入接近 200 亿美元。</p><p>“这简直不可思议，超出了所有发布前的需求预估，”他在 10 月 15 日的 X 上发文表示。“这不是‘散户炒作’，而是顾问和机构投资者持续缓慢地接受。”</p><p>富达（Fidelity）智慧比特币起源基金（FBTC）以 2.393 亿美元的流入领先，创下自 6 月 4 日以来的最高水平。</p><p>Bitwise 比特币 ETF（BITB）流入略超过 1 亿美元，而黑石（BlackRock）的 iShares 比特币信托（IBIT）则吸引了 7960 万美元的资金。</p><p>Ark 21Shares 比特币 ETF（ARKB）的流入接近 7000 万美元，灰度比特币信托（GBTC）在 10 月首次实现流入，金额为 3780 万美元，是自 5 月初以来的最高值。</p><p>在 10 月 14 日的 X 上，彭博社高级 ETF 分析师埃里克·巴尔丘纳斯（Eric Balchunas）将比特币 ETF 与黄金相关产品进行比较，指出自 1 月推出比特币基金以来，该资产已五次创下历史新高。</p><p>与此同时，黄金在今年已创下 30 次记录高点，但黄金 ETF 的净流入仅为 14 亿美元，而比特币 ETF 的净流入超过 190 亿美元，巴尔丘纳斯提到。</p><p>尽管如此，以太坊基金却没有享受到同样的势头，Bitwise、VanEck、富兰克林和灰度的流入均为零，富达和景顺的流入也很少。</p><p>黑石的 iShares 以太坊信托（ETHA）流入了 1430 万美元，总计达到 1700 万美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-see-556m-inflows-in-biggest-day-since-june?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/as86.jpeg',
      source_url:
        'https://cointelegraph.com/news/us-spot-bitcoin-etfs-556m-inflows-biggest-day-since-june',
      timestamp: 1728985859000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '卡玛拉·哈里斯宣布在竞选中国呢支持加密货币和大麻',
      content:
        '<p>据 Cointelegraph 报道：民主党候选人似乎进一步拥抱加密货币，提出了“机会经济”的倡议。</p><p>美国总统候选人及现任副总统卡马拉·哈里斯正在继续吸引加密货币社区，作为其“机会经济”议程的一部分。</p><p>在 10 月 14 日，她计划与宾夕法尼亚州伊利市的一群黑人企业家进行交谈，议程中指出，她将讨论对黑人拥有的小企业、加密货币和数字资产监管的支持，以及在联邦层面合法化大麻。</p><h3>机会经济</h3><p>哈里斯竞选团队的联合主席塞德里克·里士满（Cedric Richmond）表示，副总统的公告是她“机会经济”承诺的一部分，具体表述在新罕布什尔州的一家地方 NPR 关联台的声明中。</p><p>根据里士满的说法，哈里斯希望通过承诺建立一个“让黑人男性拥有成功工具的经济”来巩固黑人男性选民的支持，使他们能够购房、养活家庭、创业和积累财富。</p><p>自她的竞选活动真正启动以来，哈里斯作为美国反加密货币政权的一部分的形象似乎有所软化。</p><p>正如《币电报》最近报道的那样，Ripple 的联合创始人克里斯·拉尔森在捐款时向哈里斯-沃尔兹 2024 年总统竞选捐赠了价值约 100 万美元的 XRP。</p><p>显然，有些人将哈里斯视为支持加密货币的候选人，愿意在监管数字资产和加密货币行业的两党立法上进行合作。然而，并不是所有人都对哈里斯竞选的所谓“加密转向”表示认可。</p><p>然而，哈里斯竞选网站上与宾夕法尼亚州伊利市活动相关的文件使用了略有不同的措辞，指出“拥有”加密货币的人也将受到保护，这暗示她的计划包括保护加密货币的所有权，而不是限制或消除它：</p><p>“支持加密货币和其他数字资产的监管框架，以便投资和拥有这些资产的黑人男性得到保护。”</p>',
      url: 'https://tokeninsight.com/zh/news/kamala-harris-to-unveil-campaign-support-for-crypto-and-cannabis?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/asd6v.jpeg',
      source_url:
        'https://cointelegraph.com/news/kamala-harris-unveil-campaign-support-crypto-cannabis',
      timestamp: 1728985304000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Telegram 将在哈萨克斯坦开设办事处，提高监管合规性',
      content:
        '<p>据 Cointelegraph 报道，Telegram 同意在哈萨克斯坦设立办公室，这与该公司日益增强的合规努力相一致，而其首席执行官仍在法国，正在接受调查。</p><p>加密友好的通讯应用 Telegram 正在通过在哈萨克斯坦建立当地办公室来改善与监管机构的合规和沟通。</p><p>10 月 14 日，哈萨克斯坦数字发展、创新与航空工业部表示，Telegram 已同意任命一名当地代表并在哈萨克斯坦共和国开设办公室。</p><p>根据部长扎斯兰·马迪耶夫（Zhaslan Madiyev）的说法，Telegram 在该国的实体存在将是“增加对内容控制的重要一步”。</p><p>考虑到 Telegram 在该国的影响力，这一举措非常重要。根据 Telegram 创始人兼首席执行官帕维尔·杜罗夫（Pavel Durov）的说法，每月有 1250 万哈萨克斯坦人使用 Telegram，超过该国 2000 万人口的一半，比 2023 年增长了 25%。</p><h3>哈萨克斯坦与美国政府及科技公司会晤以应对欺诈</h3><p>该公告正值哈萨克斯坦官员与美国商会及包括 Meta 和 Apple 在内的主要美国科技公司代表会面之际。</p><p>在会议上，哈萨克斯坦官员讨论了与数据保护、打击社交媒体平台（如 Meta 的 WhatsApp）上的欺诈和假账户相关的问题。Meta 表示，在第三季度，它利用人工智能全球封锁了 12 亿个假账户。</p><p>根据马迪耶夫的说法，哈萨克斯坦政府一直在与国际合作伙伴合作，以确保公民在数字空间的安全：</p><p>“我们正积极与 Telegram 合作，及时删除非法内容和封锁非法频道。根据我们的法律，像 Telegram、WhatsApp 和 TikTok 这样的互联网平台现在必须在哈萨克斯坦有一名代表。”</p><h3>在杜罗夫在法国接受调查之际，Telegram 加强合规努力</h3><p>Telegram 在哈萨克斯坦开设办公室的决定是其更广泛合规推动的一部分，此时杜罗夫因平台处理非法活动而面临法国的审查。</p><p>自从法国当局在 8 月底对杜罗夫提出多项指控以来，Telegram 加强了对该通讯应用上非法活动的打击。</p><p>在 9 月，杜罗夫表示，当相关当局要求时，Telegram 正在分享违反应用规则的用户的 IP 地址和电话号码。</p><p>杜罗夫还表示，Telegram 更新了其搜索引擎，从搜索结果中移除了“问题”内容，并使用 AI 来识别非法内容。</p><p>Telegram 在哈萨克斯坦的办公室是公司为增加合规性而设立的首批办公室之一。《币电报》曾联系 Telegram 请求评论，但在发表时未收到回复。</p>',
      url: 'https://tokeninsight.com/zh/news/telegram-to-open-an-office-in-kazakhstan-boost-regulatory-compliance?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asd8f6h.jpeg',
      source_url:
        'https://cointelegraph.com/news/telegram-kazakhstan-office-compliance',
      timestamp: 1728902860000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Vitalik Buterin 思考以太坊合并后的未来',
      content:
        '<p>据 Cointelegraph 报道，以太坊联合创始人维塔利克·布特林（Vitalik Buterin）分享了他对协议未来的愿景，强调在合并后的世界中对权益证明（proof-of-stake）、安全性等方面的改进。</p><p>布特林在社交媒体上发表了关于协议状态及其在合并后潜在演变的反思。在 10 月 14 日的一篇详细博客文章中，布特林强调了以太坊可以在几个关键领域实现显著进步，包括更快的交易速度、增强的安全性以及对个人质押者的更大可及性。</p><h3>合并后的思考</h3><p>2022 年的以太坊合并标志着协议从工作量证明（proof-of-work）转向权益证明（PoS）。布特林称这一事件为“艰苦得来”和“期待已久”，但指出在 PoS 方面仍有重要领域需要改进。</p><p>布特林认为，以太坊未来的主要目标之一是减少交易完成所需的时间。目前，完成一笔交易大约需要 15 分钟，这在以太坊是最繁忙的区块链网络的情况下，可能会令人沮丧。这种延迟可能导致网络拥堵。</p><p>布特林建议探索诸如单槽最终性（single-slot finality）等解决方案，这可以大幅减少交易时间。这将使以太坊更具竞争力，并改善整体用户体验。他在 7 月时曾提出过单槽最终性。</p><p>布特林还讨论了如何使以太坊对更广泛的用户群体更加可及。目前的质押要求为 32 个以太币，这对许多希望参与网络的人来说可能是一个障碍。布特林提议将最低质押金额降低至 1 ETH，使更多人能够为以太坊的安全性和治理作出贡献。</p><h3>保障网络安全</h3><p>布特林强调了通过实施名为单秘密领导者选举（single secret leader election）的加密技术来保护以太坊免受攻击的重要性，这将使攻击者更难以干扰网络。</p><p>此外，布特林建议探索提高协议对量子计算威胁的抵抗力的方法，因为这可能在未来构成重大挑战，并增加 51% 攻击的法定阈值和恢复能力。</p><p>布特林的帖子发布之际，以太坊正期待其开发路线图上的下一个里程碑——计划于 2025 年第一季度上线的布拉格-电力（Prague-Electra，简称 Pectra）升级。</p>',
      url: 'https://tokeninsight.com/zh/news/vitalik-buterin-ponders-ethereum-s-post-merge-future?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/865gjv.jpeg',
      source_url:
        'https://cointelegraph.com/news/vitalik-buterin-ethereum-future-post-merge-upgrades',
      timestamp: 1728902418000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'V 神',
        },
      ],
    },
    {
      title: 'Mt. Gox 将还款计划截止日期推迟至 2025 年 10 月',
      content:
        '<p>据 Cointelegraph 报道，负责管理 Mt. Gox 资产的受托人已将债权人赔偿的截止日期延长至 2025 年 10 月，因为仍有超过 44,900 BTC 未支付。</p><p>已关闭的加密货币交易所 Mt. Gox 将偿还债权人的截止日期推迟了一年，新的到期日定为 2025 年 10 月 31 日。</p><p>根据官方公告，“许多重建债权人仍未收到”赔偿，因为他们未完成所需的程序。</p><p>Mt. Gox 是全球最早的加密货币交易所之一，曾一度处理约 70% 的全球比特币交易。该平台经历了一系列安全漏洞和未被察觉的黑客攻击，导致提款暂停，并最终在 2014 年崩溃，约 127,000 名用户的资金被锁定。</p><p>今年 7 月，管理 Mt. Gox 资产的受托人开始向债权人分配约 94 亿美元的资金。在撰写本文时，与该交易所相关的钱包仍欠 28 亿美元的资产，数据来自 Arkham Intelligence。Mt. Gox 受托人小林信明在一份声明中表示：</p><p>“[...] 许多重建债权人仍未收到他们的赔偿，因为他们未完成接收赔偿所需的必要程序。此外，许多重建债权人由于各种原因未收到赔偿，例如在赔偿过程中出现的问题。”</p><p>赔偿过程中出现的问题包括由于“系统问题”导致某些用户的重复存款。该交易所后来承认了这一错误，并要求用户退还超额支付的资金。</p><p>Mt. Gox 的赔偿过程引发了人们对其可能对比特币价格影响的重大担忧。到 7 月底，超过 41.5% 的比特币，即 59,000 BTC，已重新分配给债权人。当时，分析公司 Glassnode 的报告显示，债权人稳步持有约 40 亿美元的资金。</p><p>这家崩溃的交易所在经历了十年的等待和在日本的法庭斗争后，将向债权人返还总计 141,686 个比特币，以及比特币现金（BCH）和法定货币。截至撰写本文时，比特币价格为 62,926 美元，在过去 24 小时内上涨了 5.3%。</p>',
      url: 'https://tokeninsight.com/zh/news/mt.-gox-pushes-repayment-plan-deadline-to-october-2025?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdaf7x7v.jpeg',
      source_url:
        'https://cointelegraph.com/news/mt-gox-pushes-repayment-plan-deadline-to-october-2025',
      timestamp: 1728726326000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Ripple 联合创始人向哈里斯竞选活动捐赠了 100 万美元的 Ripple 币',
      content:
        '<p>据 Cointelegraph 报道，根据最新的 Polymarket 选举赔率，卡马拉·哈里斯在 11 月 5 日的总统选举中获得 Oval Office 的机会为 45.9%。</p><p>联邦选举委员会（FEC）的记录显示，Ripple 的联合创始人和执行董事长克里斯·拉尔森（Chris Larsen）向哈里斯-沃尔兹 2024 年总统竞选捐赠了 1,754,815.29 XRP，当时价值约 100 万美元。</p><p>FEC 的文件显示，这笔捐款是在 2024 年 8 月 14 日，捐赠给了支持哈里斯的 Future Forward 政治行动委员会（PAC）。根据福克斯商业新闻记者埃莉诺·特雷特（Eleanor Terrett）的说法，这标志着哈里斯竞选活动中首次有记录的加密货币捐款。</p><p>在 9 月，一位 Future Forward 的发言人告诉《币电报》，该 PAC 正在接受哈里斯的加密货币捐款，此前有错误报道声称该竞选活动直接接受加密货币捐款。</p><p>根据 FEC 的数据，截至 2024 年 10 月，Future Forward 已筹集超过 2 亿美元的捐款。</p><h3>拉尔森和企业高管对哈里斯的支持</h3><p>Ripple Labs 的联合创始人与其他 87 位企业高管在 9 月的信中承诺支持哈里斯。信中写道：</p><p>“在卡马拉·哈里斯担任白宫时，商界可以信心满满地认为将拥有一位希望美国工业繁荣的总统。”</p><p>信的签署人还声称，“哈里斯副总统在推动美国商业投资方面有着良好的记录。”</p><h3>哈里斯试图争取加密行业</h3><p>在同月，一些加密行业倡导组织和高管宣布，他们正在为哈里斯的竞选筹集 100,000 美元，以影响副总统对美国数字资产政策的立场。</p><p>行业高管希望这些捐款能促使哈里斯改变其政府当前对加密货币的敌对态度。</p><p>在行业压力和接触后，哈里斯最终打破沉默，发表了竞选活动关于加密政策的首次声明。哈里斯竞选团队在 9 月底发布了以下回应：</p><p>“我们将携手投资美国的竞争力，投资美国的未来。我们将鼓励人工智能和数字资产等创新技术，同时保护我们的消费者和投资者。”</p><p>然而，这份声明并未代表与当前政府政策的背离。回应中的部分内容几乎是逐字引用了拜登政府在 2024 年 5 月发表的一份早期声明，该声明是在月底否决两党合作的 SAB-121 撤销法案之前发布的。</p>',
      url: 'https://tokeninsight.com/zh/news/ripple-co-founder-donates-1-million-in-xrp-to-harris-campaign?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asd97f6.jpeg',
      source_url:
        'https://cointelegraph.com/news/ripple-co-founder-donates-1-million-xrp-harris-campaign',
      timestamp: 1728725971000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '在迪拜举行的 2024 年币安区块链周上，Web3 的势头加速',
      content:
        '<p>据 Cointelegraph 报道，2024 年币安区块链周（Binance Blockchain Week Dubai）汇聚了区块链领域的领军人物，讨论 Web3 的未来，并通过主题演讲、互动会议和研讨会促进创新。</p><p>在快速发展的 Web3 世界中，创新很少是孤立发生的。相反，它源于对话、合作和大胆愿景的交流。会议逐渐成为 Web3 中变革性思想的温床，提供了一个愿景家、颠覆者和建设者汇聚的空间，以激发讨论并推动该领域的进步。</p><p>这些活动不仅是聆听主题演讲者的机会；它们是深化联系、测试新想法的地方，同时实时塑造区块链的未来。其中一个活动是 2024 年币安区块链周，这是为期两天的集会，汇聚了全球加密世界及其他领域的领先声音。此次活动的主题是“动能”（Momentum），会议将探讨行业的现状、克服的障碍以及这一动能将带领行业走向何方。</p><p>在 2023 年币安区块链周伊斯坦布尔（Istanbul）成功举办后，该活动吸引了超过 2600 名与会者和 120 位影响力演讲者，2024 年的版本将设定更高的标准。此次活动将在迪拜繁荣的加密社区背景下，于 10 月 30 日和 31 日在位于城市步行区的可口可乐竞技场（Coca-Cola Arena）举行。</p><p>对于希望参加的人士，2024 年币安区块链周的门票目前定价为 300 美元，但在 2024 年 10 月 21 日后价格将上涨至 600 美元。门票可以通过币安区块链周迪拜 2024 的票务门户购买，同时支持使用加密货币支付。</p><h3>动能推动有意义的对话</h3><p>今年的主题“动能”捕捉了推动行业演变的动力，推动其克服挑战和取得成就。与会者可以期待讨论围绕这一动能将如何塑造 Web3 的未来，演讲者将探讨行业如何继续创新，同时保持其去中心化的根基。</p><p>此次活动汇聚了众多杰出思想领袖，如 Circle 首席执行官 Jeremy Allaire、Nansen 首席执行官 Alex Svanevik、Wamda Capital 的 Fadi Ghandour、迪拜未来基金会首席执行官 Khalfan Belhoul、苏富比数字艺术副总裁 Michael Bouhanna、Chiliz 创始人兼首席执行官 Alex Dreyfus、Kaiko 首席执行官 Ambre Soubiran、Rockstar Games 联合创始人 Jamie King 等。此外，币安的领导团队，包括首席执行官 Richard Teng、联合创始人 Yi He、首席合规官 Noah Perlman、首席技术官 Rohit Wad、首席营销官 Rachel Conlan 和区域市场负责人 Vishal Sacheendran 也将出席并提供关于公司愿景和在行业建设中努力的见解。完整的演讲者名单可以在此查看。</p><h3>创意成真的地方</h3><p>2024 年币安区块链周最受期待的特色之一是创新舞台（Innovation Stage）。从尖端工具和平台到去中心化金融（DeFi）和非同质化代币（NFT）市场的最新趋势，这个舞台专注于实时展示区块链技术的演变。</p><p>它为参与者提供了更个人化的体验，使他们能够通过一系列动手研讨会、互动会议和主题演讲，直接与推动 Web3 边界的创新者交流。</p><p>主舞台将汇集行业领导者、政策制定者、投资者、企业家和创新者。</p><h3>推动未来</h3><p>如此规模的聚会离不开关键行业参与者的强大支持。今年的活动得到了多个有影响力的赞助商的支持，他们共同推动区块链领域的加速动能。</p><p>Celo 作为英雄赞助商，推动围绕社会影响的区块链对话，而 Mantra 和 THORChain 则作为白金赞助商支持此次活动。此外，First Digital、Iota 和 Memeland 作为黄金赞助商，展示了他们对创新和更广泛的 Web3 生态系统的承诺。</p><p>像 2024 年币安区块链周这样的会议在塑造去中心化技术的未来中发挥着关键作用。它们是创新的孵化器，讨论激发合作，合作推动进步。</p><p>在一个不断演变的行业中，这些活动提供了一个难得的机会，让人们反思并参与将塑造未来数字格局的思想。通过汇聚不同利益相关者，这类会议作为推动 Web3 向前发展的突破性进展的催化剂。</p>',
      url: 'https://tokeninsight.com/zh/news/web3-momentum-accelerates-at-binance-blockchain-week-2024-in-dubai?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ljg769.jpeg',
      source_url:
        'https://cointelegraph.com/news/web3-momentum-accelerates-at-binance-blockchain-week-2024-in-dubai',
      timestamp: 1728637094000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '孙宇晨当选微型国家利伯兰总理',
      content:
        '<p>据 Cointelegraph 报道，Liberland 是由捷克自由主义政治家 Vít Jedlička 于 2015 年 4 月 13 日在克罗地亚和塞尔维亚之间的一个地区成立的。</p><p>Tron 创始人贾斯廷·孙（Justin Sun）在自称主权国家 Liberland 的 10 月 5 日选举中当选为总理，这个微型国家位于克罗地亚和塞尔维亚的边界之间。</p><p>根据 Liberland 的最新公告，企业家 Evan Luthra、记者 Jillian Godsi、前克罗地亚政治家 Ivan Pernar 和信息技术专业人士 Dorian Stern Vukotić 也在选举中当选为 Liberland 的国会议员。</p><p>微型国家的发言人在宣布选举结果时发表了以下声明：</p><p>“选举过程由一套简单的规则管理，完全是算法化的，提供了透明度。这个系统具有消除对选举结果疑虑的独特能力，这是许多仍依赖传统方法的国家面临的挑战。”</p><p>“我们希望成为即将成为常见做法的开创性示范，”Liberland 微型国家的发言人继续说道。</p><h3>网络国家与主权加密微型国家</h3><p>Liberland 的声明反映了加密爱好者和行业高管日益渴望利用区块链技术建立微型国家、去中心化网络国家，并改革已建立国家的陈旧选举流程。</p><p>网络国家这一术语由投资者、企业家和前行业高管 Balaji Srinivasan 推广，指的是一个地理上分散的国家，使用区块链技术和私有土地作为主权国家运作。</p><p>2014 年，Bitnation 成为第一个宣称主权的加密微型国家，这激励其他司法管辖区寻求独立。</p><p>这些司法管辖区包括内陆地区，如 2.7 平方英里大小的 Liberland、岛屿以及海洋船只。未来学家还提出了海洋定居的想法，即在国际水域建立永久性设施，作为主权国家运作。</p><p>截至目前，还没有建立永久性的海洋定居设施，而这一新颖概念遭到了已建立国家的敌视，后者视建立新国家的尝试为对其主权的威胁。</p><p>批评者认为，仅靠区块链技术远不足以使这些微型国家维持生存，还需要保护它们新建立的边界，以防更大、更具侵略性的国家。</p>',
      url: 'https://tokeninsight.com/zh/news/justin-sun-elected-prime-minister-of-liberland-micronation?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sfdo767.jpeg',
      source_url:
        'https://cointelegraph.com/news/justin-sun-elected-prime-minister-liberland-sovereign-micronation',
      timestamp: 1728636729000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Cardano在阿根廷托管首个具有法律约束力的智能合约',
      content:
        '<p>Cardano网络正在托管阿根廷首个具有法律约束力的智能合约，该合约由阿根廷法院的司法管辖范围签署并可强制执行。</p><p>该合约是Cardano大使Mauro Andreoli和Lucas Macchia之间的贷款协议，金额为10,000个Cardano代币（价值3,380美元），在四个月内以10%的利率支付。</p><p>Andreoli在10月8日的X平台帖子中解释说，这是阿根廷法院首次可以从Cardano智能合约中强制执行以ADA代币的全额支付。</p><p>“我们做到了，我们刚刚在Cardano网络上签署了第一个在阿根廷共和国法律完全合规的具有法律和司法强制力的合同。”</p><p>Andreoli和Macchia还签署了一份法律文件，支持该智能合约贷款的关键细节，包括所使用的区块链、钱包以及交易ID。</p><p>Andreoli表示，这一“里程碑”可能会加速阿根廷法院更广泛地承认智能合约作为促进商业协议的技术手段。</p><p>“从法律上讲，这确立了证据并简化了程序步骤，标志着在该国创造有利判例法的初始阶段，并促进商业交易。”</p><p>他补充说，此类智能合约可应用于房屋租赁、购房协议和其他法律合同。</p><p>阿根廷已经拥有“健全的”商业合同法律框架，但Andreoli表示，下一步是教育法官。</p><p>该合同的签署发生在Cardano创始人查尔斯·霍斯金森（Charles Hoskinson）与米莱（Milei）于本月晚些时候在布宜诺斯艾利斯举行的Cardano峰会2024会面之前。</p><p>其他司法系统在进行法律程序时已经接受了加密技术。</p><p>2023年8月，美国一家法院使用区块链上的强制执行工具将几名被制裁个人的加密钱包锁定。</p><p>2022年，英格兰和威尔士高等法院允许使用非同质化代币（NFT）向被告送达诉讼。</p><p>同年晚些时候，佛罗里达州一家联邦法院也允许通过NFT向涉嫌加密窃贼的钱包送达诉讼，因为被告身份不明。</p>',
      url: 'https://tokeninsight.com/zh/news/cardano-hosts-first-smart-contract-legally-enforceable-in-argentina?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ada_argentina.png',
      source_url:
        'https://cointelegraph.com/news/legally-enforcible-cardano-smart-contract-argentina',
      timestamp: 1728567515000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '美国指控四家加密“做市商”及其员工市场操纵和欺诈行为',
      content:
        '<p>据 Coindesk 报道，联邦检察官周三指控四家所谓的做市商、多个加密项目以及十多名个人操纵加密市场，称他们通过费用和以抬高的价格出售操纵的代币获利。</p><p>根据周三公开的起诉文件，Gotbit、CLS Global、MyTrade 和 ZM Quant 对多种代币进行了刷单交易，制造出这些代币的合法活动远多于实际情况，并将这些代币以“人为抬高的价格”出售给他人，在各大平台上推广这些代币，并说服交易所让他们以较低的费用购买代币。</p><p>美国证券交易委员会（SEC）也对 ZM Quant 及其员工 Baijun Ou 和 Ruiqi Lau、Gotbit及 其员工费德尔·科德罗夫（Feder Kedrov）、CLS Global 及其员工安德烈·佐尔热斯（Andrey Zhorzhes）提起了诉讼，此外还有一些被描述为“加密资产推广者”的个人：Russell Armand、Maxwell Hernandez、Manpreet Singh Kohli、Nam Tran 和 Vy Pham。司法部（DOJ）的代表表示，这些案件是在两年前由 SEC 移交给检方的。</p><p>检察官称，这些做市商被告公开声称自己是提供合法服务的合法做市商，但私下里为客户提供了包括刷单交易在内的非法服务。</p><p>至少在 Gotbit 的案例中，这些非法服务并非真的那么隐秘：在2019年，Gotbit的联合创始人阿列克谢·安德留宁（Alexey Andryunin）当时是20岁的大学二年级生，他向CoinDesk详细说明了他为客户提供的刷单服务的运作方式。他直言不讳地承认其业务的可疑性质，承认Gotbit未在任何司法管辖区注册，因为它“并不完全合乎道德”。针对安德留宁的单独刑事指控也已被提出。</p><p>ZMQuant注册在英属维尔京群岛，但其起诉书中的员工都位于香港。尽管Gotbit未在任何地方注册，但其员工被认为是俄罗斯人。</p><p>被操纵的代币名单包括Robo Inu，该代币在起诉书公开后上涨。其他被指控的项目包括VZZN和Saitama。根据起诉书，每个代币——包括Robo Inu——都被归类为证券。参与这些项目的多名人员，包括Robo Inu的创始人Vy Pham，也被列为被告。</p><p>在调查过程中，联邦调查局（FBI）特工在“合作证人”的帮助下创建了一种基于以太坊的加密货币，名为NextFundAI，并利用它来“识别、打击并将这些涉嫌的欺诈者绳之以法”，根据周三发布的新闻稿。根据法庭文件，这枚代币也被归类为证券。FBI的一位代表补充说，该代币的交易“活动”有限，但拒绝提供除公开文件之外的其他信息，包括FBI是否与任何加密公司合作进行该项目。马萨诸塞州地区代理联邦检察官约书亚·莱维（Joshua Levy）在周三下午的新闻发布会上表示，该代币的交易已被禁用。</p><p>莱维在电话会议上表示，司法部已经从“欺诈所得”中收回了约2500万美元，这些资金将返还给投资者，但他没有透露被告总共获得了多少非法收益。</p>',
      url: 'https://tokeninsight.com/zh/news/prosecutors-charge-four-crypto-market-makers-employees-with-market-manipulation-fraud?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/fbi.png',
      source_url:
        'https://www.coindesk.com/policy/2024/10/09/prosecutors-charge-two-crypto-market-makers-employees-with-market-manipulation-fraud/',
      timestamp: 1728559725000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '在支付了 500 万美元罚款后，巴西将重新审查埃隆·马斯克的 X 禁令',
      content:
        '<p>据 Cointelegraph 报道，社交媒体平台 X 可能在支付罚款、任命新法律代表并根据法院要求封锁某些用户账号后，很快将在巴西恢复运营。</p><p>巴西当局可能会很快解除对埃隆·马斯克社交媒体平台 X 的禁令，此前该公司支付了 2860 万巴西雷亚尔（约合 550 万美元）的罚款。</p><p>根据当地媒体报道，X 在 10 月 7 日满足了恢复在线所需的最新要求。今年 8 月底，巴西联邦最高法院因 X 未能遵守与该国虚假信息传播调查相关的命令而暂停了该平台。</p><p>最终的付款是在一系列异常事件之后确认的。10 月 4 日，与由法官亚历山大·德·莫拉埃斯因社交网络不规范行为而处以的罚款相关的资金错误地存入了错误的银行账户。上周一，马斯克的卫星公司 Starlink 支付的款项被转移到正确的账户。</p><p>这笔款项包括因 X 在法院调查中缺乏合作而处的原罚款，以及因未遵守暂停令而额外支付的 1000 万巴西雷亚尔（约合 190 万美元）。在转向 Cloudflare 的服务器后，意外允许一些用户在 9 月访问该平台。</p><p>在之前的几天里，X 还根据当地法规在该国任命了一位新的法律代表，并封锁了被指控传播假新闻和虚假信息的用户账号，这些信息涉及巴西的选举过程和司法系统。</p><p>平台在该国的恢复现已取决于巴西检察总长，他将建议是否解除对 X 的暂停。如果批准 X 的恢复，莫拉埃斯法官将再次审查此案并做出决定。</p><p>莫拉埃斯法官自 2023 年以来一直在调查 X，因其 allegedly 促进和支持在巴西传播虚假信息。马斯克也因妨碍司法、参与犯罪组织和煽动犯罪等指控而受到调查。</p><p>这位亿万富翁公开批评莫拉埃斯的行为，称其为出于政治动机的审查。他指责该法官像“独裁者”一样，通过他声称的不合法内容管理要求来针对政治对手。</p>',
      url: 'https://tokeninsight.com/zh/news/brazil-to-review-elon-musk-s-x-ban-after-5m-fine-payment?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/xxxxxxx.jpeg',
      source_url:
        'https://cointelegraph.com/news/brazil-review-elon-musk-x-ban-fine-payment',
      timestamp: 1728467411000,
      tags: [
        {
          name: '马斯克',
        },
      ],
    },
    {
      title: 'Crypto.com 起诉美国证券交易委员会，以“保护加密的未来”',
      content:
        '<p>据 Cointelegraph 报道，Crypto.com 针对美国证券交易委员会（SEC）提起的诉讼，源于该交易所收到了来自该机构的 Wells 通知。</p><p>主要加密货币交易所和服务提供商 Crypto.com 正在与美国证券交易委员会展开法律斗争，旨在保护该国加密行业的未来。</p><p>Crypto.com 的联合创始人兼首席执行官 Kris Marszalek 于 10 月 8 日在 X 平台上正式宣布，公司已向美国 SEC 提起诉讼。</p><p>“我们公司对联邦机构采取的这一前所未有的行动，是对 SEC 通过执法进行监管的合理回应，这种做法伤害了超过 5000 万名美国加密持有者，”他写道。</p><p>“我们这样做是为了保护美国加密行业的未来，加入一系列积极自我辩护并对这一超出法律授权的误导性联邦机构采取行动的同行，”Crypto.com 的官方公告中写道。</p><p>Marszalek 还承诺，公司将利用“所有可用的监管工具”，通过适当的规则制定为行业带来确定性。Crypto.com 还向美国商品期货交易委员会（CFTC）和 SEC 提交了请求，以确认对加密衍生产品的分类。</p><h3>收到 SEC 的 Wells 通知后采取的行动</h3><p>在公告中，Crypto.com 表示，其针对 SEC 的诉讼是基于公司收到的 SEC Wells 通知。</p><p>根据该交易所的说法，SEC 的这一举动“表明，尽管两党都有迹象表明下一届政府将采取更具建设性和有效的方法，但 SEC 的未经授权和不公正的执法监管活动仍在继续。”</p><p>Crypto.com 表示：</p><p>“目前，SEC 不当的执法行动是运营合法持牌加密业务过程中不可避免的一部分。虽然这是我们公司首次对联邦机构提起诉讼，但该机构对我们行业的行动让我们别无选择。”</p><p>Crypto.com 指出，其诉讼主张 SEC “单方面扩展了其超出法定限制的管辖权”。</p><p>该交易所还辩称，SEC “建立了一项非法规则，认为几乎所有加密资产的交易都是证券交易，无论其销售方式如何。”</p><p>尽管收到了 SEC 的 Wells 通知，Crypto.com 表示平台上“照常营业”，并将继续“追求每个钱包中的加密货币”。</p><h3>Crypto.com 希望确认某些加密产品“仅由 CFTC 监管”</h3><p>此外，Crypto.com 向 CFTC 和 SEC 提交了一份请求，要求通过联合解释确认某些加密衍生产品“仅由 CFTC 监管”。</p><p>Crypto.com 指出，根据多德-弗兰克法案的联合规则制定，任何市场参与者均可向 CFTC 和 SEC 询问某一产品是否为“掉期”、“基于证券的掉期”或“混合掉期”。</p><p>“根据这些联合规则，监管机构有 120 天的时间要么发布联合批准的解释，要么拒绝该解释，”Crypto.com 表示。</p><p>如果当局拒绝请求的解释，应提供不发布解释的理由。</p><p>“这些机构必须与美联储理事会进行咨询，并且还可以与美联储协商进行联合规则制定，”Crypto.com 补充道。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto.com-sues-sec-to-protect-the-future-of-crypto-in-us?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dsaf897.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-com-sues-sec-protect-future-crypto-us',
      timestamp: 1728467127000,
      tags: [
        {
          name: 'Crypto com',
        },
        {
          name: '政策与监管',
        },
        {
          name: '美国证监会',
        },
      ],
    },
    {
      title: 'BloFin 在新加坡 TOKEN2049上展示强劲扩展愿景',
      content:
        '<p>作为领先的加密货币中心化交易所（CEX），BloFin 连续第二年作为新加坡 TOKEN2049的赞助商，继续取得成功。这一成就凸显了 BloFin 在加密行业的日益增长的影响力，并强化了其通过升级赞助 TOKEN2049 迪拜活动扩展其影响力的承诺。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/calendar/img2024100910204877738af6-86d6-41ef-a196-26f0af159b0a.jpg"></figure><p>BloFin 再次在 TOKEN2049 上发出了强有力的声音，在备受期待的 Whale Royale Yacht Club 附属活动中，汇聚了关键意见领袖（KOL）、行业高管和加密爱好者。此次活动取得了重大成功，促进了加密社区内宝贵的联系与兴奋。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/calendar/img20241009102103c7b20579-2a21-4c40-b308-8b4771967e64.jpg"></figure><p>展望未来，BloFin 准备在 TOKEN2049迪拜进一步提升其影响力。该公司制定了雄心勃勃的计划，扩大其全球用户基础，并继续为其提供顶级服务。</p><p>BloFin 首席执行官 Matt 表示：“我们为自己的成就感到自豪，并期待在 TOKEN2049迪拜继续这一势头。我们的使命是持续提供顶级服务，同时提升用户体验。”</p><h2>BloFin 最近升级的交易引擎通过全新系统升级提供了更快的速度和可靠性</h2><p>BloFin 以其强大的永续和期货交易服务闻名，最近实施了尖端技术升级。引入的内存处理技术和 Raft 一致性算法系统确保了更快的执行速度和响应时间，即使在交易高峰期也不例外。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/calendar/img2024100910212301d25ffa-e185-4b33-975c-a3e6d41a1f4c.jpg"></figure><p>这些技术进步证明了 BloFin 致力于提供最强大且安全的交易平台，这与其口号“Where Whales Are Made.”相一致。</p><p>凭借对用户体验的不懈关注、先进的交易功能和增强的安全协议，BloFin 树立了卓越的标准，巩固了其作为大规模交易者和加密爱好者的首选平台的地位。</p><p><strong>关于 BloFin</strong></p><p>BloFin 是领先且安全的加密货币中心化交易所（CEX），提供超过350种 USDT-M 永续合约和250个现货交易对。它为新手和有经验的交易者提供一个蓬勃发展的平台——鲸鱼的诞生地。除了衍生品交易产品，BloFin 现在还提供更多优质服务，包括现货交易、跟单交易、收益、API、模拟交易等。凭借用户友好的界面和高性能的交易平台，BloFin 确保高流动性、具有竞争力的定价和最小的滑点。致力于用户安全，BloFin 与 Fireblocks 合作进行资产保护和保险，并通过 Chainalysis 加强合规性和安全性。</p><p>选择 BloFin，体验安全且高效的交易。</p>',
      url: 'https://tokeninsight.com/zh/news/blofin-impresses-at-token2049-singapore-with-strong-vision-for-rapid-expansion?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/token2049.png',
      source_url: '',
      timestamp: 1728440597000,
      tags: [
        {
          name: '事件',
        },
      ],
    },
    {
      title: '阿联酋免除了加密货币转移、转换的增值税',
      content:
        '<p>据 Cointelegraph 报道，阿联酋已将加密货币转账和兑换免征增值税，旨在将自己定位为更具加密友好性的数字资产交易管辖区。</p><p>阿联酋对增值税（VAT）法规的修订将免除数字资产的转账和兑换，包括加密货币。</p><p>在 10 月 2 日，阿联酋联邦税务局（FTA）发布了该国增值税规则的修订。根据商务咨询公司普华永道（PwC）的说法，新规则包括对额外服务的增值税豁免，这些服务包括投资基金的管理以及虚拟资产的转账和兑换。</p><p>普华永道指出，虚拟资产转账和兑换的豁免将追溯适用于 2018 年 1 月 1 日及之后的交易。</p><h3>虚拟资产公司的输入税回收</h3><p>审计公司解释称，在阿联酋，虚拟资产被定义为“可以数字交易或兑换的价值表现，并可用于投资目的。”然而，该定义不包括法定货币或金融证券。</p><p>审计公司建议处理虚拟资产的企业分析其追溯增值税地位的豁免情况。普华永道补充道，虚拟资产公司应特别关注其输入税的回收。</p><p>总部位于阿联酋的记账和税务公司 Finanshels 表示，在阿联酋，输入增值税的回收使注册企业能够申请已在符合条件的商业采购上支付的增值税。</p><p>此外，普华永道表示，纠正历史报税可能需要虚拟资产公司的自愿披露。</p><h3>阿联酋加强对加密的监管</h3><p>除了增值税豁免外，阿联酋的监管机构最近也在简化和更新虚拟资产的相关规则。</p><p>在 9 月 9 日，迪拜虚拟资产监管局（VARA）与阿联酋联邦金融机构证券和商品管理局（SCA）达成协议，旨在共同监督虚拟资产服务提供商（VASPs）。</p><p>由于该协议，在迪拜运营的 VASPs 若想获得 VARA 的许可，也可以选择通过默认注册成为 SCA 的注册商来为更广泛的阿联酋提供服务。</p><p>与此同时，VARA 也收紧了对加密营销的规定。9 月 26 日，监管机构表示，推广数字资产投资的公司应在其材料中添加显著的免责声明。</p><p>该免责声明必须说明“虚拟资产可能会全部或部分失去其价值，并受到极端波动的影响。”</p>',
      url: 'https://tokeninsight.com/zh/news/uae-exempts-crypto-transfers-conversion-from-value-added-tax?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sod8ya.jpeg',
      source_url:
        'https://cointelegraph.com/news/telegram-gifts-to-allows-nft-conversion',
      timestamp: 1728384624000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '币安将列出以太坊 Layer 2 Scroll 的代币 SCR，用于上市前交易',
      content:
        '<p>据 The Block报道：币安将于 10 月 11 日推出以太坊二层网络 Scroll 的原生代币 SCR 的盘前交易。</p><p>币安声称是首个上市 SCR 代币的平台，但盘前交易结束时间和现货上市时间尚未公布。</p><p>加密货币交易所币安计划上市以太坊二层网络 Scroll 的原生代币 SCR 进行盘前交易，并在周二的公告中声称是首个这样做的平台。</p><p>在盘前上市之前，该项目还将加入币安的 Launchpool，用户可以从 10 月 9 日午夜 UTC 开始锁定他们的 BNB 和 FDUSD，以获取为期两天的 SCR 空投。币安指出，BNB 池每位用户的硬上限为 97,395 SCR，FDUSD 池为 17,187 SCR。</p><p>Scroll 代币的总供应量为 10 亿 SCR，其中币安 Launchpool 奖励占 5500 万个代币，约占总供应的 5.5%。根据该加密交易所的说法，上市时的初始流通供应量将为 1.9 亿 SCR，占总供应的 19%。</p><p>币安将于 10 月 11 日 UTC 时间上午 10 点上市 SCR，并开放 SCR/USDT 交易对的盘前交易。然而，盘前交易结束时间和现货上市时间尚未公布，并且该服务在所有地区均不可用。</p><p>Scroll 尚未正式宣布其代币的具体上线日期，但预计将在本季度内进行。Scroll 的 zkEVM 于 2023 年 10 月在主网上线，目前已有 76,769 ETH（约 1.86 亿美元）桥接到该平台。</p><p>zkEVM 是基于以太坊构建的二层网络，使用零知识证明实现可扩展性。作为以太坊虚拟机兼容的网络，这些网络可以支持以太坊应用并实现大规模运行。</p><h3>币安的“实际代币”盘前交易服务</h3><p>据《区块链》独家报道，币安在两周前推出了盘前交易服务，使用户可以在代币现货市场上市之前提前建立头寸。</p><p>与现有的盘前平台不同，币安提供的是“实际代币”的盘前交易，而不是衍生品。</p><p>“币安是唯一提供盘前现货交易的加密交易所，代币将专门分配和生成供用户在币安平台的盘前交易中持有和交易，”该交易所在当时表示。</p><p>目前，Launchpool 代币在用户手中，直到币安正式上市为止。通过币安的盘前交易，用户可以在 Launchpool 分配完成后交易这些代币，但在正式上市之前会受到提款、转账和存款限制等限制。</p><p>SCR 似乎是币安的首个盘前交易代币。然而，该服务在某些地区不可用，包括美国、加拿大、迪拜、日本、荷兰、俄罗斯和西班牙。</p>',
      url: 'https://tokeninsight.com/zh/news/binance-set-to-list-ethereum-layer-2-scroll-s-token-scr-for-pre-market-trading?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/吖富f.jpeg',
      source_url:
        'https://www.theblock.co/post/319992/scroll-token-scr-binance-pre-market-trading',
      timestamp: 1728384275000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '随着 memecooin 交易量的激增，Pepe 在一周内上涨 30%',
      content:
        '<p>据 Cointelegraph 报道，Pepe 的交易量在过去一周内增加了三倍，触发了这一青蛙主题迷因币的强劲双位数反弹。</p><p>作为基于以太坊的迷因币，Pepe 在过去一周上涨超过 31%，随着迷因币整体回暖。</p><p>目前，PEPE 的交易价格为 $0.00001076，达到了自 8 月 3 日以来的最高值，比 9 月 6 日的局部低点上涨了 68%。</p><p>随着 PEPE 价格的飙升，交易活动也随之增加。9 月 27 日，PEPE 的现货交易量超过了 13 亿美元，过去 24 小时上涨了 35%，过去七天上涨了 316%。</p><p>其市值也重新回到了 400 万美元以上，巩固了其作为全球第三大迷因币的地位。</p><p>在 9 月 27 日，PEPE 也是交易量最大的迷因币，超过了狗狗币（Dogecoin）700 多百万美元的交易量。</p><p>最终，在经历了几周的横盘价格走势后，PEPE 似乎正在重新获得立足点。</p><h3>迷因币普遍上涨</h3><p>9 月 27 日，PEPE 的反弹与整个迷因币领域的看涨价格走势相呼应。该领域的大多数加密货币在过去一周均出现了双位数的涨幅。领先的迷因币 DOGE 和 Shiba Inu 在过去七天分别上涨了 20.7% 和 50%。</p><p>基于 Solana 的 Dogwifhat 在过去一周录得 31% 的涨幅，而 Base 的 Brett 在同一时期上涨了 28%。</p><p>此外，仅在过去 24 小时内，迷因币的交易量就超过了 85 亿美元。这一复苏是由于投资者再次接受风险资产，如迷因币。</p><p>来自 Alternative 的数据显示，加密恐惧与贪婪指数已进入“贪婪”区间，达 61，较一个月前的 30（当时市场充满“恐惧”）有所上升。</p><h3>PEPE 打破熊市模式</h3><p>在 9 月 20 日，PEPE 的价格突破了一个下降平行通道，激发了强劲的动能，使其翻转了 50 日、100 日和 200 日的指数移动平均线（EMA）为支撑。</p><p>“$PEPE 的价格突破了下降通道，”知名分析师 Cryptojack 在 9 月 27 日的 X 帖子中表示，补充道，“我预计它会继续上涨。”</p><p>短期内，多头可能会继续反弹，朝着 $0.00001260 的主要阻力位进发。</p><p>相对强弱指数的急剧上升以及其在超买区域的 73 的位置，进一步强化了市场买家的主导地位。</p><p>然而，超买条件可能导致获利了结，可能在 PEPE 继续上涨趋势之前出现小幅修正。</p><p>最重要的支撑区位于通道上边界趋势线的上方，目前所有主要的 EMA 都位于该区域。</p><p>失去这一支撑聚合区可能引发熊市情景，可能的下行目标范围在 $0.00000668 到 $0.00000596 之间。</p>',
      url: 'https://tokeninsight.com/zh/news/pepe-gains-30-in-a-week-as-memecoin-trading-volumes-explode?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/szdf65.jpeg',
      source_url:
        'https://cointelegraph.com/news/pepe-rises-30-in-a-week-as-spot-trading-volume-triples',
      timestamp: 1727606671000,
      tags: [
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: '币安创始人赵长鹏从美国监狱获释',
      content:
        '<p>据 Cointelegraph 报道，币安创始人及前首席执行官赵长鹏（Changpeng “CZ” Zhao）于 9 月 27 日从美国联邦监狱获释，之前因违反美国反洗钱（AML）规定被判入狱四个月，美国联邦监狱局的一位发言人告诉《币电报》。</p><p>根据美国司法部 11 月 21 日的声明，CZ 于去年 11 月承认在全球最大的加密货币交易所币安未能实施适当的 AML 控制，面临联邦指控。他也因此辞去了币安的首席执行官职务。</p><p>CZ 的净资产约为 600 亿美元，使他成为在美国服刑的最富有的人。</p><p>今年 4 月，CZ 同意从迪拜返回美国，服刑四个月。他在南加州的一所最低安全监狱度过了前两个月，随后转移到长滩的一所中途宿舍，在那里他被允许进行有监督的日间外出，报道指出。</p><p>“我们很高兴 CZ 能够回家与家人团聚，”币安的一位发言人对《币电报》表示，并补充道：</p><p>“虽然他不再管理或运营币安，但我们期待看到他接下来的行动。自去年以来，币安在我们现有团队的领导下继续蓬勃发展，全球用户已超过 2.3 亿。”</p><p>CZ 的四个月刑期显著低于美国司法部最初要求的 36 个月，后者旨在“反映该罪行的严重性”。</p><p>根据美国司法部的官方声明，CZ 的认罪包括不仅是 AML 违规，还有无牌照资金转移和制裁违规。</p><p>检察官在量刑备忘录中写道：“赵知道，他决定不实施有效的 AML 程序将导致币安在违反美国法律的情况下，促进美国用户与伊朗及其他受制裁国家和地区用户之间的交易。”</p><p>在 4 月 30 日的听证会上，西雅图地区法院法官理查德·琼斯（Richard Jones）解释了四个月刑期的决定，称没有证据表明 CZ 被告知币安的任何非法活动。</p><p>CZ 同意在去年 11 月支付 5000 万美元的罚款作为其案件的一部分，而币安也为违反美国的 AML 法律支付了 43 亿美元的罚款。然而，CZ 的个人财富并未受到此案件的影响。</p><p>币安创始人继续持有币安的多数股权，预计持有该交易所 90% 的股份。</p>',
      url: 'https://tokeninsight.com/zh/news/binance-founder-cz-walks-free-from-us-prison?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/uy65rfu.jpeg',
      source_url:
        'https://cointelegraph.com/news/binance-founder-cz-walks-free-from-us-prison',
      timestamp: 1727606167000,
      tags: [
        {
          name: '币安',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '随着主网升级和稳定币发行的临近，stack (STX) 上涨 30%',
      content:
        '<p>据 Cointelegraph 报道，计划推出一种与比特币挂钩的稳定币、即将进行的网络升级以及 BTC 最近的复苏可能与 STX 的 30% 涨幅有关。</p><p>STX 是专注于比特币的 Stacks 二层智能合约平台的原生代币，受益于比特币的复苏，在过去七天内上涨约 30%。</p><p>STX 的交易量在同一时间段内翻了一番，至 9 月 26 日达到了 1.482 亿美元，超过了自 9 月 18 日以来比特币 7.5% 的涨幅。</p><p>让我们看看 STX 上涨势头背后的因素。</p><h3>STX 价格因 Nakamoto 升级临近而上涨</h3><p>STX 价格的上涨与社区为即将到来的 Nakamoto Release 更新做准备有关，该更新距离现在不到 15 天。</p><p>Stacks 基金会正式宣布，备受期待的 Nakamoto 升级将于 10 月 9 日激活。核心开发者已选择比特币区块号 864864 作为硬分叉区块。</p><p>此次升级预计将通过加速交易和引入新的与比特币挂钩的代币 sBTC 等改进，提升比特币上的去中心化金融（DeFi）。sBTC 将被比特币持有者和希望在比特币上构建应用程序的开发者使用。</p><p>为庆祝这一重大里程碑，Stacks 社区将在全球举办超过 20 场开发者研讨会，内容包括讲座、现场演示和技术挑战，参与者可以获得 STX 代币。</p><p>为此，Solana 和 Aptos 宣布集成了一种比特币支持的资产 sBTC，使开发者能够将 sBTC 融入这些平台上的去中心化应用（DApps）。</p><p>这些集成为比特币持有者提供了更多的机会，使其资产不仅限于持有或交易，还可以参与去中心化金融或 NFT 市场。</p><h3>网络增长推动 STX 价格</h3><p>所有这些发展增强了用户对 Stacks 的兴趣，区块链的智能合约部署达到了历史新高。在 9 月 7 日的一条 X 帖子中，Stacks 基金会宣布，8 月份在 Stacks 上部署的智能合约数量达到了 1400 个，创下历史新高，环比增长 30%。</p><p>另一个衡量用户对区块链网络兴趣和信任程度的指标是平台上的总锁仓价值（TVL）。根据 DefiLlama 的数据，Stacks 的 TVL 从 9 月 18 日的 9110 万美元增加了 70%，在撰写时达到了 1.125 亿美元。</p><p>Stacks 上总锁仓价值的增加表明该网络的 DeFi 生态系统注入了大量资本，凸显了投资者的信心和对 DApps 的积极参与。</p><h3>比特币价格上涨推动 STX 涨幅</h3><p>美国基于现货比特币的 ETF 获批，以及对 2024 年第一季度比特币减半的期待，使 BTC 的价格在 3 月 14 日涨至历史新高 73,835 美元。同样，STX 在 4 月 1 日也达到了 3.84 美元的历史新高。</p><p>最近，美国联邦储备局降息 50 个基点以及比特币 ETF 的资金流入增加，推动了 BTC 价格的强劲反弹，9 月 26 日涨至 65,800 美元。STX 再次紧随比特币的步伐，9 月 26 日涨至 2.07 美元的八周高点。</p><p>随着市场参与者预计比特币价格将在 2024 年第四季度继续上涨，且二层比特币开发逐渐获得关注，Stacks 可能进一步巩固其在二层比特币领域的主导地位。</p>',
      url: 'https://tokeninsight.com/zh/news/stacks-stx-makes-30-gain-as-mainnet-upgrade-and-stablecoin-launch-approach?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdf76.jpeg',
      source_url:
        'https://cointelegraph.com/news/stacks-stx-makes-30-gain-as-mainnet-upgrade-and-stablecoin-launch-approach',
      timestamp: 1727432352000,
      tags: [
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: '在用户持续活跃的情况下，Base 的总价值首次突破20亿美元',
      content:
        '<p>据 The Block 报道，Base 的总锁仓价值首次突破 20 亿美元，年初至今增长了 370%。</p><p>去中心化交易所 Aerodrome 是 TVL 增长的最大贡献者，存款超过 10 亿美元。</p><p>Base 是一个由 Coinbase 孵化的以太坊二层网络，其总锁仓价值首次超过 20 亿美元，使其成为仅次于 Arbitrum 的第二大乐观汇总（optimistic rollup）。</p><p>根据 DeFiLlama 的数据，Base 的 TVL 目前为 20.8 亿美元，较年初约 4.3 亿美元增长了 370%。</p><p>Base 作为乐观汇总，通过在主以太坊区块链外处理交易，定期将交易数据发布到链上。这种方法显著减轻了以太坊区块链的负担，从而提高了其吞吐量。其主网于 2023 年 8 月上线。</p><p>去中心化交易所 Aerodrome 在过去一年中对 Base TVL 增长的贡献最大，目前存款超过 10 亿美元，其次是 Uniswap，持有 2.2 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/base-s-total-value-locked-crosses-2-billion-for-the-first-time-amid-sustained-user-activity?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/7afsd6.jpeg',
      source_url:
        'https://www.theblock.co/post/318431/bases-total-value-locked-crosses-2-billion-for-the-first-time-amid-sustained-user-activity',
      timestamp: 1727431835000,
      tags: [
        {
          name: 'Base',
        },
      ],
    },
    {
      title:
        '卡玛拉·哈里斯(Kamala Harris)表示，美国应该在区块链领域占据“主导地位”，并在经济计划中重申“数字资产”',
      content:
        '<p>据 The Block 报道，哈里斯在周三表示，在她的领导下，美国将“重新承诺”在“定义下一个世纪”的领域中保持全球领导地位，特别提到区块链一词。</p><p>与唐纳德·特朗普不同，这位民主党总统候选人在竞选活动中对加密货币一直保持沉默。</p><p>副总统卡马拉·哈里斯在周三的演讲中表示，在她的领导下，美国将“重新承诺”在“定义下一个世纪”的领域中保持全球领导地位，“在人工智能、量子计算、区块链和其他新兴技术方面保持主导地位。”她的评论是在匹兹堡经济俱乐部的演讲中提出的。</p><p>直到上周末，这位民主党总统候选人在竞选活动中对加密货币一直保持沉默。在一次曼哈顿的华尔街筹款活动中，哈里斯表示，人工智能和加密货币是她“机会经济”愿景的一部分。</p><p>“我们将鼓励像人工智能和数字资产这样的创新技术，同时保护消费者和投资者。我们将创建一个安全的商业环境，制定一致且透明的规则，”哈里斯在筹款活动中说道。她在其 80 页的经济计划中重申了这一观点。</p><p>尽管进展缓慢，但对加密行业来说，这是一个令人欣慰的信号，因为该行业到目前为止大部分时间都受到共和党候选人唐纳德·特朗普的青睐。最近，特朗普在纽约市的一家比特币主题酒吧 PubKey 访问，并且他家族的 World Liberty Financial 项目确认将进行代币销售。</p><p>VanEck 分析师表示，11 月的选举结果可能对加密货币产生复杂的影响。</p><p>“我们认为，尽管卡马拉·哈里斯和唐纳德·特朗普对比特币持乐观态度，但他们对更广泛的数字资产市场的影响各有不同，”分析师在本周早些时候写道。“两届政府可能会维持财政支出，甚至进一步加速，这可能导致进一步的量化宽松——尤其是在反商业政策加剧的情况下。”</p><p>他们指出，哈里斯担任总统可能对比特币更有利，因为这将“加速推动比特币采用的许多结构性问题”。</p>',
      url: 'https://tokeninsight.com/zh/news/kamala-harris-says-us-should-become-dominant-in-blockchain-reiterates-digital-assets-in-economic-plan?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/76hg.jpeg',
      source_url:
        'https://www.theblock.co/post/318216/kamala-harris-says-us-should-become-dominant-in-blockchain-reiterates-digital-assets-in-economic-plan',
      timestamp: 1727345911000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '在遭受 2.3 亿美元的黑客攻击后，WazirX 批准了四个月的债务重组延期',
      content:
        '<p>据 The Block 报道，新加坡高等法院已授予 WazirX 四个月的有条件暂停令，以重组其负债，此前该平台遭遇了 2.3 亿美元的安全漏洞。</p><p>与此同时，黑客背后的实体继续通过加密混合器 Tornado Cash 以 5000 以太币（1300 万美元）的批次洗钱被盗资金。</p><p>Zettai Pte Ltd，印度加密交易所 WazirX 的新加坡控股公司，已获得新加坡高等法院的四个月暂停令，以重组其负债，此次重组是由于该平台在 7 月遭遇的 2.3 亿美元安全漏洞。</p><p>申请于 8 月 27 日由 Zettai 董事 Nischal Shetty 提交，旨在为公司提供“缓冲空间”，以处理平台上用户的加密货币余额并促进其恢复，Zettai 当时表示。</p><p>在申请提交后，法院自动启动了为期 30 天的暂停，但随后的批准未能达到最初请求的六个月暂停期。</p><p>“我们感谢法院的决定，这使我们能够专注于解决、恢复和重组的道路，”WazirX 创始人 Nischal Shetty 在与《区块链》分享的声明中说。“我们立即申请暂停是确保最快、最公平、得到债权人批准、具有法律约束力的解决路径的关键步骤，债权人有代币选择和在牛市中的潜在收益。”</p><p>根据法院批准的条件，WazirX 表示将公开其钱包地址，回应法庭上提出的用户查询，公布财务信息，并确保未来法庭申请的投票受到独立方的审查。“我们正在与顾问和利益相关者积极合作，制定一项全面的计划，以满足相关方的需求，”该公司表示。</p><p>“WazirX 将继续提供有关我们进展和进一步发展的更新。我们坚定致力于有效和公正地解决此事，”Shetty 补充道。</p><p><strong>WazirX 的漏洞、Binance 的指控与黑客的 Tornado Cash 转账</strong><br>WazirX 于 7 月 18 日遭遇安全漏洞，导致超过 2.3 亿美元的加密资产被未经授权转移。此次攻击瞄准了交易所的以太坊网络多重签名钱包，可能是由于私钥泄露，导致资金被盗。</p><p>加密交易所当天暂停了提款，但在几天后才停止了整个平台的交易，以继续处理漏洞带来的后果。</p><p>区块链分析公司 Elliptic 在 7 月的一份报告中表示，链上数据表明，此次攻击是由北朝鲜的 Lazarus Group 执行的，这是一个以实施高调攻击而闻名的国家支持的黑客组织。</p><p>上周，Binance 重申其声明，称其并不以任何方式拥有、控制或运营 WazirX。尽管双方曾签署过合同，但由于“Zettai 未能履行其义务”，该交易从未完成，Binance 表示。</p><p>Binance 指控 Shetty 在随后提交的两份宣誓书中作出了“误导性陈述”，与其对高等法院的申请相悖。</p><p>与此同时，WazirX 黑客背后的实体继续分批转移被盗资金，频繁以 5000 以太币（1300 万美元）的方式转移至美国制裁的加密混合器 Tornado Cash，最新的转账发生在周三。</p><p>将资金发送到混合器是网络犯罪分子常用的策略，以使执法机构更难追踪和恢复被盗的加密货币。</p><p>根据链上分析平台 Arkham 的数据，攻击者迄今已向该加密混合器转移超过 61,500 以太币（1.61 亿美元）。</p>',
      url: 'https://tokeninsight.com/zh/news/wazirx-granted-four-month-moratorium-to-restructure-its-liabilities-after-230-million-hack?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dasf7.jpeg',
      source_url:
        'https://www.theblock.co/post/318285/court-grants-wazirx-four-month-moratorium',
      timestamp: 1727345626000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '加密钱包 Exodus 捐赠了 130 万美元，帮助“动员”美国加密选民',
      content:
        '<p>据 Cointelegraph 报道，加密钱包供应商 Exodus 向一个政治行动委员会的捐款旨在“帮助支持其在全国范围内教育和动员加密选民的使命”。</p><p>Exodus 宣布向“与加密同行联盟”（Stand With Crypto Alliance）捐赠 130 万美元，以争取更多美国选民对该行业的政治支持。</p><p>Exodus 是一家成立于 2015 年的公司，背后有着广受欢迎的加密钱包。该公司于 9 月 24 日宣布了这一捐款，目的是“帮助支持他们在全国范围内教育和动员加密选民的使命”。</p><p>“与加密同行联盟”自 5 月以来启动了这一政治行动委员会（PAC），声称美国有 5200 万加密货币持有者，他们努力通过教育和政治意识来赋权，以备 11 月 5 日的美国总统选举。</p><p>该非营利组织在其网站上还声称，已从 149 万名加密倡导者那里筹集了 1.8 亿美元的捐款。然而，联邦选举委员会报告称，截至 6 月 30 日，仅有 13,690 美元直接流入该 PAC。</p><p>该组织还专注于倡导加密法规，包括推动“21 世纪金融创新与技术法”（FIT21）的通过，该法案在国会获得了两党的支持。</p><p>该组织于 2023 年 5 月由 Coinbase 成立，拥有超过 1000 名政治家的数据库，并根据他们对加密行业支持的程度进行评分。</p><p>他们于 9 月 25 日更新了政治家评分卡，并现在要求候选人提供“额外的明确性”以符合评分要求。</p><p>加密选民可能在决定 11 月选举结果中发挥关键作用。上个月，前乔·拜登竞选者约翰·安扎隆表示，加密“可能是一个非常重要的摇摆群体”。</p><p>“我不在乎你是民主党人还是共和党人——作为候选人，你应该与这个群体对话，”他当时说道，并补充道，“这个群体现在正在增强力量，拥有权力和声音，这变得非常重要。”</p><p>民主党候选人副总统卡马拉·哈里斯与共和党候选人前总统唐纳德·特朗普之间的竞选形势十分接近。</p><p>根据加密预测平台 Polymarket，哈里斯以 50% 的支持率微弱领先于特朗普的 48%。</p><p>特朗普已多次表示支持加密行业，甚至用比特币购买汉堡。</p><p>与此同时，哈里斯最近才暗示她将支持创新并为数字资产引入明确的监管。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-wallet-exodus-donates-1.3m-to-help-mobilize-us-crypto-voters?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/ads7d.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-exchange-exodus-donates-1-3-million-mobilize-us-crypto-voters',
      timestamp: 1727260885000,
      tags: [
        {
          name: '钱包',
        },
      ],
    },
    {
      title: 'Banana Gun 承诺向受影响的用户退款 300 万美元',
      content:
        '<p>据 The Block 报道，Banana Gun 确认将向 11 名受影响用户退款，涉及上周 300 万美元的 Telegram 机器人漏洞。团队表示，他们已识别出 Banana Gun 使用的 Telegram 消息预言机中可能存在的漏洞，这可能导致了此次攻击。</p><p>Banana Gun 承诺将全额退款给受 300 万美元钱包漏洞影响的 11 名用户。</p><p>“所有受影响用户将从 Banana Gun 国库获得全额退款，不会出售任何代币用于补偿，”团队在周二晚间的 X 帖子中表示。</p><p>Banana Gun 运营着业界领先的基于 Telegram 的交易机器人之一。该机器人使用户能够执行链上交易和抢购即将推出的代币，并已从近 279,000 名用户那里产生超过 63 亿美元的交易量。</p><p>社区成员首次在上周四指出了此次攻击，Banana Gun 确认一些用户的钱包出现了“未经授权的转账”。这一事件促使团队关闭了以太坊虚拟机和 Solana 机器人，尽管他们声称其后端系统并未被攻破。</p><p>“只有少数用户（少于 10）受到影响。此外，这些转账似乎是手动执行的。这让我们相信问题可能出在前端漏洞，”该项目在当时表示。</p><p>最终确认受影响的用户为 11 名，攻击目标是“聪明资金”交易者和加密货币老手，他们“并不容易受骗”。Banana Gun 在周二表示，这些目标因其社交影响力或交易专长而在行业内较为知名。</p><p>“在 Banana Gun 开发团队和外部专家的全面调查后，我们识别出我们使用的 Telegram 消息预言机中存在潜在漏洞，这可能导致了此次攻击，”团队表示。</p><p>在上周五修复问题后，机器人重新上线，关闭后未发生攻击。应对措施包括实施两小时的转账延迟、为转账添加双重认证以及对后端和前端系统进行审计。</p>',
      url: 'https://tokeninsight.com/zh/news/banana-gun-promises-to-refund-3-million-stolen-from-impacted-users?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/df7as.jpeg',
      source_url:
        'https://www.theblock.co/post/318074/banana-gun-exploit-refund',
      timestamp: 1727260390000,
      tags: [
        {
          name: 'Bot',
        },
      ],
    },
    {
      title: '美国现货以太坊 etf 出现自 7 月底以来最大的资金流出',
      content:
        '<p>据 The Block 报道，周一现货以太坊 ETF 录得 7920 万美元的净流出，Grayscale 的 ETHE 流出金额达到 8050 万美元。</p><p>与此同时，现货比特币 ETF 在周一实现了 450 万美元的小额流入。</p><p>美国现货以太坊交易所交易基金在周一录得净流出 7921 万美元，创下自 7 月 29 日以来的最大单日流出。</p><p>根据 Sosovalue 的数据，Grayscale 以太坊信托基金（ETHE）在周一流出 8055 万美元，成为自 7 月 31 日以来的最大流出。它是昨天唯一录得流出的现货以太坊 ETF。</p><p>Bitwise 的 ETHW 报告了 134 万美元的净流入，而其他七个现货以太坊 ETF 则没有流动。</p><p>这九个 ETF 的总交易量在周一达到了 1.6735 亿美元，高于周五的 1.3947 亿美元。</p><p><strong>比特币 ETF 实现小额流入</strong><br>与此同时，美国的现货比特币 ETF 在周一录得 456 万美元的净流入，使其连续第三天实现流入。</p><p>Fidelity 的 FBTC 在 ETF 中实现了最大的流入，流入金额为 2493 万美元。BlackRock 的 IBIT 作为净资产最大的现货比特币 ETF，录得 1154 万美元的净流入，Grayscale 则录得 842 万美元的流入。</p><p>Grayscale 的 GBTC 报告了 4033 万美元的净流出，此前两个交易日没有流动。GBTC 是周一唯一出现流出的现货比特币 ETF。</p><p>12 个现货比特币 ETF 的总交易量在周一缩减至 9.4972 亿美元，而周五为 9.8057 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-ethereum-etfs-see-largest-outflows-since-late-july?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/asd97.jpeg',
      source_url:
        'https://www.theblock.co/post/317802/us-spot-ethereum-etfs-see-largest-outflows-since-late-july',
      timestamp: 1727172529000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Cathie Wood\'s Ark Invest 又抛售了价值 280 万美元的比特币现货 ETF',
      content:
        '<p>据 The Block 报道，Ark Invest 在周一出售了 44,609 股 ARKB 现货比特币 ETF，价值 280 万美元，因为该投资公司重新平衡了其基金权重。</p><p>由凯瑟琳·伍德领导的公司从其 ARKW 基金中总共售出了 1750 万美元的 ARKB 股票，但仍持有 1.397 亿美元的现货比特币 ETF。</p><p>Ark Invest 在周一从其下一代互联网 ETF（ARKW）中出售了 44,609 股 ARKB 现货比特币交易所交易基金，价值 280 万美元。</p><p>这次出售是在该公司于 8 月 1 日出售其自身现货比特币 ETF 股票之后进行的，当时售出了价值 690 万美元的 ARKB。</p><p>目前，Ark Invest 已总共出售价值 1750 万美元的比特币 ETF，并在 7 月也出售了 780 万美元的 ARKB 股票。该公司的策略是确保任何单一持仓在 ETF 投资组合中占比不超过 10%。这旨在维持其基金的多样化，意味着如果 ARKB 相对于 Ark 基金中的其他持仓增值，可能会继续重新平衡其资产权重。</p><p>根据公司的披露，截止 9 月 24 日，ARKB 仍是 ARKW 基金中的第二大持仓，占比 9.93%，价值 1.397 亿美元。这相当于现货比特币 ETF 管理资产总额 29 亿美元的近 5%。根据《区块链》的 ARK 21Shares 比特币 ETF 页面，特斯拉股票是 ARKW 基金中最大的持仓，占比 10.15%，价值 1.429 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/cathie-wood-s-ark-invest-offloads-another-2.8-million-worth-of-its-own-spot-bitcoin-etf?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asd9f76.jpeg',
      source_url:
        'https://www.theblock.co/post/317824/cathie-wood-ark-invest-sells-spot-bitcoin-etf',
      timestamp: 1727172053000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'CoinShares: 随着反弹继续，全球加密投资产品每周净流入 3.21 亿美元',
      content:
        '<p>据 The Block 报道，根据 CoinShares 的数据，数字资产投资产品在全球连续第二周录得 3.21 亿美元的净流入。</p><p>CoinShares 研究主管詹姆斯·巴特菲尔表示，这一激增可能是由于美国联邦储备委员会（Fed）降息 50 个基点所推动。</p><p>包括 BlackRock、Bitwise、Fidelity、Grayscale、ProShares 和 21Shares 等资产管理公司的全球加密基金在连续两周净流出后，继续反弹，上周新增净流入 3.21 亿美元。</p><p>巴特菲尔在周一的报告中写道：“这次激增可能是受到上周三联邦公开市场委员会（FOMC）评论的影响，其立场比预期更为温和，包括降息 50 个基点。”</p><p>因此，这些基金的管理资产总额增长了 9%，交易量也比前一周增加了 9%，达到了 95 亿美元，巴特菲尔补充道。</p>',
      url: 'https://tokeninsight.com/zh/news/global-crypto-investment-products-see-321-million-in-net-weekly-inflows-as-rebound-continues-coinshares?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/7d.jpeg',
      source_url:
        'https://www.theblock.co/post/317676/global-crypto-investment-products-321-million-usd-net-weekly-inflows',
      timestamp: 1727088548000,
      tags: [
        {
          name: '基金',
        },
      ],
    },
    {
      title: '卡玛拉·哈里斯终于打破了对加密货币的沉默:报告',
      content:
        '<p>据 Cointelegraph 报道，美国副总统卡马拉·哈里斯首次公开谈及加密货币，承诺支持该行业，同时强调消费者保护。</p><p>在她的美国总统竞选活动中，哈里斯在一次华尔街筹款活动中发表了关于加密货币的首次公开声明。她表示将鼓励对人工智能和数字资产的投资。</p><p>“我们将携手合作，投资于美国的竞争力，投资于美国的未来。我们将鼓励像人工智能和数字资产这样的创新技术，同时保护我们的消费者和投资者，”哈里斯在曼哈顿的筹款活动上说道，《彭博社》在 9 月 22 日报道。</p><p>“我们将创建一个安全的商业环境，制定一致且透明的规则，”哈里斯表示。“我们将投资于半导体、清洁能源和其他未来产业，并削减不必要的官僚主义。”</p><p>这是哈里斯自成为民主党总统候选人以来首次公开谈论加密货币。她的共和党对手唐纳德·特朗普也在努力争取加密行业的支持。</p><p>行业内一直在猜测，哈里斯是否会采取与乔·拜登总统不同的加密货币政策，后者被一些人视为对该行业不友好。</p><p>在 8 月，哈里斯的高级竞选顾问布莱恩·纳尔逊暗示，如果她在 11 月赢得总统选举，她将支持加密政策。然而，她指出，该行业需要“规则”，因为一些公司已经倒闭。</p><p>“这是一项重要且具有建设性的声明，”Coinbase 政策主管法里亚尔·希尔扎德在 9 月 22 日的 X 帖子中表示。</p><p>“这并没有像唐纳德·特朗普所采取的具体且有远见的立场那样前瞻，但仍然值得注意，因为她认识到数字资产创新的重要性，并与人工智能平起平坐，”希尔扎德补充道。</p><p>风险投资公司 Paradigm 的政府事务副总裁亚历山大·格里夫在 X 上称赞哈里斯的言论“令人鼓舞”，并表示无论谁在 11 月获胜，“这应该是最后一个反加密的政府”。</p><p>“这是进步，进步是好的，”加密风险投资公司 Variant 的法律主管杰克·切尔温斯基在 X 上写道。“但‘同时保护我们的消费者和投资者’可能意味着很多事情。”</p><p>“反加密势力利用‘消费者保护’作为掩护，隐藏他们摧毁我们行业的企图，”他声称。“就我而言，我希望看到政策细节。”</p><p>加密货币已成为一项竞选议题。美国的加密公司，包括 Coinbase、Ripple 和 Gemini，已花费近 1.2 亿美元影响 11 月的选举，《公共公民》在 8 月报道。</p><p>特朗普已经发布了四个非同质化代币系列，支持他家族的加密平台，并密切拥抱加密行业。</p><p>他承诺成为一位“加密总统”，并将解雇美国证券交易委员会主席加里·根斯勒，该机构已对该国最著名的加密参与者启动了多项执法行动。</p><p>根据 9 月 22 日 FiveThirtyEight 的数据，哈里斯和特朗普在全国民调中势均力敌，哈里斯领先特朗普仅 2.9 个百分点。</p>',
      url: 'https://tokeninsight.com/zh/news/kamala-harris-finally-breaks-silence-on-crypto-report?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/fdsa796.jpeg',
      source_url:
        'https://cointelegraph.com/news/kamala-harris-finally-breaks-silence-crypto-during-fundraiser',
      timestamp: 1727088294000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'DEX 聚合商 Jupiter 收购 SolanaFM, Coinhall',
      content:
        '<p>据 The Block 报道，去中心化交易所聚合器 Jupiter 已收购区块链浏览器 SolanaFM。</p><p>同时，它还收购了 Coinhall，一个用于 Solana 和 Cosmos 区块链的去中心化交易终端。</p><p>Jupiter 的联合创始人 Siong Ong 在新加坡的 Solana Breakpoint 活动上宣布，去中心化交易所聚合器已收购区块链浏览器 SolanaFM。</p><p>“通过与 Jupiter 合作，我们将专注于将 Jupiter 的数据和基础设施能力提升十倍，”SolanaFM 在 X 上发布的帖子中说道。</p><p>SolanaFM 于 2022 年从 SBI Group 筹集了 450 万美元，允许用户通过其索引器和浏览工具访问和与 Solana 数据进行交互。</p><p>“我们还在收购 Coinhall，这是 Cosmos 上的第一聚合器，”Ong 在 Breakpoint 的主题演讲中表示。Coinhall 是一个链上交易终端，提供在 Solana 和 Cosmos 区块链上的去中心化交易所之间的交换。根据 Ong 的说法，Coinhall 在 23 条链上拥有超过 225,000 名用户。</p><p>团队没有透露这两笔收购的具体交易条款。</p><p>在周五的活动上，Ong 还宣布了 Jupiter 即将在未来几周上线的其他重要更新，例如 Jupiter Mobile，这是一个与 MoonPay 合作开发的移动应用，Jupiter 用户可以通过 Apple 或 Google Pay 以零平台费用访问。</p><p>其他更新包括计划推出 Ape.Pro，这是其 memecoin 交易平台 Ape 的升级，旨在让用户通过社交登录在移动设备上交易和铸造 memecoin。</p><p>Jupiter 还将推出自己的 API 平台 Metropolis，为开发者提供更全面的流动性 API，涵盖代币、价格和交换 API。“通过 [Metropolis]，所有流动性需求都集中在一组 API 中，”Ong 说。</p>',
      url: 'https://tokeninsight.com/zh/news/dex-aggregator-jupiter-acquires-solanafm-coinhall?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sadv.jpeg',
      source_url:
        'https://www.theblock.co/post/317465/solana-dex-aggregator-jupiter-acquires-solanafm-coinhall',
      timestamp: 1726828850000,
      tags: [
        {
          name: 'DEX',
        },
      ],
    },
    {
      title:
        '加密货币交易所 BingX 面临一个价值约4300万美元的安全漏洞:PeckShield',
      content:
        '<p>据 The Block 报道，新加坡的加密货币交易所 BingX 的热钱包遭遇了明显的安全漏洞。PeckShield 的安全分析师估计损失达 4300 万美元的加密货币。</p><p>BingX 遭遇的安全攻击导致了资金的重大损失。PeckShield 的分析师指出，此次事件导致的加密货币损失估计为 4300 万美元，尽管交易所将其描述为“轻微”的并且可控。</p><p>PeckShield 补充说，大部分被盗资金以多个批次转移。</p><p>在此次攻击中，BingX 的首席产品官 Vivien Lin 表示，事件在新加坡时间 9 月 20 日凌晨 4 点左右被识别，当时 BingX 的技术团队检测到“异常网络访问，怀疑是针对交易所热钱包的黑客攻击”。</p><p>为了防止进一步损失，提款已被暂停，作为应急计划的一部分。“我们立即启动了应急计划，包括紧急转移资产和暂停提款。资产损失较小，”Lin 说。</p><p>该交易所表示，提款将在接下来的 24 小时内重新开放，并承诺为用户提供赔偿计划。</p><p>“到目前为止，损失很小，我们已经处理妥当。大部分资产安全存放在冷钱包中，只有小部分受到热钱包的影响，”他们声称。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-exchange-bingx-faces-an-estimated-43-million-security-exploit-peckshield?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dsfv0.jpeg',
      source_url:
        'https://www.theblock.co/post/317448/crypto-exchange-bingx-faces-an-estimated-43-million-security-exploit-peckshield',
      timestamp: 1726828550000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: 'Solana 推出新的 Seeker 设备，称这不仅仅是一个 “memecoin 手机”',
      content:
        '<p>据 Cointelegraph 报道，Solana 最新推出的 Seeker 设备将成为类似 Saga 的“奖励磁铁”，但 Solana Labs 总经理 Emmett Hollyer 表示，这不仅仅是一款“狗狗币手机”。</p><p>Solana 刚刚揭示了其最新、最闪亮的智能手机“Seeker”——其价格仅为前身 Saga 的一半，并且据团队称，它不会仅依赖于免费的狗狗币。</p><p>Saga 于去年 5 月推出，起初受到技术评论家和加密用户的差评，然而，在 12 月，名为 Bonk（BONK）的狗狗币价格突然上涨了 1000%，使设备在 12 月 16 日售罄，这堪称 Saga 的“救星”。</p><p>Solana 显然没有忘记这一点。</p><p>在其新版本中，Solana 希望为已有 14 万名预购 Seeker 的用户提供类似的奖励，这些用户已经支付了 450 到 500 美元不等的金额。</p><p>在新加坡 Token2049 大会上，Hollyer 向《币电报》表示，Seeker 将成为用户的“奖励磁铁”，但强调它不仅仅是“狗狗币手机”。</p><p>“Seeker 和 Saga 一样，将是一个奖励磁铁，同时也是团队构建全新体验的巨大机会，”Hollyer 说，并指出新设备将配备升级版的去中心化应用（DApp）商店和更好的硬件。</p><p>“这不是狗狗币手机。它将支持网络上的所有优秀用例，无论是狗狗币、去中心化金融（DeFi）、支付还是游戏。”</p><p>Hollyer 表示，他希望一个开放且不受限制的 DApp 商店能够让开发者迅速推出和部署新应用，以更好地捕捉新兴的叙事和用例。</p><p><strong>新硬件，够吗？</strong><br>Solana 还希望通过更好的硬件吸引买家。</p><p>Solana 的 Saga 去年因其技术能力与 iPhone 或 Google Pixel 等设备相比而受到批评。</p><p>Hollyer 表示，这款手机将拥有更高质量的屏幕、更好的摄像头和升级的电池，使其“比前身更轻、更亮、更好”，但没有进一步详细说明。</p><p>然而，Hollyer 解释说，Solana 并不打算直接与 Apple 和三星等移动设备巨头竞争，而是专注于创造一种尽可能为用户提供加密实用性的手持设备。</p><p>“我们有不同的目标和用户群。但幸运的是，随着年份的推移，许多高端手机硬件变得越来越可获得，”Hollyer 说。</p><p>尽管如此，那些期待狗狗币丰厚回报的人可能还需耐心等待。</p><p>根据 Solana 移动空投检查工具 TwoLoot 的数据，在发布时，Seeker 设备用户收到的空投代币的当前价值仅为 265 美元，远低于 Saga 上锁定的 1350 美元的空投。</p><p>Hollyer 认为，尽管奖励是新设备销售宣传的重要部分，Seeker 还将为用户提供广泛的新加密集成体验。</p><p>“奖励是故事的一部分，但我认为很多用户开始看到事情发展的方向。”</p>',
      url: 'https://tokeninsight.com/zh/news/solana-unveils-new-seeker-device-says-it-s-not-just-a-memecoin-phone?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dasf97.jpeg',
      source_url:
        'https://cointelegraph.com/news/solana-unveils-seeker-smartphone-upgrade-to-saga',
      timestamp: 1726739455000,
      tags: [
        {
          name: 'Solana',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 昨日净流出 5280 万美元，打破了连续四天的资金流入',
      content:
        '<p>据 The Block 报道，Ark 和 21Shares 的 ARKB 在周三的现货比特币 ETF 中领衔净流出，金额为 4341 万美元。</p><p>美国的现货以太坊 ETF 也录得约 970 万美元的日净流出。</p><p>美国的现货比特币交易所交易基金在周三报告了 5283 万美元的净流出，结束了连续四天的净流入，期间吸引了超过 5 亿美元的资金。</p><p>根据 SoSoValue 的数据，昨日的流出主要由 Ark Invest 和 21Shares 的 ARKB 领衔，流出金额为 4341 万美元。周三，Grayscale 的 GBTC 报告了 813 万美元的净流出，Bitwise 的 BITB 记录了 395 万美元的流出。</p><p>昨日仅有一个现货比特币基金报告了净流入——Grayscale 的 Bitcoin Mini Trust 录得 266 万美元的小额净流入。其余八个基金，包括 BlackRock 的 IBIT，均未出现日流入。</p><p>周三，这 12 个基金的总日交易量为 16.3 亿美元，累计净流入总额为 174.4 亿美元。</p><p><strong>现货以太坊 ETF 持续流出</strong><br>现货以太坊 ETF 报告了 974 万美元的流出，只有九个基金中的两个在周三有净变动，标志着它们连续第三天出现净流出。</p><p>Grayscale 的 ETHE 基金流出 1466 万美元，而 BlackRock 的 ETHA 则增加了 492 万美元的流入。</p><p>这九个以太坊基金的总日交易量为 2.2188 亿美元，高于周二的 1.7626 亿美元。自 7 月推出以来，这些 ETF 总共录得 6.1558 亿美元的净流出。</p><p><strong>比特币价格超过 62,000 美元</strong><br>“鲍威尔主席给风险市场带来了他们想要的 50 个基点的降息，但明确通过自信的声明对较大幅度的降息进行了对冲，重申经济软着陆仍然是基本情况，并多次表示美国经济‘运转良好’，”SOFA.org 的洞察主管 Augustine Fan 说。“市场预计在 FOMC 之后，11 月降息 50 个基点的机会约为 1/3，非农就业数据将自然成为投资者关注的最重要数据点。”</p><p>Fan 还补充道，比特币因强劲的股市波动而恢复，其他替代币表现强劲，显示出整体风险情绪的增长。以太坊价格上涨 4.14%，至 2414.60 美元，Solana 在过去一天上涨 6.21%，交易价格为 138.96 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-logged-52.8-million-in-net-outflows-yesterday-breaking-four-day-streak-of-inflows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/df87sa.jpeg',
      source_url:
        'https://www.theblock.co/post/317244/us-spot-bitcoin-etfs-52m-outflows',
      timestamp: 1726739136000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 昨日净流入 1.87 亿美元，比特币价格徘徊在 6 万美元左右',
      content:
        '<p>据 The Block 报道，美国现货比特币 ETF 在周二录得净流入 1.87 亿美元，使其正向走势延续至四天。随着预期降息的到来，比特币在周三的关键 FOMC 会议前保持在 60,000 美元的水平。与此同时，美国现货以太坊 ETF 连续第二天出现净流出，流出金额为 1500 万美元。</p><p>美国现货比特币交易所交易基金（ETF）在周二注册了净流入 1.868 亿美元，延续了其四天的正向走势，总额超过 5 亿美元。</p><p>根据 CoinGlass 的数据，BlackRock 的 IBIT ETF 在周一产生了三周以来首次的正流入，但在周二又回到了零流入，Fidelity 的 FBTC 主导了净流入，带来了 5660 万美元。</p><p>Bitwise 的 BITB 和 Ark Invest 的 ARKB 分别以 4540 万美元和 4220 万美元的净流入金额位列第二和第三。VanEck 的 HODL 产生了 2050 万美元的正流入，而 Invesco 的 BTCO 流入了 1020 万美元，Franklin Templeton 的 EZBC 流入了 870 万美元，WisdomTree 的 BTCW 流入了 320 万美元，资金流动呈现多样化。</p><p>周二没有任何美国现货比特币 ETF 出现净流出，包括 Grayscale 的高费用 GBTC 在内的其他基金当天也没有流入。</p><p>从 8 月 27 日到 9 月 6 日，现货比特币 ETF 录得连续日净流出的创纪录时期，总额接近 12 亿美元。然而，自那时以来，它们已产生了 6.035 亿美元的正流入，并自 1 月交易开始以来总共产生了近 175 亿美元的净流入。</p><p>“看起来‘degen 零售’在随机的周二又投入了大约 2 亿美元到现货比特币 ETF……在推出 8 个月后，”ETF Store 总裁 Nate Geraci 在 X 上发布。“Fidelity 比特币 ETF 现在的管理资产超过 100 亿美元。iShares [BlackRock] 比特币 ETF 超过 210 亿美元。现货比特币 ETF 是 2024 年前四大 ETF 推出的产品。而且大多数大型金融机构仍未批准它们。”</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-logged-187-million-in-net-inflows-yesterday-as-btc-hovers-around-60-000?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/袜df098.jpeg',
      source_url:
        'https://www.theblock.co/post/317043/us-spot-bitcoin-etfs-fomc',
      timestamp: 1726656244000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Circle 将在 Sui 上推出 USDC，这是其第 15 次网络整合',
      content:
        '<p>据 The Block 报道，Circle 正在 Layer 1 区块链 Sui 上推出其 USDC 稳定币。这标志着自 2018 年推出 USDC 以来，Circle 的第十五个网络整合。</p><p>Circle 是第二大稳定币的发行者，计划最早在下周在 Layer 1 区块链 Sui 上推出一种以美元计价的代币，Circle 的联合创始人兼首席执行官 Jeremy Allaire 在周二表示。此举伴随着稳定币巨头的一系列公告，包括与 MoviePass 的整合，使用户能够用加密货币支付订阅费用，以及 USDC 在巴西和墨西哥上线的消息。</p><p>这是 Circle 自 2018 年通过与 Coinbase 的联合合作推出 USDC 以来的第十五次区块链整合。根据《区块链》的价格页面，该代币是第六大加密货币，市值和流通供应量为 350 亿美元。</p><p>Sui 网络的本地代币 SUI 在这一消息发布后上涨超过 10%，目前交易价格为 1.15 美元。</p><p>Mysten Labs 的首席产品官 Adeniyi Abiodun 在一份声明中表示：“USDC 作为 Sui 的本地资产的可用性标志着 Sui 生态系统成熟的另一个重要里程碑。”Adeniyi 指出，此次推出将有助于增强网络的跨链和链内功能。</p><p>Sui 于 2023 年推出，是一个为运行去中心化应用程序而构建的区块链网络。其技术主要源于 Facebook（现为 Meta）在其失败的 Libra（后改为 Diem）稳定币项目上的研究与开发，包括其专门的编程语言 Move（该语言也被竞争网络 Aptos 使用）。</p><p>Circle 将通过其跨链转移协议（CCTP）在 Sui 上推出 USDC，这是一个用于在不同区块链上铸造、销毁和转移代币的链上平台。</p><p>Circle 在其网站的信息页面上表示：“基于 CCTP 构建的应用可以本质上将 USDC 从一个区块链传送到另一个区块链，为用户提供了一种在多链世界中进行交易的高度安全和资本效率的方式。”</p><p>Allaire 表示，USDC Sui 测试网将于周二上线，但数据网站 Suiscan 在发布时尚未显示合约地址。</p><p>Circle 储备基金是一个注册于 SEC 的政府货币市场基金，持有美国国债、隔夜回购协议和现金的投资组合，保管于纽约梅隆银行，由贝莱德管理，并由 Grant Thornton 进行审计。</p><p>周日，Circle 宣布计划在以太坊第二层 Soneium 上扩展 USDC，该项目是索尼与新加坡的 Startale Labs 联合打造的。</p>',
      url: 'https://tokeninsight.com/zh/news/circle-is-launching-usdc-on-sui-marking-its-15th-network-integration?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/adsf976.jpeg',
      source_url:
        'https://www.theblock.co/post/316936/circle-is-launching-usdc-on-sui-marking-its-15th-network-integration',
      timestamp: 1726653917000,
      tags: [
        {
          name: 'Circle',
        },
        {
          name: 'Layer 1',
        },
      ],
    },
    {
      title:
        'MicroStrategy 增加了 18300 个比特币，现在持有价值 141.4 亿美元的比特币',
      content:
        '<p>据 Cointelegraph 报道，MicroStrategy 的 11.1 亿美元比特币购买资金来自于通过销售超过 800 万公司股票的销售协议。</p><p>MicroStrategy 是一家上市的商业智能和软件公司，已宣布在 8 月 6 日至 9 月 12 日之间收购了大约 18,300 个比特币。</p><p>该公司向美国证券交易委员会提交的 8-K 表格显示，此次购买价值 11.1 亿美元，平均每个比特币的购买价格为 60,408 美元，包括费用和开支。</p><p>该公司由首席执行官迈克尔·塞勒领导，过去四年间持续扩大其比特币持有量，自 2020 年 8 月 11 日首次购买以来一直如此。</p><p><strong>比特币持有量增长</strong><br>该公司的最新收购使其比特币持有量增加至约 244,800 个比特币，目前价值约 141.4 亿美元。</p><p>自 2020 年 8 月以来，MicroStrategy 的比特币购买平均价格为每个比特币 38,585 美元，累计投资约 94.5 亿美元。</p><p>MicroStrategy 的激进策略多年来引发了金融分析师的争论和赞扬，但该公司并未放缓比特币的收购。</p><p><strong>比特币购买资金来源</strong><br>用于购买这 18,300 个比特币的资金是通过出售公司股票筹集的，这一过程得到了与几家金融机构于 8 月 1 日签署的销售协议的支持。</p><p>根据 SEC 文件，MicroStrategy 到 9 月 12 日通过“根据销售协议出售的总计 8,048,449 股股票”筹集了约 11.1 亿美元。</p><p>出售这超过 800 万股股票所筹集的资金被直接用于扩大公司的比特币持有量和增加其投资组合的规模。</p><p><strong>MicroStrategy 的投资回报</strong><br>截至 8 月 10 日，MicroStrategy 持有 226,500 个比特币，价值 137.7 亿美元，平均购买价格为每个比特币 37,000 美元。</p><p>当时，比特币的价格约为 60,500 美元，MicroStrategy 拥有 53.9 亿美元的未实现利润。自 2020 年 8 月以来，其表现有效超越了标准普尔 500 指数。</p><p>自 2020 年 8 月以来，MicroStrategy 的股票价值增长了约 1,000%，相当于同期 SPX 回报的 16.25 倍以上。</p>',
      url: 'https://tokeninsight.com/zh/news/microstrategy-adds-18-300-bitcoin-now-holds-14.14b-worth-of-btc?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sdaou.jpeg',
      source_url:
        'https://cointelegraph.com/news/microstrategy-acquires-18300-btc-raising-holdings-to-244800',
      timestamp: 1726310701000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '灰度将推出美国瑞波币信托，为潜在 ETF 铺平道路',
      content:
        '<p>据 Cointelegraph 报道，Grayscale XRP Trust 可能为 XRP ETF 的推出铺平道路，但需获得美国证券交易委员会的批准。</p><p>Grayscale Investments 是一家主要的加密货币投资公司，现推出与 XRP 加密货币相关的新加密信托。</p><p>Grayscale 于 9 月 12 日正式宣布创建并公开推出 Grayscale XRP Trust，使投资者能够接触到 XRP。</p><p>该公司指出，Grayscale XRP Trust 立即对符合条件的个人和机构合格投资者开放每日认购。它的运作方式类似于 Grayscale 的其他单一资产投资信托，完全投资于支撑 XRP 分类账（XRPL）的代币。</p><p><strong>加密信托与加密 ETF 的区别</strong><br>根据 Fox Business 的报告，Grayscale XRP Trust 的推出可能为 XRP 交易所交易基金（ETF）铺平道路，这是一种不同的产品。</p><p>“由于 ETF 是直接面向零售投资者销售的，因此必须获得证券交易委员会的批准，而信托的结构和面向所谓合格投资者的销售策略则受到较轻的监管，”Fox Business 的 Eleanor Terrett 报道。</p><p>报告还提到，Grayscale 已发布 XRP 信托的四阶段产品生命周期计划，这可能暗示将来有可能推出 XRP ETF。</p><p>“每个产品旨在遵循四个阶段的生命周期——最终目标是将该产品提升为 ETF，”Grayscale 在专门的常见问题页面上表示。“随着产品在预定生命周期中的推进，投资者的接触和透明度也会相应增加，”该公司指出。</p><p><strong>Grayscale 表示 XRP 拥有“重要的现实世界应用案例”</strong><br>在公告中，Grayscale 的产品和研究负责人 Rayhaneh Sharif-Askary 指出，Grayscale XRP Trust 使投资者能够接触到“具有重要现实世界应用案例”的协议。他补充道：</p><p>“通过促进仅需几秒钟即可完成的跨境支付，XRP 有潜力改变传统金融基础设施。”</p><p>XRP 分类账是一个去中心化的公共区块链，由全球商业和开发者社区领导。XRPL 旨在提供多种应用案例，如跨境支付解决方案、代币化和去中心化金融。</p><p>Grayscale Investments 是全球最大的比特币投资公司之一，持有 222,300 BTC（价值 128 亿美元）在其现货 BTC ETF，即 Grayscale Bitcoin Trust ETF（GBTC）中。</p><p>自 1 月首次推出 GBTC 以来，Grayscale 已成为最大的比特币卖家之一。它持续从 ETF 中出售数十亿美元的 BTC。</p><p>在 7 月推出两个现货以太坊 ETF 后，Grayscale 也在新产品中出现了数十亿美元的资金流出。</p>',
      url: 'https://tokeninsight.com/zh/news/grayscale-to-launch-us-xrp-trust-paving-way-for-potential-etf?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/jgcd7.jpeg',
      source_url:
        'https://cointelegraph.com/news/grayscale-us-xrp-trust-potential-etf',
      timestamp: 1726310287000,
      tags: [
        {
          name: '灰度基金',
        },
      ],
    },
    {
      title: 'ZKsync 通过链上合约激活去中心化治理系统',
      content:
        '<p>据 The Block 报道，ZKsync 已正式启动其治理模型，智能合约现已在主网上激活。</p><p>与 EVM 兼容的扩展解决方案 ZKsync 正式推出了其治理模型，该模型包括现已在主网上激活的智能合约。</p><p>新激活的治理系统建立在去中心化模型上，允许社区参与制定协议未来的集体决策。该模型围绕三个核心机构构建：代币大会、安全委员会和守护者，旨在实现治理权力的平衡分配，ZKsync 在一篇博文中详细说明。</p><p>治理系统的设计声称没有任何单一方拥有绝对控制权。代币大会允许代币持有者及其代表直接提议和投票决定变更。安全委员会由安全专家组成，负责审查和批准代码更改。守护者拥有否决权，以确保所有决策符合 ZKsync 生态系统的核心价值观。</p><p>Matter Labs 于 2023 年 3 月推出了其 Era 主网。2024 年 6 月，该项目公布了其治理系统的详细计划，并推出了 ZK 代币及其空投。</p>',
      url: 'https://tokeninsight.com/zh/news/zksync-activates-decentralized-governance-system-with-onchain-contracts?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sadcvgb.jpeg',
      source_url:
        'https://www.theblock.co/post/316327/zksync-activates-decentralized-governance-system-with-onchain-contracts',
      timestamp: 1726223895000,
      tags: [
        {
          name: 'zkSync Era',
        },
        {
          name: '治理',
        },
      ],
    },
    {
      title: 'Starknet 社区批准在 2024 年底前实施 STRK 代币的投票',
      content:
        '<p>据 The Block 报道，Starknet 已批准一项名为“SNIP 18”的治理提案，以在其网络内实施质押。</p><p>该提案由 StarkWare 提交，获得了大多数 STRK 代币持有者的批准。</p><p>以太坊第二层解决方案 Starknet 已批准一项治理投票，以在其网络内实施质押，网络将根据总质押代币的数量向质押者支付奖励。</p><p>今天早些时候，由核心开发者 StarkWare 提交的提案——称为“SNIP 18”——获得了大多数 STRK 代币持有者的批准。</p><p>在提案获批后，Starknet 代币质押可能很快在测试网上线，随后在今年第四季度上线主网。</p><p>Starknet 将允许至少持有 20,000 STRK 的代币持有者成为质押者，其他人可以将代币委托给他们。投票中还批准了一种铸造机制，旨在平衡奖励质押者与设定通货膨胀预期之间的关系。</p><p>在资金可以撤回之前，还将有一个 21 天的时间锁定期。</p><p>根据 StarkWare 的说法，这次质押治理投票是进一步基础设施去中心化的步骤。“这是 Starknet 朝着完全去中心化迈进的历史性里程碑。作为首批为代币持有者提供这一机会的第二层解决方案之一，我们正在朝着一个由社区完全运营和管理的网络迈进，”StarkWare 的首席执行官 Eli Ben-Sasson 说。</p><p>展望未来，网络计划分阶段引入更多治理功能和质押者的责任，包括他们在去中心化网络的排序器和证明器中的潜在角色。</p>',
      url: 'https://tokeninsight.com/zh/news/starknet-community-approves-vote-to-implement-strk-token-staking-by-end-of-2024?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdf7a6bgd].jpeg',
      source_url:
        'https://www.theblock.co/post/316341/starknet-community-approves-vote-to-implement-strk-token-staking-by-end-of-2024',
      timestamp: 1726223687000,
      tags: [
        {
          name: '治理',
        },
        {
          name: 'DAO',
        },
        {
          name: '质押',
        },
      ],
    },
    {
      title:
        '在辩论后的下跌中，Ark Invest 购买了价值 840 万美元的 Coinbase 股票',
      content:
        '<p>据 The Block 报道，Ark Invest 于周三购买了 53,708 股 Coinbase 股票，价值 840 万美元，因为该投资公司在美国总统辩论后加密市场价格下跌的背景下重新调整了其基金的权重。这是 Ark 自 8 月初低点以来首次买入或卖出 Coinbase 股票。</p><p>Ark Invest 在周三通过其三个交易所交易基金（ETF）购买了 53,708 股 Coinbase 股票，价值 840 万美元，此时加密市场在周二晚上的美国总统辩论后出现了广泛下跌。</p><p>根据该公司的最新交易文件，由 Cathie Wood 领导的投资公司为其创新 ETF（ARKK）购买了 38,475 股（600 万美元），为下一代互联网 ETF（ARKW）购买了 9,349 股（150 万美元），以及为其金融科技创新 ETF（ARKF）购买了 5,884 股（92.5 万美元）。</p><p>这是 Ark 自 8 月初以 2180 万美元的价格收购 COIN 以来首次为其基金买入或卖出 Coinbase 股票，当时加密市场处于低迷状态，比特币价格曾短暂跌破 55,000 美元。</p><p>Ark 的投资策略是让任何单个持仓不超过 ETF 投资组合的 10%。这旨在保持其基金的多样化——这意味着如果 Coinbase 股票的价值相对于 Ark 基金中的其他持仓显著上涨或下跌，Ark 很可能会继续调整其权重。</p><p>根据该公司的披露，截至 9 月 12 日，COIN 现在是其 ARKK ETF 中的第四大持仓，权重为 6.5%，约为 3.55 亿美元。COIN 是其 ARKW 基金中的第六大持仓，权重为 5.1%，价值 6700 万美元。在 ARKF 基金中，Coinbase 股票是 Ark 的第二大持仓，权重为 7.3%，价值 6000 万美元。</p>',
      url: 'https://tokeninsight.com/zh/news/ark-invest-buys-8.4-million-worth-of-coinbase-shares-amid-post-debate-dip?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/wadsf987.jpeg',
      source_url:
        'https://www.theblock.co/post/316069/ark-invest-coinbase-shares-presidential-debate',
      timestamp: 1726138441000,
      tags: [
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: '叫车平台 TADA 推出 Telegram 小应用程序，支持 TON 或 USDT 预订',
      content:
        '<p>据 The Block 报道，东南亚打车平台 TADA 与 TON 基金会合作推出了一个新的 Telegram 迷你应用程序。该迷你应用允许用户直接在 Telegram 上预订乘车，并使用 Toncoin 或 USDT 在 TON 区块链上支付。</p><p>TADA mini 使 Web3 用户能够直接在 Telegram 上预约乘车，无需额外注册或下载应用程序，并可以使用 Toncoin 或在 TON 区块链上支付.</p><p>TON 基金会韩国负责人 Harvey Kim 表示：“如果我们想加速 Web3 解决方案的成功采用，与激动人心的 Web2 平台建立强有力的合作关系至关重要，这样可以让用户快速熟悉 Web3 的众多好处。这个合作对我们来说是一个重要的里程碑，因为我们希望继续推动 TON 区块链在东南亚的增长。”</p><p>为了展示这一新服务，两家机构计划在 9 月 14 日至 18 日于新加坡举行的 TOKEN2049 加密会议期间提供 4000 次免费乘车。</p><p>MVL（TADA 的母公司）首席信息官 James Yang 说：“在 TADA，我们一直专注于使骑手和司机受益的创新。TADA mini 不仅简化了打车过程，还通过在现实应用中使用数字资产为未来做好准备。展望未来，TADA mini 计划扩展到新的地区，旨在向更广泛的受众提供这一服务。”</p><p>TADA 成立于 2018 年，目前在新加坡、泰国、越南和柬埔寨运营，并计划在今年年底前扩展到香港。</p><p><strong>Telegram 在 TON 区块链相关点击游戏热潮中推出迷你应用商店</strong><br>Telegram 迷你应用是轻量级的基于网络的应用程序，可以嵌入并直接在流行的消息平台中访问。</p><p>近日，Telegram 在加密领域扩大了影响力，数百万玩家使用该消息应用玩如 Hamster Kombat、Notcoin 和 Yescoin 等点击赚取游戏，希望在 TON 区块链上赚取相应的代币。</p><p>为了利用这些游戏的爆炸性增长，Telegram 还在 7 月推出了迷你应用商店和支持 Web3 页面内置浏览器。</p>',
      url: 'https://tokeninsight.com/zh/news/ride-hailing-platform-tada-launches-telegram-mini-app-enabling-bookings-in-ton-or-usdt?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/9ad7v.jpeg',
      source_url:
        'https://www.theblock.co/post/316062/tada-ride-hailing-telegram-mini-app-ton-usdt',
      timestamp: 1726138126000,
      tags: [
        {
          name: '支付',
        },
        {
          name: '传统行业',
        },
      ],
    },
    {
      title: '印尼 Indodax 交易所因明显的攻击而面临 2000 万美元的损失',
      content:
        '<p>据 The Block 报道，印尼加密货币交易所 Indodax 表示已发现其平台上的安全问题，Cyvers 估计损失可能超过 2000 万美元。</p><p>Indodax 还表示，正在进行维护，其网站和应用程序目前无法访问。</p><p>印尼加密货币交易所 Indodax 似乎经历了一次攻击，导致估计损失达到 2050 万美元。</p><p>区块链安全公司 Cyvers 的 Yosi Hammer 表示：“我们发现了针对 Indodax 热钱包的重大安全漏洞，导致在多个链上损失超过 2050 万美元。”他补充道：“我们的实时监控系统在最初阶段发现了 160 个关键红旗，最开始是 660 ETH 的转移。”</p><p>PeckShield 今天早些时候在 X 上写道，他们检测到 Indodax 出现大额加密货币流出，价值约 1570 万美元。根据 PeckShield 的数据，约有 5204 ETH 存放在以太坊上的一个地址，还有大约 680 万 POL 存放在 Polygon 上，以及约 380 ETH 存放在 Optimism 上。</p><p>针对报告的安全事件，Indodax 在 X 上发布消息称，其安全团队发现了平台上的潜在安全问题。Indodax 在翻译的帖子中表示：“目前，我们正在进行全面维护，以确保整个系统正常运行。在此维护过程中，Indodax 网络平台和应用程序将暂时无法访问。”</p><p>Indodax 声称其客户的资金在加密货币和印尼盾中均“100% 安全”。</p><p>Indodax 团队尚未立即回应《区块链》关于进一步评论的请求。</p>',
      url: 'https://tokeninsight.com/zh/news/indonesian-exchange-indodax-faces-20-million-loss-from-apparent-exploit?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdv976.jpeg',
      source_url:
        'https://www.theblock.co/post/315744/indodax-15-million-loss-exploits-peckshield',
      timestamp: 1726051586000,
      tags: [
        {
          name: '交易所',
        },
        {
          name: '平台币',
        },
      ],
    },
    {
      title: '辩论结束后，哈里斯在 Polymarket 的获胜几率与特朗普持平',
      content:
        '<p>据 The Block 报道，哈里斯和特朗普在 Polymarket 的 8.6 亿美元预测市场中目前各有 49% 的获胜机会。根据民调，哈里斯在辩论中的获胜几率为 94%。</p><p>在辩论前，比特币短暂突破 58,000 美元，但在电视辩论期间跌至 56,700 美元的低点。</p><p>美国副总统卡马拉·哈里斯在即将到来的 11 月选举中的获胜几率在加密预测平台 Polymarket 上因周二晚上的总统辩论而上升。现在，哈里斯和前总统唐纳德·特朗普在 Polymarket 的 8.6 亿美元市场中处于平局。</p><p>周二晚上，哈里斯与特朗普之间举行了即将到来的选举前的首次也是可能最后一次总统辩论，讨论了加沙战争和堕胎权等多个反复出现的话题，但没有提及加密货币。根据尚未披露的民调，投注者在 Polymarket 上对哈里斯赢得辩论的概率给予了 94% 的支持。</p><p>哈里斯在总统选举中的获胜概率从周一晚上的 46% 上升至 49%，而特朗普的获胜概率则从 52% 降至 49%。特朗普在表达支持加密货币的观点上相当直言，而哈里斯则开始与加密行业接触，尽管她尚未对该行业采取明确立场。</p><p>Presto Research 的分析师 Min Jung 告诉《区块链》，尽管辩论没有特别提到加密货币，但哈里斯的支持概率在 Polymarket 上正在上升，“这可能对加密市场不太有利。”</p><p>在辩论开始前，比特币短暂突破 58,000 美元，并在较高水平徘徊，但在辩论期间跌至约 56,700 美元的低点。根据《区块链》的比特币价格页面，目前交易价格为 56,797 美元。</p><p>加密市场制造商 Keyrock 的亚太区业务发展负责人 Justin d\'Anethan 表示，辩论进行时比特币更像是一个“冷静的观察者”。他说：“加密市场在关注，但尚未反应——至少现在还没有。比特币继续表现得像其他风险资产，与科技股和增长型股票一起波动，在通胀恐慌、利率不确定性和全球政治动荡的混合环境中寻找方向。”</p><p>d\'Anethan 补充道：“辩论本身无疑是一个重要时刻，为美国未来的两种不同愿景之间的可能斗争定下基调。然而，对比特币来说，它需要更具体的东西。目前，比特币似乎在等待一个催化剂——无论是来自宏观经济方面的意外变化，如美联储政策的改变，还是来自政治领域的重大事件，如丑闻或选举民调的意外转变。”</p><p><strong>PolitiFi 代币下跌</strong><br>受特朗普和哈里斯启发的 PolitiFi 代币在过去一小时内下跌。市值 1380 万美元的 Super Trump（代码：STRUMP）在过去一小时内下跌 6.8%，而 Kamala Horris（KAMA）下跌 5.7%，根据 Coingecko 数据，MAGA（TRUMP）微跌 0.2%。</p><p>Presto 的研究主管 Peter Chung 表示：“市场对哈里斯在辩论中的表现似乎超过预期做出了迅速反应。” “这一点从 PolitiFi 代币大幅波动的时机可以看出，所有波动都始于东部时间晚上 9 点后，即辩论开始的时间。”</p><p>Keyrock 的 d\'Anethan 表示，随着辩论的持续发酵和 Twitter 上的党派热情，PolitiFi 代币可能会出现一些波动。“投机者可能会利用任何在短期内感知到的情绪变化，但由于流动性低和关注度下降，这些波动很可能是短暂的。”</p>',
      url: 'https://tokeninsight.com/zh/news/harris-winning-odds-on-polymarket-rise-to-tie-with-trump-after-debate?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/fsd87.jpeg',
      source_url:
        'https://www.theblock.co/post/315749/harris-winning-odds-on-polymarket-rise-to-tie-with-trump',
      timestamp: 1726051249000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'durov 被捕后，TON 创下交易新高，代币价格暴跌 30%',
      content:
        '<p>据 The Block 报道，自 Telegram 创始人帕维尔·杜罗夫于 2024 年 8 月 24 日被法国当局逮捕以来，TON 网络的每日交易量 7 天移动平均（7DMA）增长了 160%。</p><p>以下是《区块链》数据与洞察新闻简报的摘录。</p><p>杜罗夫被捕后，网络活动呈指数级增长，网络交易和活跃地址数量大幅上升。TON 网络的每日交易量 7 天移动平均（7DMA）达到了历史新高。网络在 8 月 31 日的交易量达到了 868 万笔，超过了 1 月 17 日创下的 856 万笔的前纪录。</p><p>在过去一周内，这一数字持续增长，周五交易量超过了 1000 万笔。自杜罗夫被捕以来，这一数字已增长超过 160%。</p><p>TON 网络每日活跃地址的 7 天移动平均（7DMA）也达到了历史新高。截至周五，TON 网络的活跃地址数量约为 701,800 个，比上周五增加了 6%。</p><p>然而，与网络活动不同的是，TON 代币的价格对杜罗夫的逮捕反应不佳。自事件发生以来，TON 代币下跌超过 30%。</p><p>尽管市场整体状况不佳可能也对这一下跌产生了影响，但逮捕的效果不可忽视，因为在消息发布后的三小时内，TON 代币大约下跌了 20%。</p><p>这是《区块链》数据与洞察新闻简报的摘录，深入探讨构成行业最具启发性趋势的数据。</p>',
      url: 'https://tokeninsight.com/zh/news/ton-hits-record-transaction-highs-post-durov-arrest-while-token-price-plummets-30?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/ds976.jpeg',
      source_url:
        'https://www.theblock.co/post/315360/ton-hits-record-transaction-highs-post-durov-arrest-while-token-price-plummets-30',
      timestamp: 1725964994000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 恢复正流量，增加 2800 万美元',
      content:
        '<p>据 The Block 报道，富达的 FBTC 在周一的现货比特币 ETF 中引领资金流入。</p><p>现货以太坊 ETF 继续出现负流出，已连续第五天录得净流出。</p><p>美国的现货比特币交易所交易基金（ETF）在周一结束了连续八天的负流出，报告净流入 2872 万美元。</p><p>根据 SoSoValue 的数据，富达的 FBTC 昨天引领资金流入，金额为 2860 万美元，Bitwise 的 BITB 紧随其后，流入 2199 万美元。</p><p>Ark Invest 和 21Shares 的 ARKB 录得较小的流入，金额为 681 万美元，而 Invesco 的 BTCO 流入 314 万美元。</p><p>周一的流入被灰度的 GBTC 流出的 2276 万美元所抵消。黑石的 IBIT 作为最大的现货比特币 ETF，录得 906 万美元的净流出。自 8 月 26 日以来，IBIT 一直出现流出或零流动。</p><p>这 12 只比特币 ETF 在周一的总日交易量为 16.1 亿美元，低于上周五的 23.9 亿美元。自 1 月推出以来，它们累计净流入 169.2 亿美元。</p><p>虽然现货比特币 ETF 在 3 月的高峰期间见证了更高的交易量和更大的流入，Bitwise 的首席投资官 Matt Hougan 最近表示：“投资顾问对比特币 ETF 的采用速度超过了历史上任何新的 ETF。” Hougan 引用了数据，显示黑石的现货比特币基金已获得投资顾问 15 亿美元的投资。</p><p>以太坊 ETF 继续出现流出<br>美国的现货以太坊 ETF 再次出现净流出，总额为 520 万美元，周一标志着连续第五天的负流出。</p><p>根据 SoSoValue 的数据，灰度的 ETHE 报告了 2264 万美元的净流出，它是周一唯一报告流出的现货以太坊 ETF。相比之下，灰度以太坊迷你信托（ETH）录得 797 万美元的流入。</p><p>富达的 FETH 流入 762 万美元，Bitwise 的 ETHW 录得 185 万美元的净流入。</p><p>这九只 ETF 的总日交易量在周一降至 1.2451 亿美元，而上周五为 2.1043 亿美元。它们的累计净流动仍为负，净流出 5.7349 亿美元。</p><p>市场现在正关注定于周二举行的唐纳德·特朗普与卡马拉·哈里斯之间的首次美国总统选举辩论，因为加密货币已成为主要的选举话题之一。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-return-to-positive-flows-adding-28-million?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sd87.jpeg',
      source_url:
        'https://www.theblock.co/post/315493/us-spot-bitcoin-etfs-return-to-positive-flows-adding-28-million',
      timestamp: 1725964705000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
        {
          name: '灰度基金',
        },
      ],
    },
    {
      title: '比特币、以太币依然低迷，美国经济数据表现平平',
      content:
        '<p>据 The Block 报道，比特币保持在 55,000 美元以下，而以太坊交易价格低于 2,300 美元，此前美国非农就业数据低于预期。</p><p>现在，市场正在关注本周更多的美国通胀数据以及哈里斯与特朗普之间的首次总统辩论。</p><p>在周五公布的疲软美国经济数据后，比特币和以太坊在周末下滑，仍然低于关键价格水平。</p><p>在撰写本文时，比特币交易价格为 54,744 美元，过去 24 小时上涨 0.64%。根据《区块链》的加密货币价格页面，以太坊（ETH）上涨 0.17%，交易价格约为 2,291 美元。</p><p>周五公布了最新的美国非农就业（NFP）数据，这是衡量国家就业、通胀和整体经济健康的重要指标。美国 8 月非农就业人数增加 14.2 万人，低于市场预期的 16 万人。</p><p>SOFA.org 的洞察主管 Augustine Fan 表示：“加密货币需要近乎完美的非农数据组合才能看到更高的价格。相反，我们收到的是最坏结果之一，风险情绪的重新定价拖累了比特币和以太坊。”</p><p>Fan 还表示，最新数据表明，美国私营部门的增长正朝着“十多年来最疲软的增长”发展，经济衰退看起来比预期更为迫近。</p><p>然而，同一天发布的美国失业率传递了积极信号，降至 4.2%。Metalpha 的高级分析师 Lucy Hu 表示：“较低的失业数字减轻了即将到来的衰退担忧。然而，目前似乎低于预期的就业数据主导了市场情绪。”</p><p>本周还有更多消息<br>Metalpha 的 Hu 表示，反应比股票市场更强烈的加密市场将在下次美联储会议之前继续表现出显著的波动性。下一次联邦公开市场委员会会议将于 9 月 17 日至 18 日举行。</p><p>SOFA.org 的 Fan 表示：“接下来的一周可能会因缺乏积极催化剂而看到更多风险降低。” “重点将放在周二的美国总统辩论上，以及全球范围内忙碌的通胀数据和中央银行演讲。”</p><p>美国总统候选人唐纳德·特朗普和卡马拉·哈里斯预计将举行首次电视辩论。根据报道，最新民调显示两人势均力敌。加密货币已成为即将于 11 月举行的选举的主要话题之一，尽管在特朗普与现任美国总统乔·拜登的前次辩论中并未提及。</p><p>美国消费者价格指数（CPI）和生产者价格指数（PPI）数据将于周三和周四公布。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-ether-remain-subdued-as-markets-process-underwhelming-us-economic-data?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/aw9d7sf6as.jpeg',
      source_url:
        'https://www.theblock.co/post/315219/bitcoin-ether-remains-low-underwhelming-us-data',
      timestamp: 1725877629000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '巴克莱调整目标价，Block Inc.市值超过Coinbase',
      content:
        '<p>据 The Block 报道，Coinbase 的股票在本周表现疲软，市值首次跌至 Block（Square 背后的公司）之下。</p><p>巴克莱银行在周五对 Coinbase 的立场进行了调整，将其价格目标从 206 美元下调至 169 美元，但将公司的评级从“减持”上调至“持平”。</p><p>Block, Inc. 是支付处理公司 Square、音乐流媒体服务 Tidal 和比特币融资倡议 Spiral 等子公司的母公司，此次市值首次超过 Coinbase，自三月以来的首次。</p><p>由于加密市场价格下跌，Coinbase 的股票本周出现下滑，创下今年以来的最差表现。根据《区块链》的数据，Coinbase 在三月首次超过 Block Inc. 的市值。</p><p>与此同时，投资银行巴克莱将其对 Coinbase 的评级从“减持”调整为“持平”，这意味着预计在未来 12 个月内，其表现将与行业其他公司相当。巴克莱认为，监管环境的成熟、稳步多元化和强大的行业领导力表明该业务在成熟，收入可靠。</p><p>然而，该银行也将 Coinbase 股票的价格预测下调至 169 美元，低于 206 美元。Coinbase 的股票在 3 月 25 日创下 279.71 美元的年内最高点，截至周五收于 147.35 美元。</p><p>上周，Coinbase 取得了一项小胜利，纽约一名法官裁定 SEC 必须向 Coinbase 提供与该机构与公司的诉讼相关的某些文件；然而，交易所试图传唤 SEC 主席加里·根斯勒的请求被驳回。</p><p>Coinbase 首席法律官保罗·格雷瓦尔对《区块链》表示：“虽然我们可能撤回了一个特定请求，并且法官承认了一些合理的限制，但这是一个授予我们几个月来一直寻求的发现核心内容的命令。”</p>',
      url: 'https://tokeninsight.com/zh/news/block-inc.-overtakes-coinbase-in-market-capitalization-as-barclays-revises-price-target?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/玩9ef6asv.jpeg',
      source_url:
        'https://www.theblock.co/post/315184/block-inc-overtakes-coinbase-in-market-capitalization-as-barclays-revises-price-target',
      timestamp: 1725877236000,
      tags: [
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: 'Ripple 联合创始人签名支持哈里斯竞选总统',
      content:
        '<p>据 Cointelegraph 报道，Ripple 的前董事会成员 Gene Sperling 在 8 月初离开白宫，加入卡马拉·哈里斯的 2024 年总统竞选。</p><p>作为 XRP（XRP）加密货币背后的公司 Ripple 的关键高管，Chris Larsen 也在支持副总统卡马拉·哈里斯竞选总统的多位签署者中。</p><p>根据 CNBC 9 月 6 日的报道，Ripple 的联合创始人兼执行主席 Chris Larsen 已签署一封信，支持哈里斯竞选总统。</p><p>报道引用了一封由美国 88 位企业领袖签署的信，提到其他一些知名签署者，包括企业云公司 Box 的联合创始人兼首席执行官 Aaron Levie、Yelp 首席执行官 Jeremy Stoppelman、Snap 董事会主席 Michael Lynton、前 21 世纪福克斯首席执行官 James Murdoch 等。</p><p>此前，前 Ripple 董事会成员 Gene Sperling 在 8 月初离开白宫，加入卡马拉·哈里斯的 2024 年总统竞选。</p>',
      url: 'https://tokeninsight.com/zh/news/ripple-co-founder-signs-letter-endorsing-harris-for-president?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/asf7.jpeg',
      source_url:
        'https://cointelegraph.com/news/ripple-chris-larsen-endorses-kamala-harris-president',
      timestamp: 1725618466000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 流出 2.11 亿美元，延续了一连串的负流动',
      content:
        '<p>据 The Block 报道，富达的 FBTC 在周四录得最大流出，金额为 1.4949 亿美元。现货以太坊 ETF 的资金变动相对较小。</p><p>美国的现货比特币交易所交易基金（ETF）在周四录得 2.1115 亿美元的净流出，连续第七天出现负流出。</p><p>根据 SoSoValue 的数据，富达的 FBTC 在现货比特币 ETF 中流出金额最大，达 1.4949 亿美元。Bitwise 的 BITB 紧随其后，录得 3000 万美元的净流出。灰度的 GBTC 和迷你信托在周四也出现流出：GBTC 流出 2322 万美元，而迷你信托流出 845 万美元。</p><p>昨天没有基金录得净流入。包括黑石的 IBIT 在内的其他八只基金当天均无资金流动。</p><p>这 12 只 ETF 的每日总交易量进一步下降至 13.5 亿美元，低于周三的 14.1 亿美元。自 1 月推出以来，现货比特币基金已累计净流入 170.6 亿美元。</p><p>以太坊 ETF 变化不大<br>美国的现货以太坊 ETF 在周四资金变动相对较小，录得约 15.2720 万美元的净流出。</p><p>仅在灰度的两只以太坊基金中观察到了资金流动：ETHE 录得 739 万美元的净流出，而以太坊迷你信托则录得 724 万美元的净流入。其他七只 ETF 在周四没有资金流动。</p><p>以太坊基金的日交易量也降至 1.0859 亿美元，低于前一天的 1.4586 亿美元。自 7 月上市以来，这些基金累计净流出 5.6231 亿美元。</p><p>与此同时，全球市场正等待周五发布的最新美国非农就业数据，这是衡量国家经济健康的重要指标。</p><p>SOFA.org 的洞察主管 Augustine Fan 表示：“对非农就业数据的反应将是细致入微的，取决于具体细节。对股票和比特币的理想情况是，数据稍显疲软，但并不至于引发即将到来的衰退担忧，以便美联储仍然被视为在经济轨迹上走在前面或“按时”的。”</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-saw-211-million-in-outflows-extending-streak-of-negative-flows?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/asd7v.jpeg',
      source_url:
        'https://www.theblock.co/post/315023/us-spot-bitcoin-etf-another-211-million-net-outflows',
      timestamp: 1725618149000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Blockstream 推出第三系列安全令牌，提供比特币挖矿风险敞口',
      content:
        '<p>据 The Block 报道，Blockstream 已推出其 BMN2 安全代币的第三系列，该代币提供了对公司比特币算力的直接投资。该公司表示，此次推出是在投资者对比特币挖矿机会兴趣加大的背景下进行的。</p><p>周四，比特币基础设施开发商 Blockstream 推出了其安全代币 Blockstream Mining Note 2 (BMN2) 的第三系列。</p><p>BMN2 是符合欧盟规定的安全代币，面向合格的非美国投资者。它提供了对公司在北美企业级挖矿设施运营的比特币算力的投资，且与总部位于卢森堡的虚拟资产服务提供商 STOKR 合作推出。</p><p>该公司在与《区块链》分享的声明中表示，此次推出是为了响应投资者对挖矿行业兴趣的加大。</p><p>每个 BMN2 安全代币赋予持有者从 Blockstream 的挖矿算力中产生的 1 PH/s（每秒 Peta 哈希）比特币。该公司表示，该代币旨在为投资者提供战略性市场参与的通道，为下一个比特币减半前做好准备。</p><p>该代币旨在复制 Blockstream 首个挖矿票据 (BMN1) 的成功，后者于 2021 年推出并于 2024 年 7 月到期。该代币在三年期限内实现了 32% 的比特币回报，STOKR 的联合创始人兼联合首席执行官 Arnab Naskar 将其描述为“现实资产证券代币历史上最高的支付”。</p><p>尽管自 2021 年以来，比特币行业已经成熟，挖矿相关的投资产品（如算力合约和托管挖矿合约）已广泛提供给投资者，Blockstream 认为这些产品缺乏 BMN2 所能提供的二级市场流动性、长期固定利率、即时投资曝光和市场时机保护。</p><p>Blockstream 首席信息官 Chris Cook 表示：“我们深知挖矿比特币的复杂性——硬件挑战、能源削减和价格波动等。我们创建 BMN 产品的目的是提供稳定的算力，以保持强劲而稳定的投资结果。”</p><p>低于市场的算力价格<br>Blockstream 声称，自其主发行于 7 月上线以来，BMN2 已筹集近 700 万美元。它提供的投资机会可以超越现货市场的比特币购买。</p><p>此外，它还包括保护措施，如 50% 已声明算力的储备，以防止潜在的矿工故障、效率下降和其他问题。</p><p>算力价格是比特币挖矿服务公司 Luxor 提出的术语，指的是每天 1 PH/s 算力的预期价值。该指标量化了矿工从特定算力中预期获得的收益。</p><p>BMN2 第三系列提供的算力价格为每月 21.23 美元，为期 48 个月，相当于每 PH/s 固定成本 31,000 美元。根据《区块链》的数据仪表板，这一价格显著低于当前市场算力价格，后者约为 0.041 TH/s/天（41 美元 PH/s/天）。</p><p>Blockstream 声称，BMN2 的比特币挖矿操作本周开始，托管费率低于每千瓦时 0.045 美元，而企业的行业平均为 0.065 美元，零售客户为 0.075 美元，并补充说，80% 的运营用电来自碳中和来源。</p><p>Blockstream 的首席执行官兼联合创始人 Dr. Adam Back 是 HashCash 算法的发明者，该算法是工作量证明协议的基础组成部分，也是比特币安全架构的重要部分。</p>',
      url: 'https://tokeninsight.com/zh/news/blockstream-launches-third-series-of-security-token-providing-bitcoin-mining-exposure?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/四9g6.jpeg',
      source_url:
        'https://www.theblock.co/post/314852/blockstream-bitcoin-mining-security-token',
      timestamp: 1725532954000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '挖矿',
        },
      ],
    },
    {
      title: 'Synthetix 在 Optimism 的超级链基础设施上开发自己的区块链',
      content:
        '<p>据 The Block 报道，Synthetix 已推出名为 SNAXchain 的区块链，使用 Optimism 的基础设施。该网络的开发与 Conduit 建立了合作关系。</p><p>DeFi 协议 Synthetix 正在致力于在 Optimism 的 Superchain 基础设施上引入其应用链 SNAXchain。</p><p>团队宣布，SNAXchain 旨在作为治理和协议决策的中立中心，伴随 Synthetix 向更多链和 Layer 2 解决方案扩展。</p><p>该网络的开发与 Conduit 合作以提供链基础设施，并与 Wormhole 合作以实现跨链消息传递。</p><p>团队指出，Optimism Superchain 基础设施预计将增强用户互操作性，并促进 SNAXchain 的用户增长。</p><p>Optimism Superchain 生态系统中的链利用以太坊上的乐观滚动技术，降低去中心化应用程序的交易成本。该生态系统由名为 Optimism Collective 的 DAO 进行治理。生态系统的旗舰网络是 OP Mainnet，其它链包括 Base、Mode、Zora、Lyra 和 Aevo。</p><p>此次推出恰逢 Synthetix 新的治理纪元，开始进行各种治理委员会的提名。该项目补充道，候选人必须通过 SNAXchain 自行提名。</p>',
      url: 'https://tokeninsight.com/zh/news/synthetix-develops-own-blockchain-on-optimism-s-superchain-infrastructure?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/d9cf7.jpeg',
      source_url:
        'https://www.theblock.co/post/314845/synthetix-blockchain-optimism-superchain',
      timestamp: 1725532560000,
      tags: [
        {
          name: 'Optimism',
        },
        {
          name: 'Synthetix',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 净流出 2.87 亿美元，为 5 月以来最大的负流量',
      content:
        '<p>据 The Block 报道，周二，美国现货比特币 ETF 录得 2.8778 亿美元的净流出。在撰写本文时，比特币价格下跌 3.93%，报 56,680 美元。</p><p>美国现货比特币交易所交易基金（ETF）在周二继续出现负流出。</p><p>根据 SosoValue 的数据，这 12 只现货比特币 ETF 在周二录得 2.8778 亿美元的净流出，这是自 5 月 1 日以来最大的负流出。黑石的 IBIT 作为最大的现货比特币 ETF，当天没有资金流动。</p><p>灰度的 GBTC 作为第二大现货比特币 ETF，流出 5039 万美元，而富达的 FBTC 则录得最大流出，达 1.6226 亿美元。</p><p>Ark 和 21Shares 的 ARKB 录得 3360 万美元的流出，Bitwise 的 BITB 报告净流出 2496 万美元。由 VanEck、Valkyrie、Invesco 和 Franklin Templeton 管理的其他几个 ETF 也出现了小幅流出。</p><p>这些显著的流出发生在市场抛售的背景下，周二华尔街因美国 ISM 数据疲软而大幅下跌。美国 8 月 ISM 制造业指数为 47.2%，比 7 月上升 0.4 个百分点。</p><p>周二，现货比特币 ETF 的总交易量为 15.6 亿美元，而上周五为 15.4 亿美元。由于假期，美国市场在周一关闭。</p><p>以太坊 ETF 也经历了流出<br>与此同时，美国现货以太坊 ETF 在周二录得 4740 万美元的净流出，这是自 8 月 2 日以来最大的一天负流出。</p><p>灰度以太坊信托（ETHE）是当天唯一报告流出的现货以太坊 ETF，流出 5231 万美元。富达的 FETH 录得 491 万美元的净流入。其他七只现货以太坊 ETF 没有资金流动。这些以太坊 ETF 的日交易量从上周五的 1.7366 亿美元缩减至周二的 1.635 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-see-287-million-in-net-outflows-largest-negative-flows-since-may?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dswv8.jpeg',
      source_url:
        'https://www.theblock.co/post/314587/us-spot-bitcoin-etfs-see-287-million-in-net-outflows-largest-negative-flows-since-may',
      timestamp: 1725445041000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Polygon 开发人员将 MATIC 令牌转换为 POL',
      content:
        '<p>据 The Block 报道，Polygon 开发者在经过一年的广泛社区讨论后，已将 MATIC 代币迁移至 POL。</p><p>POL 现在是 Polygon PoS 链上原生燃气和质押代币的新交易符号。</p><p>经过一年的广泛社区讨论，Polygon 开发者宣布其代币迁移至 POL 已经生效。</p><p>此次变更引入 POL 作为 Polygon PoS 链上原生燃气和质押代币的新交易符号。预计交易所将会上市升级后的代币。</p><p>迁移至 POL 是 Polygon 向 ZK 链发展的关键组成部分，以及其与 AggLayer 的整合，旨在整合跨多个链的流动性和状态。POL 将维持 MATIC 现有的代币经济学，并供应 100 亿个代币。</p><p>MATIC 到 POL 的初始兑换比例设定为 1:1，未来十年将逐渐增加 2% 的发行量以支持增长。Polygon 表示：“对于验证者而言，这一发行模型确保了持续的奖励，吸引新验证者加入和参与。”</p><p>在 Polygon PoS 上的 MATIC 持有者无需采取任何步骤，因为对 POL 的升级将自动进行。然而，在以太坊、Polygon zkEVM 或集中交易所的 MATIC 持有者必须通过迁移合约主动将其代币迁移至 POL。</p><p>升级后的 POL 代币未来将扩展功能，包括在区块生产、零知识证明生成和参与数据可用性委员会 (DACs) 中的角色。</p><p>Polygon 采用了两种扩展解决方案：一个名为 Polygon PoS 的侧链和一个被称为 Polygon zkEVM 的零知识滚动网络。</p><p>POL 最早于 2023 年 7 月被提议作为网络升级后的原生代币。今年 7 月，Polygon 正式宣布 MATIC 代币将于 9 月 4 日升级为 POL。</p>',
      url: 'https://tokeninsight.com/zh/news/polygon-developers-transition-matic-token-to-pol?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/vfdds8.jpeg',
      source_url:
        'https://www.theblock.co/post/314595/polygon-developers-transition-matic-token-to-pol',
      timestamp: 1725444723000,
      tags: [
        {
          name: 'Polygon',
        },
      ],
    },
    {
      title: 'WazirX 黑客将 650 万美元的 ETH 转移到受制裁的 Tornado Cash',
      content:
        '<p>据 The Block 报道，负责 WazirX 黑客攻击的实体将价值 650 万美元的 2600 个 ETH 转移到了受制裁的混合器 Tornado Cash，以洗钱。</p><p>负责 WazirX 漏洞的黑客实体似乎已将 2600 个 ETH（价值 650 万美元）转移至美国制裁的加密货币混合器 Tornado Cash，以洗净被盗资金，安全公司 PeckShield 指出。</p><p>将资金发送到混合器是网络犯罪分子常用的一种策略，旨在使执法部门更难追踪和追回被盗的加密货币。</p><p>2024 年 7 月 18 日，加密货币交易所 WazirX 报告称其多签名钱包遭遇重大网络攻击，损失超过 2.3 亿美元。</p><p>该交易所表示，此事件影响了 WazirX 维持资产抵押品平衡的能力。</p><p>自 7 月 21 日以来，提款已被冻结，交易暂停，团队专注于部分恢复，预计损失将由用户共同承担。根据报道，重组工作可能导致用户在攻击期间无法收到其在平台上持有的加密货币的全部价值。</p><p>这一攻击被认为是朝鲜黑客组织 Lazarus Group 的所为，该组织因实施高调的攻击而臭名昭著，包括在 2022 年对 Ronin 侧链进行的 6 亿美元黑客攻击。</p>',
      url: 'https://tokeninsight.com/zh/news/wazirx-hacker-moves-6.5-million-in-eth-to-sanctioned-mixer-tornado-cash?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/edf9v7y.jpeg',
      source_url:
        'https://www.theblock.co/post/314237/wazirx-hacker-moves-6-5-million-in-eth-to-sanctioned-mixer-tornado-cash',
      timestamp: 1725360115000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Vitalik Buterin 表示，人工智能预测市场可以更快地制作 X 社区笔记',
      content:
        '<p>据 Cointelegraph 报道，维塔利克·布特林表示，X 的社区笔记最大的批评是它们出现得不够快。</p><p>以太坊联合创始人维塔利克·布特林认为，人工智能和预测市场技术可以加速社交媒体平台 X 上社区笔记的生成。</p><p>社区笔记是 X 的一项功能，允许用户为可能具有误导性的帖子添加上下文。贡献者可以在帖子上留下“笔记”，如果足够多的贡献者将该笔记评为有用，它将公开显示在帖子下方。</p><p>在2024年韩国区块链周上，布特林表示，尽管这些笔记很有帮助，但社区笔记最大的批评是“出现得不够快”，在笔记出现之前，人们可能会受到误导。</p><p>预测市场可以加快其他机制<br>布特林补充说，通过社区笔记提供帖子上下文所需的任何延迟都是“过多的”。然而，这位以太坊联合创始人认为，解决方案可能在于预测市场。</p><p>预测市场是开放市场，允许用户对特定结果进行下注。布特林举了去中心化预测平台 Polymarket 的例子，在那里人们就政治、体育和加密等高度争议的话题进行下注。布特林表示：</p><p>“可以将预测市场视为一种构建模块，可以使其他机制更快。……你采用某种现有机制，然后制作出一种更快的机制，并激励其尽可能做好工作。”</p><p>他说，每当发布帖子时，可以提出一个问题来判断是否需要社区笔记。布特林表示，人们可以使用大型 AI 语言模型和机器人在这个预测市场上下注少量资金。</p><p>布特林认为，这有可能加速获取真相的过程，并激励参与者的机制。</p><p>“这个机制会把笔记放在最后，然后会奖励那些正确预测结果的人，对吧？所以在这里，你基本上有一个成本低但速度快的向量，”他解释道。</p>',
      url: 'https://tokeninsight.com/zh/news/vitalik-buterin-says-ai-prediction-markets-can-make-x-community-notes-faster?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sd9c7.jpeg',
      source_url:
        'Vitalik Buterin表示，人工智能预测市场可以更快地制作X社区笔记',
      timestamp: 1725359928000,
      tags: [
        {
          name: 'V 神',
        },
      ],
    },
    {
      title: '随着 Chang 硬分叉上线，Cardano 转向去中心化治理',
      content:
        '<p>据 The Block 报道,经过多年的努力,卡尔达诺的 Chang 升级第一阶段已正式上线,将区块链的所有权转移给其原生 ADA 代币的持有者。</p><p>随着这次升级,卡尔达诺进入了其开发的最后阶段,被称为 Voltaire 时代。</p><p>卡尔达诺是由以太坊联合创始人查尔斯·霍斯金森创立的 Layer 1 区块链,已正式完成其 Chang 硬分叉的第一阶段,成为首个将集中治理结构转变为基于代币的去中心化治理系统的主要区块链。</p><p>在接下来的 90 天内,卡尔达诺将全面转型为一个由临时委员会监督的社区主导治理模式。在 90 天结束时,Chang 硬分叉的第二阶段将激活,完全将权力交给新的治理机构,包括宪法委员会、代表代表和质押池运营商。</p><p>“第一阶段的目标是在治理引导阶段确保安全和连续性,允许代表代表注册并为代表进行竞选，同时在 2025 年初制定和批准最终宪法，”卡尔达诺的解释中写道。</p><p>尽管卡尔达诺在某些时候曾在市值排名前五的加密货币中，但最近的动态对该代币并不太有利，上个月由于 TRON 的 TRX 代币和 Telegram 的 Toncoin 的增长，卡尔达诺已跌出前十名。</p><p>霍斯金森在一段发布在 X 的视频中表示：“当我回想起我们作为生态系统的起点时，那只是一个想法……多年来我们成长了很多。经历了起伏，遭遇了许多失望，但现在我们在这里。”他补充道：“今天我们在这里……这是一个整个生态系统、社区、每位 ADA 持有者肩并肩作为平等者的日子，他们都对这个协议的未来以及这个协议能为全世界每个人做些什么有发言权。”</p>',
      url: 'https://tokeninsight.com/zh/news/cardano-shifts-to-decentralized-governance-as-chang-hard-fork-goes-live?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdc8876.jpeg',
      source_url:
        'https://www.theblock.co/post/314079/cardano-shifts-to-decentralized-governance-as-chang-hard-fork-goes-live',
      timestamp: 1725271936000,
      tags: [
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '全球加密投资产品每周流出 3.05 亿美元: CoinShares',
      content:
        '<p>据 The Block 报道,数字资产投资产品在上周恢复了每周流出,全球资金流出达 3.05 亿美元,根据 CoinShares 的数据。</p><p>根据 CoinShares 最新报告,包括 Ark Invest、Bitwise、BlackRock、Fidelity、Grayscale、ProShares 和 21Shares 在内的全球加密投资产品上周净流出总额为 3.05 亿美元,此前一周则录得净流入 5.43 亿美元。</p><p>流出发生在“各个提供商和地区普遍出现负面情绪”的背景下,CoinShares 研究负责人 James Butterfill 表示,这一情绪受到美国经济数据强于预期的影响,“降低了 50 个基点降息的可能性”。</p><p>Butterfill 补充道:“我们继续预计,随着美联储逐渐接近政策转变,该资产类别将对利率预期变得愈加敏感。”</p><p>负面情绪集中于比特币<br>Butterfill 指出,负面情绪主要集中在比特币上,以比特币为基础的投资产品上周录得 3.19 亿美元的净流出。此外,做空比特币的基金连续第二周录得 440 万美元的净流入,为自 3 月以来的最大值。</p><p>仅美国现货比特币 ETF 上周就录得 2.772 亿美元的净流出,使得这些 ETF 首次自 4 月以来月度流出达到 9420 万美元,The Block 周六报道。这与 7 月的总净流入 32 亿美元相比。</p><p>与此同时,全球以太坊投资产品上周也录得 570 万美元的净流出,交易量降至仅为 7 月底美国现货 ETF 启动周水平的 15%,与这些基金启动前的交易量相当,Butterfill 写道。</p><p>美国现货以太坊 ETF 上周录得 1240 万美元的净流出,周五则无任何流动,对这些产品的兴趣似乎在减弱。</p><p>然而,基于 Solana 的基金逆势而上，上周录得 760 万美元的净流入。根据 CoinShares 报告,区块链股票也录得 1100 万美元的净流入，主要集中在比特币矿工投资产品上。</p>',
      url: 'https://tokeninsight.com/zh/news/lobal-crypto-investment-products-see-305-million-in-weekly-outflows-coinshares?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/asdc98.jpeg',
      source_url:
        'https://www.theblock.co/post/314164/global-crypto-investment-products-see-305-million-in-weekly-outflows-coinshares',
      timestamp: 1725271392000,
      tags: [
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'MasHash 为加密货币挖矿新手推出入门优惠',
      content:
        '<p>MasHash，一个快速增长的云挖矿平台，最近为加密货币挖矿新手推出了一项新优惠。新用户在平台注册时将获得 50 美元的免费奖励，以启动他们的加密货币挖矿之旅。</p><p>拥有超过 170 万应用用户和约 100 万粉丝，MasHash 平台提供先进的挖矿工具、强大的安全措施、<a rel="noopener noreferrer nofollow" target="_blank" href="https://mashash.com/?src=mas74">价格实惠的挖矿计划</a>和用户友好的移动应用，使其成为 100 多个国家的矿工的热门选择，支持多种语言，可挖掘比特币、以太坊、莱特币等多种加密货币。</p><p>MasHash 在竞争激烈的云挖矿领域的一些主要特点包括：</p><ul><li><strong>高效挖矿：</strong>MasHash 使用最新的 ASIC 矿机和 GPU 设备，以实现顶级性能，同时保持非常低的能源使用。</li><li><strong>全面安全</strong>：MasHash 通过 McAfee® SECURE 和 Cloudflare® SECURE 认证，确保您的资金和个人数据得到很好的保护。</li><li><strong>自动收益：</strong>下单后，系统自动开始运行。每 24 小时处理一次支付。</li><li><strong>移动应用</strong>：MasHash 应用在 Android 上可用。它让用户可以随时随地管理他们的挖矿、跟踪收益和调整设置，提供极大的便利。</li><li><strong>推荐计划</strong>：MasHash 有一个有回报的推荐计划。用户可以通过邀请他人加入平台来赚取额外收入。每次成功推荐都会增加您的收益。这是提高利润的好方法。</li></ul><p>为了适应不同的投资水平和偏好，MasHash 提供了几个云挖矿计划：</p><ul><li><strong>50 美元免费试用项目奖励</strong>：新用户注册时将获得 50 美元奖励，外加免费计算能力，可每天赚取 1 美元。</li><li><strong>1 天合约</strong>：入门体验项目，用户可以投资最多 200 美元，每日返利 6.00 美元。</li><li><strong>3 天合约</strong>：此合约费用为 600 美元，每日返利 10.50 美元。</li><li><strong>7 天合约</strong>：此合约面向严肃投资者，费用为 60,000 美元，在合约期内可返还最多 1,980.00 美元。要查看更多计划，请访问 <a rel="noopener noreferrer nofollow" target="_blank" href="https://mashash.com/?src=mas74">MasHash</a>。</li></ul><p><strong>关于 MasHash</strong></p><p>MasHash 成立于 2019 年，目前在英国品牌 MAS INFOTECH LIMITED 下运营，旨在利用最新技术提供透明和安全的云挖矿服务。MasHash 支持多种加密货币，包括比特币、以太坊和莱特币，使用户能够轻松地多样化他们的挖矿活动。</p>',
      url: 'https://tokeninsight.com/zh/news/mashash-launches-beginners-offer-for-new-crypto-mining-enthusiasts?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/mashash.png',
      source_url: '',
      timestamp: 1725270820000,
      tags: [
        {
          name: '挖矿',
        },
      ],
    },
    {
      title: '贝莱德 (BlackRock) 的比特币 ETF 出现了 1350 万美元的第二次流出',
      content:
        '<p>据 Cointelegraph 报道,黑石的比特币 ETF 遇到了第二次流出,因为比特币价格跌破了 59,000 美元。</p><p>黑石的 iShares 比特币信托基金 (IBIT) 自 1 月推出以来，记录了第二次流出。</p><p>黑石的 ETF 在 8 月 29 日录得 1350 万美元的净流出，这是自 5 月 1 日以来的第二次流出，当时录得 3690 万美元的净流出。根据 Farside Investors 的数据，这也是比特币 ETF 记录上最糟糕的一天，总流出达 5.637 亿美元。</p><p>总的来说，美国的 11 只现货比特币 ETF 在 8 月 29 日的联合净流出总额为 7180 万美元。</p><p>黑石的基金排名第三，紧随富达的 Wise Origin 比特币基金 (FBTC) 之后，后者在当天录得 3110 万美元的净流出，为当天最大。Grayscale 的比特币信托 (GBTC) 紧随其后，流出 2270 万美元。</p><p>IBIT 的净流出日与 8 月 26 日的 224.1 亿美元净流入相对应，这是自 7 月 22 日以来的最大流入，当时的流入为 5.267 亿美元。</p><p>ARK 21Shares 比特币 ETF (ARKB) 是 8 月 29 日唯一录得净流入的基金，流入 530 万美元。</p><p>最新的比特币 ETF 流出发生在比特币价格普遍下跌的背景下，过去七天内下跌约 3.43%，在撰写本文时交易价格为 58,751 美元，根据 CoinMarketCap 的数据。</p><p>与此同时，美国的现货以太坊 ETF 在 8 月 29 日也录得小幅联合流出 170 万美元，其中几只基金没有任何流动。</p><p>Grayscale 的以太坊迷你信托 (ETH) 是唯一录得净流入的 ETF，流入 360 万美元——这不足以抵消其高费用姐妹基金 Grayscale 以太坊信托 (ETHE) 的 530 万美元净流出。</p><p>自 7 月推出以来，ETHE 几乎每天都出现净流出，目前累计净流出达 25.6 亿美元。</p><p>根据 TokenInsight 的数据，ETH 的价格也在下跌，过去七天内下跌 5.64%，目前价格为 2,517.06 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/blackrock-s-bitcoin-etf-registers-second-ever-outflow-of-13.5m?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/9梗.jpeg',
      source_url:
        'https://cointelegraph.com/news/blackrock-ibit-bitcoin-etf-second-outflow-day-13-million',
      timestamp: 1725013243000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '埃隆·马斯克在狗狗币集体诉讼中被判无罪',
      content:
        '<p>据 The Block 报道,埃隆·马斯克和特斯拉赢得了一宗集体诉讼的驳回,该诉讼指控马斯克的言论操纵了狗狗币市场。美国地区法官阿尔文·赫勒斯坦永久驳回了该诉讼。</p><p>埃隆·马斯克和他的电动车公司特斯拉在 2022 年赢得了一宗指控他们的集体诉讼,该诉讼声称马斯克的言论操纵了狗狗币市场并损害了投资者利益。</p><p>美国地区法官阿尔文·赫勒斯坦在周四以有偏见的方式驳回了该诉讼,这意味着该诉讼已被永久驳回。</p><p>2022 年 6 月,投资者起诉马斯克及其公司,声称他们围绕狗狗币的活动(包括一系列推文)欺骗了投资者。投资者指控马斯克的陈述——包括他同意成为狗狗币 CEO 的声明以及他建议将狗狗币放入 SpaceX 并飞往月球——具有误导性。</p><p>一组投资者在纽约南区代表他们对马斯克及其企业特斯拉和 SpaceX 提起诉讼。</p><p>赫勒斯坦法官在其裁定中写道:“这些陈述是理想化的和夸大的,而非事实,且易于被伪造。”他补充说,没有理性的投资者可以依赖这些陈述。</p><p>法官还表示,“不可能理解”构成原告市场操纵结论基础的指控，包括马斯克和特斯拉被指控的“拉高出货”计划，以及相当于内幕交易的信托责任违反。</p>',
      url: 'https://tokeninsight.com/zh/news/elon-musk-cleared-in-dogecoin-class-action-lawsuit?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/上个7ga.jpeg',
      source_url:
        'https://www.theblock.co/post/313881/elon-musk-cleared-in-dogecoin-class-action-lawsuit',
      timestamp: 1725012053000,
      tags: [
        {
          name: 'Dogechain',
        },
      ],
    },
    {
      title:
        '特朗普的第四个 NFT 系列销售额超过 200 万美元，直到 2025 年才能在二级市场上交易',
      content:
        '<p>据 The Block: 报道,前美国总统唐纳德·特朗普于 8 月 27 日发布了第四系列非同质化代币交易卡,“系列 4: 美国优先收藏”。</p><p>链上数据显示,在过去一天内,该系列在 Polygon 网络上销售超过 22,000 张,总价值超过 217 万美元,每个 NFT 的铸造价格为 99 美元。</p><p>值得注意的是,这仅占 360,000 个 NFT 的总供应量的 6%。特朗普的第四个 NFT 系列展示了他以各种姿势和服装的形象,与前三个系列类似。如果该系列中的所有 NFT 都被铸造,总收入将超过 3500 万美元。</p><p>目前这些最新的 NFT 不能在二级市场上出售,因为这些卡片在 2025 年 1 月 31 日之前不可交易。</p><p>标志着他早期怀疑态度的转变,特朗普已接受加密社区,接受以加密货币进行的竞选捐款并与加密高管互动。</p><p>过去的收藏<br>特朗普的首个 NFT 系列于 2022 年 12 月推出。早期的 NFT 系列对买家的财务结果参差不齐,首个系列的底价显示出显著的 100% 增长。而第二和第三系列的铸造者则经历了显著的底价损失。</p><p>根据最近的财务披露,特朗普从其 NFT 系列中总体获得了超过 700 万美元的收入。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-s-fourth-nft-collection-logs-sales-over-2-million-not-tradable-on-secondary-markets-until-2025?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sdf96.jpeg',
      source_url:
        'https://www.theblock.co/post/313682/trumps-fourth-nft-collection-logs-sales-over-2-million-not-tradable-on-secondary-markets-until-2025',
      timestamp: 1724925472000,
      tags: [
        {
          name: 'Meme',
        },
        {
          name: 'NFT',
        },
      ],
    },
    {
      title: '现货以太坊 etf 以 580 万美元的净流入结束了连续9天的流出',
      content:
        '<p>据 The Block：报道,美国现货以太坊 ETF 在经历了九天的负流出后再次出现净流入。</p><p>现货以太坊 ETF 在周三录得 584 万美元的净流入,而现货比特币 ETF 则流出了 1.0519 亿美元。</p><p>美国现货以太坊交易所交易基金在周三报告了 584 万美元的日净流入,结束了连续九天的流出。</p><p>Grayscale 的以太坊信托基金 (ETHE) 录得日净流出 381 万美元,但 BlackRock 的现货以太坊基金录得 840 万美元的净流入,富达的 FETH 则有 126 万美元的流入,根据 SoSoValue 的数据。</p><p>九只现货以太坊 ETF 在周三的交易量为 1.5157 亿美元,仍显著低于七月底首次交易时约 9 亿美元的交易量。这些基金累计净流出 4.7548 亿美元。</p><p>现货比特币 ETF 继续录得流出<br>与此同时,美国现货比特币 ETF 在周三延续了净流出,报告了 1.0519 亿美元的流出。</p><p>Ark 和 21Shares 的 ARKB 领衔流出,金额为 5927 万美元。富达的 FBTC 流出 1037 万美元,而 VanEck 的基金则录得 1007 万美元的流出。</p><p>Bitwise 的 BITB、Grayscale 的迷你比特币信托和 Grayscale 的 GBTC 也报告了约 800 万美元的净流出。BlackRock 的 IBIT(按净资产计算的最大现货比特币 ETF)和其他五只比特币 ETF 当天无任何流动。</p><p>美国现货比特币基金在周三的总交易量为 21.8 亿美元,而周二为 12 亿美元。自 1 月以来,它们累计净流入 178.5 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-end-nine-day-outflow-streak-with-5.8-million-in-net-inflows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/是豆腐干876.jpeg',
      source_url:
        'https://www.theblock.co/post/313669/spot-ethereum-etfs-end-nine-day-outflow-streak-with-5-8-million-in-net-inflows',
      timestamp: 1724924968000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 昨日结束了连续 8 天的流入，净流出 1.27 亿美元',
      content:
        '<p>据 The Block 报道,美国现货比特币 ETF 在经历了八天的正流入后再次出现净流出。</p><p>以太坊 ETF 也迎来了第九天的总净流出。</p><p>美国现货比特币交易所交易基金(ETF)在周二回归净流出,结束了连续八天的正流入,根据 SoSoValue 的数据。这八天内,美国现货比特币 ETF 共吸引了 7.56 亿美元。</p><p>美国现货比特币基金录得 1.27 亿美元的净流出,而 Valkyrie 的 BRRR 并未更新。根据 SoSoValue 的数据,净流出主要由 Ark &amp; 21Shares 的 ARKB 牵头,该基金报告了 1.0197 亿美元的负流入。</p><p>Grayscale 的 GBTC 录得 1832 万美元的净流出,Bitwise 的 BITB 则流出 676 万美元。包括 BlackRock 的 IBIT 在内的八只基金在周二无任何流动。</p><p>美国现货比特币基金(不包括 BRRR)的总交易量为 12 亿美元。自 1 月以来,它们累计净流入 179.5 亿美元。</p><p>以太坊 ETF 迎来第九天流出<br>与此同时,现货以太坊 ETF 继续出现第九天的净流出,昨日报告了 345 万美元的负流入。</p><p>Grayscale 的以太坊基金录得日净流出 918 万美元,而富达的 FETH 则录得 388 万美元的净流入,Bitwise 的 ETHW 也有 186 万美元的流入。</p><p>现货以太坊基金在周一的交易量为 1.2995 亿美元,仍远低于七月底约 9 亿美元的交易量。这些基金累计净流出 4.8132 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-end-eight-day-inflow-streak-with-127-million-in-net-outflows-yesterday?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/看女.jpeg',
      source_url:
        'https://www.theblock.co/post/313372/spot-bitcoin-etfs-end-8-day-winning-streak',
      timestamp: 1724841112000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'TON 区块链在 6 个小时的停机期间出现故障',
      content:
        '<p>据 The Block 报道,开放网络 (TON) 遇到了故障,超过六小时没有处理任何交易。</p><p>此次中断被归因于网络负载异常,导致共识丧失。</p><p>根据链上数据,开放网络 (TON +0.82%) 在六小时内未处理任何交易后经历了故障。</p><p>Tonscan 数据显示,与 Telegram 相关的区块链在周二协调世界时晚上 10:11 左右停止生成新块。随着停止时间的延长,币安和 Bybit 交易所暂时暂停了与该网络的存款和取款。</p><p>“TON 区块链目前正经历区块生产中断，”TON 在一条 X 帖子中表示。“该问题是由于 TON 当前的异常负载引起的。多个验证者无法清理旧交易的数据库,这导致了共识的丧失。”</p><p>TON Status 组在 Telegram 上报告称,验证者们在大约同一时间需要使用特定标志重启节点,以恢复网络的正常状态。</p><p>“到目前为止,尚未有足够的验证者使用正确的标志重启他们的节点。如果您尚未使用新标志重启您的节点,请尽快进行，”该组表示。</p><p>X 用户 @maverickqe 声称自己是 TON 社会的战略顾问,早些时候表示 DOGS 迷因币的空投引发了交易激增,超载了网络。“垃圾收集使许多验证者在足够长的时间内超载,以至于他们失去了共识，”该用户写道。</p><p>基于 Telegram 的 DOGS 迷因币在加密社区中引起了显著关注,因为其开发者概述了在 Telegram 生态系统内扩大代币效用的计划。DOGS 在周一启动了其空投活动,表示将有 81.5% 的固定供应量 5500 亿个代币分配给社区成员。上周,DOGS 表示有六百万个验证用户请求参与空投。</p><p>这一情况发生在 Telegram 创始人兼 CEO Pavel Durov 上周被法国当局逮捕后,引发了 Telegram 和 TON 社区的强烈反弹。周二,一个 Telegram 迷你应用启动了一封倡导法国当局释放 Durov 的信件。该信件目前已获得近 170 万个签名。</p>',
      url: 'https://tokeninsight.com/zh/news/ton-blockchain-was-down-amid-a-six-hour-outage?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/jfgvbhgv.jpeg',
      source_url:
        'https://www.theblock.co/post/313367/ton-blockchain-now-down-six-hours',
      timestamp: 1724840872000,
      tags: [
        {
          name: '币安',
        },
        {
          name: 'Bybit',
        },
      ],
    },
    {
      title:
        'Ton 开发者采用“抵抗狗”表情包头像来支持 Pavel Durov; 代币跳涨 140%',
      content:
        '<p>据 The Block 报道,迷因币"抵抗狗"经历了市场反弹,周一涨幅超过 140%。</p><p>这一涨势是在开发者将其指定为 Toncoin 在各个社区频道的官方头像后引发的。</p><p>最大的 Toncoin 连锁上的迷因币"抵抗狗"(REDO)经历了市场反弹,涨幅超过 140%,这是在开发者将其选为 Toncoin 在各个社区频道的官方头像后引发的。</p><p>这是 Ton 开发者为了与其所谓的"数字抵抗"运动保持一致而采取的一项更广泛的举措。这个头像包括一只身穿兜帽的白色卡通狗,取代了之前的 Ton 区块链标志。</p><p>核心开发者表示,他们已在官方 Telegram 频道和 X 账户等平台上采用了"抵抗狗"头像。此举是在 Telegram 创始人、Ton 区块链的关键人物 Pavel Durov 在上周末在法国被捕之后做出的。</p><p>"为了支持\'数字抵抗\',我们正在将 Toncoin 的标志和头像更新为数字抵抗的全球象征 - 抵抗狗",该团队在周一宣布。</p><p>在此公告后,该代币在周一飙升超过 140%,从 0.35 美元涨至 0.85 美元以上,随后在撰写本文时回落至 0.63 美元,根据 Dexscreener 的数据。该代币的市值目前为 6500 万美元。</p><p>Durov 上周六在法国被警方拘留,原因是涉嫌参与网络犯罪调查,根据巴黎司法法庭的声明。此前曾有报道称,Telegram 在内容审核问题上与执法部门的合作不力。</p>',
      url: 'https://tokeninsight.com/zh/news/ton-developers-adopt-resistance-dog-memecoin-avatar-to-support-pavel-durov-token-jumps-140?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdf986ffg.jpeg',
      source_url:
        'https://www.theblock.co/post/313134/ton-developers-adopt-resistance-dog-memecoin-avatar-to-support-pavel-durov-token-jumps-140',
      timestamp: 1724755523000,
      tags: [
        {
          name: 'Meme',
        },
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title:
        '现货比特币 etf 迎来第八天的资金流入，其中贝莱德的 2.24 亿美元领涨',
      content:
        '<p>据 The Block: 报道,美国现货比特币 ETF 周一录得 2.02 亿美元的净流入,连续第八个交易日实现正流入。</p><p>以太坊 ETF 则继续录得净流出。</p><p>美国现货比特币交易所交易基金(ETF)周一录得 2.02.51 亿美元的总净流入,连续第八个交易日实现正流入。过去八个交易日,这 12 只比特币基金共吸引了 7.56 亿美元的资金。</p><p>周一最大的净流入来自 BlackRock 的 IBIT 基金,总计 2.2406 亿美元,这是自 7 月 22 日以来该基金的最大单日流入。另外两只基金也录得较小的净流入:富兰克林邓普顿的 EZBC 录得 552 万美元,WisdomTree 的 BTCW 录得 500 万美元的净流入。</p><p>比特币基金中,Bitwise 的 BITB 录得 1661 万美元的净流出,为周一最大净流出,其次是富达的 FBTC 录得 833 万美元的净流出。VanEck 的 HODL 也录得 718 万美元的资金外流。其他 6 只基金(包括 Grayscale 的 GBTC)当天无任何流动。</p><p>现货比特币基金的交易量从上周五的 3.12 亿美元缩减至昨日的 1.2 亿美元,恢复至正常水平。自今年 1 月推出以来,这些基金已累计净流入 180.8 亿美元。</p><p>以太坊继续出现流出<br>与此同时,美国现货以太坊基金仍然呈现负面走势,连续第八个交易日出现净流出。</p><p>周一,以太坊基金录得 1323 万美元的净流出,其中 Grayscale 的 ETHE 录得 952 万美元的流出,富达的 FETH 录得 269 万美元的流出,而富兰克林邓普顿报告净流出 102 万美元。周一没有任何现货以太坊 ETF 录得正流入。</p><p>现货以太坊基金周一的交易量为 1.2573 亿美元。它们累计净流出 4.7788 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-bitcoin-etfs-see-eighth-day-of-inflows-led-by-blackrock-s-224-million?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/se87.jpeg',
      source_url:
        'https://www.theblock.co/post/313124/blackrock-ibit-leads-spot-bitcoin-etf-inflow-200-million',
      timestamp: 1724755255000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '稳定币市值在 11 个月的增长中创下历史新高',
      content:
        '<p>据 Cointelegraph 报道,不包括算法稳定币在内的稳定币市值已达 1680 亿美元,创下历史新高。</p><p>稳定币市值在连续 11 个月增长后达到了新的历史高点,达到 168 亿美元。</p><p>DefiLlama 数据显示,稳定币总市值创下新高,超过了 2022 年 3 月的最高纪录。</p><p>该数据不包括算法稳定币,这些稳定币的价值是通过算法机制维持的,而不是与法定货币或黄金挂钩。</p><p>该市场在 2022 年 3 月达到了 167 亿美元的历史高点,但随后迅速下跌,在同年年底降至 135 亿美元。</p><p>加密货币分析师 Patrick Scott(也被称为"Dynamo DeFi")在 8 月 26 日的一篇 X 帖子中表示,他认为这是"新资金进入加密货币市场"的迹象。</p><p>他说:"就这样,我们又创下了新的历史高点。不包括算法稳定币在内的稳定币总市值现已达到有史以来最高点,超过了 2022 年初的最高纪录。"</p><p>当被问及是否机构投资推动了这一反弹时,他没有作出猜测,但他确实指出,"零售投资者至少在过去八个月一直存在"。</p><p>领头的稳定币是泰达币(USDT)。新年伊始,USDT 的市值为 916.9 亿美元。</p><p>在 2024 年全年,它一直保持稳定的月度增长,8 月份市值首次突破 1170 亿美元。</p><p>Circle 发行的 USDC 也实现了全年的增长,市值达到了创纪录的 340 亿美元,但仍远低于 2022 年 6 月创下的 558 亿美元的历史高点。</p><p>据 CCData 的一份报告,由于中心化交易所的交易活动下降,7 月份稳定币交易量下降了 8.35%,至 7950 亿美元。</p><p>该报告指出,《加密资产市场法规》引发了人们对 USDT 在欧洲未来的担忧,这也是 7 月份中心化交易所稳定币交易活动下降的一个因素。</p><p>这一趋势延续到了 8 月,目前市场的交易量刚刚超过 460 亿美元,根据 CoinMarketCap 的数据。</p>',
      url: 'https://tokeninsight.com/zh/news/stablecoin-market-cap-hits-new-all-time-high-amid-11-months-of-growth?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/d7c6.jpeg',
      source_url:
        'https://cointelegraph.com/news/what-happened-in-crypto-today',
      timestamp: 1724668632000,
      tags: [
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: 'Telegram 首席执行官被捕后，俄法关系紧张',
      content:
        '<p>据 The Block 报道, 俄罗斯外交部已要求获得对 Telegram 创始人兼 CEO Pavel Durov 进行领事探访, 此前 Durov 于周六在法国被捕, 俄罗斯官员对这一消息表示愤怒。</p><p>据 NPR 报道, 法国当局计划在周一发表声明,就 Durov 的拘捕事件作出回应。</p><p>根据 《华尔街日报》 的最新报道, 俄罗斯官员对 Telegram 创始人兼 CEO Pavel Durov 在周六于巴黎勒布尔热机场下飞机时被捕一事表示"愤怒"。</p><p>俄罗斯驻法国大使馆在周日清晨发布声明称, 法国当局拒绝与他们就访问 Durov 一事进行交涉。声明的翻译版本称: "在媒体报道 P.V. Durov 被拘留的消息之后, 我们立即要求法国当局说明原因, 并要求他们确保保护他的权利并提供领事探访。到目前为止, 法方一直在回避这个问题。我们正在与 P.V. Durov 的律师保持联系。"</p><p>据报道,一些俄罗斯官员将这一逮捕描述为对俄罗斯的间接敌对行为。虽然有些报道称 Durov 拥有法国和俄罗斯的双重公民身份, 但也有报道称他拥有法国和阿联酋的双重公民身份。</p><p>据巴黎检察官办公室告诉 NPR,法国官方预计将于周一发表声明,就 Durov 的逮捕事件作出回应。据法国媒体报道, Durov 可能会因 Telegram 的运营和平台上缺乏内容审查, 面临从洗钱到"涉及未成年人犯罪"的指控。</p><p>Telegram 也在周日首次就这一逮捕事件发表声明, 称"Telegram 遵守欧盟法律,包括《数字服务法》", 并称"Telegram CEO Pavel Durov 没有什么可隐瞒的, 经常在欧洲旅行"。</p><p>虽然一些新闻媒体声称 Durov 可能面临 20 年监禁, 但法国媒体最初的报道中并未出现这一数字。</p><p>包括 X 平台所有者马斯克、以太坊联合创始人 Vitalik Buterin (他表示他的意见是基于目前可获得的信息)、TRON 创始人 Justin Sun、Solana 联合创始人 Anatoly Yakovenko 等许多加密行业的重要人物, 都对 Durov 的逮捕表达了支持。</p>',
      url: 'https://tokeninsight.com/zh/news/russia-france-tensions-flare-following-telegram-ceo-s-arrest-reports?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dhdf7.jpeg',
      source_url:
        'https://www.theblock.co/post/312968/russia-france-tensions-flare-following-telegram-ceos-arrest-reports',
      timestamp: 1724668263000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        'MakerDAO 计划选择性地将 1 个 MKR 重新命名为 24,000 个 NGT 代币，作为最终游戏的一部分',
      content:
        '<p>据 The Block 报道,作为其终局计划的一部分,MakerDAO 计划将每个 MKR 治理代币可选地转换为 24,000 个 NewGovToken (NGT) 代币。</p><p>这种重新计价旨在通过让更多用户持有大量 NGT 来扩大 MakerDAO 治理的参与度。</p><p>负责 Dai 稳定币的去中心化自治组织 MakerDAO,提出了对其 MKR 治理代币进行可选重新计价的提议,将每个 MKR 转换为 24,000 个 NewGovToken (NGT) 代币。这是其战略性终局计划的一部分,预计将于不久推出。</p><p>MakerDAO 表示,这种重新计价旨在通过让更多用户持有大量新的治理代币 NGT 来实现治理参与的更广泛,从而使决策过程更加民主化。</p><p>除了引入 NGT,MakerDAO 还将推出一种新的稳定币 NewStable (NST),与 Dai 挂钩 1:1。现有的 Dai 和 MKR 代币将继续保持活跃,允许用户在原始代币和新代币之间进行选择。</p><p>"除非治理决定另外做出,否则这两种代币预计在可预见的未来将保持不变,"MakerDAO 指出。</p><p>该提案强调了用户选择,表示升级到 NewStable 和 NewGovToken 是可选的。过渡到新代币的用户可以恢复到原始的 Dai 和 MKR,确保 MakerDAO 生态系统保持灵活性。</p><p>MakerDAO 补充说,其生态系统最终将探索区分 Dai 和 NewStable 的方式。根据这个 DAO,Dai 可能会继续专注于加密原生的使用案例,而 NewStable 可能瞄准大规模采用。</p><p>Dai 是由去中心化实体发行的最大美元挂钩稳定币。它也是仅次于 Tether USD 和 Circle 的 USDC 的第三大稳定币,市值达 52 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/makerdao-plans-to-optionally-redenominate-1-mkr-into-24-000-ngt-tokens-as-part-of-endgame?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/点7s.jpeg',
      source_url: 'https://www.theblock.co/post/312751/makerdao-endgame-tokens',
      timestamp: 1724410290000,
      tags: [
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '现货比特币 etf 净流入 6500 万美元，连续六天出现正流入',
      content:
        '<p>据The Block 报道：周四,美国现货比特币 ETF 录得 6491 万美元的净流入,而现货以太坊 ETF 则出现 87.46 万美元的资金流出。</p><p>BlackRock 的 IBIT 录得净流入,而 Grayscale 的 GBTC 则继续出现流出。</p><p>美国现货比特币交易所交易基金(ETF)在周四报告了 6491 万美元的净流入,延续了为期六天的正面流向。</p><p>资产规模最大的现货比特币 ETF - BlackRock 的 IBIT,在这些产品中录得最大的流入,净流入 7549 万美元,根据 SoSoValue 的数据。</p><p>富达的 FBTC 录得 923 万美元的流入,而 Ark 和 21Shares 的 ARKB 则录得 783 万美元的资金流入。WisdomTree 的 BTCW 紧随其后,录得 480 万美元的净流入,Grayscale 的 BTC 为 400 万美元,VanEck 的 HODL 为 341 万美元。</p><p>第二大现货比特币 ETF - Grayscale 的 GBTC 则出现 2836 万美元的资金流出,Bitwise 的 BITB 录得 1150 万美元的净流出。</p><p>这 12 只现货比特币 ETF 在周四的总交易量为 8.9967 亿美元,显著低于前一天录得的 14.2 亿美元。</p><p>Grayscale 以太坊信托(ETHE)继续出现负面流向,录得 1984 万美元的净流出,这是唯一一只现货以太坊 ETF 报告出现流出。</p><p>富达的 FETH 录得最大规模的流入,为 1433 万美元。Grayscale 以太坊迷你信托(ETH)录得 368 万美元的流入,VanEck 的 ETHV 录得 95.41 万美元的流入。其他 5 只现货以太坊 ETF 则未出现任何流向。</p><p>这些现货以太坊 ETF 在周四的总日交易量缩减至 9387 万美元,低于前一天的 2.01 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-bitcoin-etfs-see-65-million-in-net-inflows-extending-streak-of-positive-flows-to-six-days?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9饭6sd.jpeg',
      source_url:
        'https://www.theblock.co/post/312746/spot-bitcoin-etfs-see-65-million-in-net-inflows-extending-streak-of-positive-flows-to-six-days',
      timestamp: 1724409858000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Coinbase 将实现欧元和符合 mica 标准的稳定币 EURC 之间的 1:1 转换',
      content:
        '<p>据 The Block 报道:Coinbase 将在 8 月 28 日以 1:1 的比率开放欧元与欧元锚定币 EURC 之间的兑换。</p><p>EURC 符合欧盟新的 MiCA 法规。</p><p>Coinbase 将于 8 月 28 日在支持的司法管辖区内, 开放法定欧元与欧元挂钩稳定币 EURC 之间 1:1 比率的兑换服务。</p><p>EURC 的价值与欧元挂钩, 就像 USDC 与美元挂钩一样。根据 Coinbase 的一封电子邮件, EURC 符合欧盟新的《加密资产市场(MiCA)》法规。</p><p>Coinbase Advanced 上提供的兑换服务将不收取任何手续费。此外,Coinbase 将在 8 月 29 日推出新的 EURC-USDC 订单簿, 同时弃用现有的 EURC-EUR 和 EURC-USD 订单簿。"这些变更旨在实现法定货币与稳定币之间的最高效兑换和交易, "该交易所表示。</p><p>尽管以美元为挂钩的稳定币主导着该领域, 但以欧元为挂钩的稳定币占非美元稳定币总量的绝大部分。根据 The Block 的数据仪表盘, 在排除以美元为挂钩的稳定币后, 以欧元为挂钩的稳定币约占以太坊上所有稳定币的 92%。</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-will-enable-1-1-conversions-between-the-euro-and-mica-compliant-stablecoin-eurc?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/电6.jpeg',
      source_url:
        'https://www.theblock.co/post/312578/coinbase-eur-eurc-conversions-mica',
      timestamp: 1724322655000,
      tags: [
        {
          name: 'Coinbase',
        },
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: '现货比特币 etf 连续第五天出现正流动，资金流入 3900 万美元',
      content:
        '<p>据 The Block 报道:美国现货比特币 ETF 连续第五天出现净流入, 而以太坊基金连续第五天出现净流出。</p><p>美国现货比特币交易所交易基金(ETF) 连续第五个交易日出现正流入, 周三流入 3942 万美元。另一方面, 现货以太坊 ETF 连续第五个交易日出现净流出。</p><p>根据 SoSoValue 的数据, Grayscale 的比特币小型信托基金昨天录得 14.2 百万美元的净流入, 而来自 Fidelity 和 Bitwise 的现货比特币基金也分别录得约 10 百万美元的流入。</p><p>规模最大的现货比特币 ETF——BlackRock 的 IBIT,录得 835 万美元的流入。Franklin Templeton 的 EZBC 录得 355 万美元的流入, 而 Invesco 的 BTCO 则录得 246 万美元的流入。</p><p>唯一的净流出来自 Grayscale 转换的 GBTC 基金, 录得 982 万美元的流出。其他 6 只基金, 包括 Ark 和 21Shares 的 ARKB, 当日录得零流量。</p><p>12 只比特币 ETF 的总日交易量周三达到 14.2 亿美元, 高于周二的 13.5 亿美元。自推出以来, 这些基金累计净流入 175.6 亿美元。</p><p>以太坊 ETF 继续出现流出<br>与此同时, 现货以太坊 ETF 周三录得 1797 万美元的净流出。Grayscale 的 ETHE 是唯一一只经历负流量的以太坊 ETF, 录得 3114 万美元的净流出。</p><p>Fidelity 的 FETH 录得当日最大的净流入 793 万美元, 其次是 Grayscale Ethereum 小型信托的 424 万美元净流入。Franklin Templeton 的以太坊基金也录得 100 万美元的净流入。</p><p>9 只以太坊 ETF 的交易量周三达到 2.01 亿美元, 高于周二的 1.95 亿美元。它们的累计净流出达到 4.58 亿美元。</p><p>比特币价格继续在 6 万美元附近波动。过去 24 小时上涨 2.33%, 交易价格为 60735 美元。以太坊上涨 1.09% 至 2621 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-bitcoin-etfs-see-fifth-consecutive-day-of-positive-flows-with-39-million-in-inflows?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sd98f.jpeg',
      source_url:
        'https://www.theblock.co/post/312557/spot-bitcoin-etf-fifth-positive-flow-day',
      timestamp: 1724322367000,
      tags: [
        {
          name: 'ETF',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 延续了正流动趋势，资金流入 8800 万美元',
      content:
        '<p>据 The Block 报道,BlackRock 的比特币 ETF 在周二净流入额达到 5,543 万美元,领先于其他产品。</p><p>现货以太坊 ETF 连续第四个交易日出现净流出,总计流出 649 万美元。</p><p>美国现货比特币交易所交易基金在周二出现 8,806 万美元的净流入,连续第四个交易日出现正面流入。</p><p>根据 SoSoValue 的数据,资产规模最大的现货比特币 ETF——BlackRock 的 IBIT 昨日流入 5,543 万美元,领跑同类产品。其次是 Ark Invest 和 21Shares 的 ARKB 基金,流入 5,191 万美元。</p><p>最大的净流出来自 Grayscale 的 GBTC,记录了 1,281 万美元的负流入。Bitwise 的 BITB 也报告了 647 万美元的每日净流出,而富达和 VanEck 等其他 8 只现货比特币 ETF 则没有流动。</p><p>这 12 只 ETF 的总日交易量在周二达到 13.5 亿美元,从周一的 7.79 亿美元有所恢复。但现货比特币基金的交易量仍显著低于 3 月份每天 50 亿至 80 亿美元的水平。这 12 只基金自推出以来累计净流入 175.2 亿美元。</p><p>现货以太坊 ETF 持续出现流出</p><p>另一方面,美国 9 只现货以太坊 ETF 在周二的基金变动较小,录得 649 万美元的净流出,这也是连续第四个交易日出现总体净流出。</p><p>Grayscale 的 ETHE 出现 3,699 万美元的负流入,这被 BlackRock 的 ETHA 流入 2,677 万美元和 Bitwise 的 ETHW 流入 373 万美元所抵消。其他 6 只以太坊 ETF 昨日报告无流动。</p><p>现货以太坊基金的总日交易量为 1.9466 亿美元,维持在较低水平,远低于 7 月份首周每日交易量 9 亿美元至 10 亿美元的水平。这些以太坊 ETF 累计净流出 4.4011 亿美元。</p><p>与此同时,比特币价格跌破 6 万美元关口,在过去 24 小时内下跌 2.54%至 59,370.58 美元。以太坊价值也下跌 3.08%至 2,592.95 美元,整个加密货币市场在过去一天下跌 2.12%。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-extend-positive-flow-streak-with-88-million-inflows?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/但f9.jpeg',
      source_url:
        'https://www.theblock.co/post/312305/spot-bitcoin-etf-positive-streak-88-million-inflows',
      timestamp: 1724236559000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Mt. Gox 向比特币交易所 Bitstamp 发送了价值 7500 万美元的比特币',
      content:
        '<p>根据 The Block 的报道, Mt. Gox 于周三凌晨向 Bitstamp 转移了约 1,265 BTC(约 7,500 万美元)。</p><p>这家交易所昨晚还向一个未知钱包转移了价值 7 亿美元的比特币。</p><p>Mt. Gox 似乎向 Bitstamp 的钱包地址转移了约 7,536 万美元的比特币, 这可能表明另一次向债权人派发的付款即将到来。</p><p>根据 Arkham 的数据, 在 UTC 8:49 左右, 1264.69 BTC 从 Mt. Gox 的冷钱包地址"1Jbez...LAPs6"转移到钱包地址"3HXo1...wsuXH"。后者被区块链分析公司 Arkham 识别为 Bitstamp 所有。</p><p>根据 Arkham 的数据, Mt. Gox 冷钱包昨晚从另一个 Mt. Gox 钱包"1MUQE...5SXZZ"收到了比特币。该交易向一个未知钱包转移了 12,000 BTC(约 7.0944 亿美元)。</p><p>Bitstamp 是 Mt. Gox 清算人提名用于向该破产加密货交所债权人分配比特币赔付的中心化交易所之一。包括 Kraken 在内的几家交易所已经完成了这些赔付。</p><p>总部位于日本的 Mt. Gox 在 2010 年成立, 曾是世界最大的比特币交易所, 直到在 2014 年遭到黑客攻击, 导致至少 85 万 BTC 被盗。</p>',
      url: 'https://tokeninsight.com/zh/news/mt.-gox-sends-75-million-in-bitcoin-to-bitstamp-crypto-exchange?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sa8of7.jpeg',
      source_url:
        'https://www.theblock.co/post/312351/mt-gox-transfers-75-million-bitcoin-bitstamp',
      timestamp: 1724236297000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '以太币触及 2.6 万美元，指标显示其正处于调整的“后期阶段”',
      content:
        '<p>据 Cointelegraph 报告, 以太币未平仓合约的上升以及"积极"的做多做空比率, 让一位加密货币分析师乐观认为, 以太币长期的修正即将结束。</p><p>自 8 月初以来,以太币价格下跌 13%,跌破关键的 3,000 美元水平, 但两项链上指标表明, 本轮调整可能即将结束。</p><p>CryptoQuant 作者 Burak Kesmeci 在 8 月 19 日的一份报告中写道, "买家正在重新获得以太币的实力"。</p><p>Kesmeci 提到了两个流行的链上指标: 做多做空比率和未平仓合额 (OI), 声称以太币可能在不久的将来重拾实力。</p><p>他指出, 做多做空比率"再次呈积极状态", 这计算了所有主要加密货币交易所中买家与卖家的比例。</p><p>根据 CoinGlass 的数据, 尽管在过去 24 小时内显示做空者略占优势, 但在发稿前最近 12 小时内转为积极,50.37% 的头寸为多头头寸。</p><p>在发稿时, 以太币价格为 2,679 美元, 自 7 月 23 日以来下跌 23.57%, 据 CoinMarketCap 数据显示。</p><p>8 月 19 日, 以太币未平仓合约(即交易者手持的未平仓期权合约总数)为 106.9 亿美元,较前一天 8 月 18 日增加约 10%。</p><p>Kesmeci 认为, "要实现显著的上涨,需要有使用杠杆的交易者回归市场"。通常, 当资产价格上涨时, 期货交易者会更有信心建立头寸。</p><p>今年 3 月 12 日, 以太币创下 4,066 美元的今年以来最高价, 此时未平仓合约为 136.7 亿美元。而在 6 月再次测试 3,800 美元附近高位时, 未平仓合约更是突破 15 亿美元。</p><p>Kesmeci 补充说, "这表明市场调整即将到来,事实上也确实发生了调整"。</p><p>最近, Cointelegraph 报道称, 尽管期待已久的首只美国现货以太币 ETF 于 7 月 23 日推出, 但历史性的首发并未推动以太币价格上涨。</p><p>这些 ETF 可能是以太币价格下跌的一个重要原因, 因为自推出以来, 美国 ETH ETF 录得累计 4.34 亿美元的净流出, 造成了显著的额外抛售压力。</p><p>这些产品在 28 天前推出。相比之下, 首批比特币现货 ETF 推出后的前 28 天内, 比特币价格下跌约 15%, 然后恢复至推出当日的 6.9 万美元水平。</p>',
      url: 'https://tokeninsight.com/zh/news/ether-hits-2.6k-as-metrics-suggest-it-s-in-late-stages-of-correction?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/a神6.jpeg',
      source_url:
        'https://cointelegraph.com/news/ethereum-price-bottom-2-key-onchain-indicators-crypto-analysts',
      timestamp: 1724147464000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title:
        '根据消息来源,美国证券交易委员会(SEC)驳回了 Cboe 交易所提交的Solana ETF 19b-4文件',
      content:
        '<p>据 The Block 报道：根据一位知情人士的消息,美国证券交易委员会(SEC) 驳回了 Cboe BZX 代表两家潜在 Solana ETF 发行人提交的 19b-4 申请。</p><p>此前,SEC 已经向发行人重申, 其认为 Solana 是一种证券,正如《区块链》之前报道的那样。</p><p>据一位熟悉情况的消息人士透露, SEC 拒绝了 Cboe BZX 为两只潜在的现货 Solana ETF 提交的 19b-4 文件。 因此, 这些申请已从 Cboe 网站撤回。</p><p>这一决定是在 SEC 与发行人就其认为 Solana 应被视为证券的担忧进行交流之后做出的, 正如《区块链》之前报告的那样, 引用了另一个消息源。 这一观点与 SEC 在多起案件中的法庭文件中所述一致。</p><p>19b-4 文件是由交易所(在本例中是 Cboe)代表发行人提交的。 如果被列入联邦登记册, 就会启动 SEC 的批准流程。 另一份重要的文件 S-1 注册声明则是由发行人提交的, 不会产生任何截止日期。</p><p>然而,由于 SEC 拒绝了 19b-4 表格, 它们从未进入联邦登记册, 也没有开始潜在批准或否决的流程。</p><p>Solana ETF 面临 SEC 阻力<br>目前有两家发行人正在争夺 Solana ETF:21Shares 和 VanEck。 21Shares 似乎已经撤回了其 S-1 表格, 因为它已不再出现在 SEC 的 EDGAR 申报系统中的搜索结果中。 VanEck 的 S-1 表格仍然存在, 其研究主管马修·西格尔表示,它仍在进行中。</p><p>尽管 19b-4 申请被拒绝是一个挫折, 但它们可能会在不久的将来重新提交或修改, 以更强有力的语言论证 Solana 不应被视为证券。</p><p>21Shares 通信主管 Audrey Belloff 表示: "我们目前无法对监管过程发表评论。 我们仍致力于在美国市场和全球范围内扩大投资者对加密货币的准入。"</p><p>VanEck、Cboe 和 SEC 尚未就此立即作出回应。</p>',
      url: 'https://tokeninsight.com/zh/news/the-sec-rejected-cboe-s-19b-4-filings-for-solana-etfs-source?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/297.jpeg',
      source_url:
        'https://www.theblock.co/post/312031/the-sec-rejected-cboes-19b-4-filings-for-solana-etfs-source',
      timestamp: 1724147107000,
      tags: [
        {
          name: 'Solana',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'WazirX 在黑客入侵后恢复了平衡，退出时间表尚不清楚',
      content:
        '<p>据 Cointelegraph 报道: 取款延迟已影响个人投资者, 并引发了对加密货币交易所整体安全性和可靠性的担忧。</p><p>在印度加密货币交易所 WazirX 遭受 2.34 亿美元黑客攻击导致安全多签名钱包损失后近一个月, 该平台已经恢复了投资者的余额。</p><p>尽管取得了这一进展, 但仍不清楚用户何时才能提取资金, 这让许多人感到沮丧和焦虑。</p><p>在 8 月 16 日的一份更新中, WazirX 表示他们正在解决两个主要问题: 找到印度卢比(INR)余额的解决方案, 以及解决与加密货币余额有关的问题。</p><p>根据该公司的说法, 这些解决方案需要持续的法律分析, 他们正在等待合作伙伴的确认, 以帮助解决这些问题。</p><p>WazirX 维护工作完成</p><p>在 8 月 16 日的一篇早期文章中, WazirX 宣布已成功完成计划维护, 该维护于凌晨 2 点开始。 维护工作结束后, 他们曾暂停了平台上的所有业务。</p><p>该交易所确认, 在 7 月 18 日下午 1 点 IST(黑客攻击发生当天)取款停止后进行的所有交易都已被撤销。 在这次维护结束后, 用户现在能够在近一个月的不确定性后看到他们账户中的资金。</p><p>缺乏明确的资金提取期限未能平息愤怒的投资者, 他们一直在要求立即获得资金的使用权。 交易所最初提出的 55/45 的社会化亏损分摊模式也遭到了投资者的强烈反对, 使情况雪上加霜。</p><p>行业反应</p><p>7 月 18 日的黑客攻击瞄准了 WazirX 的一个多签名钱包, 其中包含了超过 45% 的总投资者资金, 约 2.34 亿美元。 由于只有 55% 的客户资金幸存下来, WazirX 现在面临着巨大的挑战, 要想把所有投资者的资金全部返还。</p><p>缺乏透明度和持续无法提款的情况, 导致了 WazirX 用户的不满情绪不断升温。 许多投资者已经在社交媒体上表达了他们的沮丧并要求立即采取行动。</p><p>与此同时, 印度 Bharat Web3 协会(BWA)加强了对加密货币领域强大网络安全和消费者保护的承诺, 以应对 WazirX 遭受的毁灭性黑客攻击。</p><p>当 WazirX 正在努力应对其困境之际, 相比之下, 彭博的移动应用程序在经历了长达 7 个月的暂停后, 已经重新在印度的 Google Play 商店和 Apple App Store 上可供下载, 此前这与监管合规有关。</p>',
      url: 'https://tokeninsight.com/zh/news/wazirx-restores-balances-post-hack-withdrawal-timeline-unclear?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/都风6s.jpeg',
      source_url:
        'https://cointelegraph.com/news/wazirx-restores-balances-post-hack-withdrawal-issues-unresolved',
      timestamp: 1724063551000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: 'Tether 将 USDT 稳定币扩展到 Aptos 区块链',
      content:
        '<p>据《The Block》报告, Tether 稳定币发行商将把 USDT 稳定币引入 Aptos 区块链。</p><p>Tether 稳定币发行商正在将其主要 USDT 稳定币推出到 Aptos 区块链。</p><p>这一整合将允许 Aptos 区块链的用户以较低的成本本地交易 USDT 稳定币, 相比以太坊等更昂贵的网络更加低廉。 Tether 首席执行官 Paolo Ardoino 在一份声明中表示, "这种合作强调了我们不断寻求创新和支持用户使用稳定可靠的金融工具的持续努力"。</p><p>Aptos 是一个由前 Meta 工程师 Mo Shaikh 和 Avery Ching 共同创立的第 1 层区块链项目, 他们之前参与了 Facebook 的区块链计划 Diem。 该项目的主要目标是为去中心化应用程序和智能合约提供高效、 可扩展和用户友好的基础设施。</p><p>尽管 Tether 在过去几年里扩展到了许多区块链, 但它主要只在两个区块链上取得了成功。 USDT 在 Tron 上的流通量目前为 608.2 亿美元, 在以太坊上为 529.9 亿美元。 除此之外, Arbitrum 拥有下一个最大的 USDT 数量, 为 27.4 亿美元。 只有另外两个链拥有超过 10 亿美元的 USDT。</p><p>6 月, Tether 表示将停止在 EOS 和 Algorand 区块链上铸造新的 USDT。 Tether 在 2023 年终止了对比特币、 Kusama 和比特币现金的稳定币支持。</p><p>上个月, Tether 表示, 2024 年上半年的净利润创下了 52 亿美元的新纪录, 这一数字在 Q1 时为 45 亿美元。 然而, 这些数字包括了比特币未实现的收益, 而比特币的价格在 Q2 有所下降。 因此, 2024 年上半年的利润仅比 Q1 高出 7 亿美元, 尽管 Q2 的净营业利润为 13 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/tether-expands-usdt-stablecoin-to-aptos-blockchain?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sdf87.jpeg',
      source_url:
        'https://www.theblock.co/post/311757/tether-expands-usdt-stablecoin-to-aptos-blockchain',
      timestamp: 1724062962000,
      tags: [
        {
          name: 'Tether',
        },
        {
          name: 'Aptos',
        },
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: '现货以太坊 etf 净流出 3900 万美元，结束了连续三天的正流动',
      content:
        '<p>据 The Block 报道, 美国现货以太坊 ETF 在周四录得 3920 万美元的净流出, 而现货比特币 ETF 则报告了 1110 万美元的流入。</p><p>Grayscale 的 ETHE 继续出现流出, 有 4250 万美元离开该基金。</p><p>美国现货以太坊交易所交易基金在周四经历了 3921 万美元的净流出, 结束了此前三天的正流入走势。</p><p>根据 SosoValue 的数据, Grayscale 以太坊信托基金 (ETHE) 继续出现流出, 有 4252 万美元离开该基金。这是周四唯一一只报告流出的现货以太坊 ETF。</p><p>资产净值第二大的现货以太坊 ETF Grayscale 以太坊迷你信托 (ETH) 在周四报告无流动, 而前一日录得 226 万美元的适度净流入。</p><p>富达的 FETH 录得 254 万美元的净流入, 而贝莱德的 ETHA 则有 77.035 万美元流入该基金。其他 ETF 均录得零流动。</p><p>周四, 这 9 只 ETF 的总日交易量达到 2.4058 亿美元, 远高于周三的 1.5591 亿美元和周二的 1.9076 亿美元。</p><p>现货比特币 ETF 录得温和流入<br>与此同时, 美国 12 只现货比特币 ETF 在周四录得 1111 万美元的温和流入, 而前一日则录得 8136 万美元的净流出。</p><p>资产净值最大的现货比特币 ETF 贝莱德的 IBIT 在周四录得零流动, 而前两日分别录得 268 万美元和 3455 万美元的净流入。</p><p>Grayscale 的 GBTC 是唯一一只报告负流动的 ETF, 有 2503 万美元离开该基金。这延续了其连续 11 天的流出走势。</p><p>富达的 FBTC 录得当日最大流入, 有 1625 万美元。Grayscale 迷你信托 (BTC -0.15%) 紧随其后, 录得 1366 万美元的净流入, 而 Bitwise 的 BITB 则录得 623 万美元的流入。</p><p>这些现货比特币 ETF 的总交易量在周四达到 17.9 亿美元, 而前一日为 13 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-experience-39-million-in-net-outflows-ending-three-day-streak-of-positive-flows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ds9f76.jpeg',
      source_url:
        'https://www.theblock.co/post/311487/spot-ethereum-etfs-experience-39-million-in-net-outflows-ending-three-day-streak-of-positive-flows',
      timestamp: 1723804664000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '比特币侧链开发者发布了 BitVM2 白皮书，改进了扩展能力',
      content:
        '<p>据 The Block 报道, 比特币侧链开发者发布了 Bitcoin Virtual Machine 第二版 (BitVM2) 和更新的 BitVM Bridge 的白皮书。</p><p>比特币扩容开发者发布了关于 BitVM2 和更新的 BitVM Bridge 的新白皮书。联合作者 Alexei Zamyatin 和比特币侧链 BOB 的联合创始人周四在 X 上分享了相关细节。</p><p>白皮书详细介绍了通过改善交易处理能力和更新加密方法来提高比特币网络交易效率的最新努力。</p><p>该文件指出, BitVM2 的主要目标是在不修改其核心代码或去中心化原则的情况下, 提高比特币的交易容量。</p><p>白皮书解释说, BitVM2 采用乐观运算来扩展比特币侧链。它假设这些网络的运营商诚实行事, 直到质疑者使用欺诈证明证明其不诚实。</p><p>在白皮书中, BitVM2 引入了一个无许可系统, 允许任何用户质疑可疑交易, 这与之前版本只允许指定方进行质疑不同。</p><p>它还提到改进了 BitVM Bridge, 重点是降低资本要求和缩短资产锁定期。这些改进支持比特币在 rollup (二层网络) 之间的转移, rollup 可以提供更快速和更便宜的交易。</p><p>ZeroSync 项目负责人 Robin Linus 在去年 10 月首次介绍了 BitVM。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-sidechain-developers-unveil-bitvm2-whitepaper-with-improved-scaling-capabilities?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/d76f.jpeg',
      source_url:
        'https://www.theblock.co/post/311512/bitcoin-sidechain-developers-unveil-bitvm2-whitepaper-with-improved-scaling-capabilities',
      timestamp: 1723804323000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '侧链',
        },
      ],
    },
    {
      title: '现货比特币 etf 有 8100万 美元退出，结束了连续两天的正流动',
      content:
        '<p>据 The Block 报道, 美国现货比特币 ETF 周三录得 8,136 万美元的净流出, 而现货以太坊 ETF 则有 1,077 万美元流入基金。</p><p>贝莱德的 IBIT 录得 268 万美元的温和流入, 而前一天的流入达 3,455 万美元。</p><p>美国现货比特币交易所交易基金周三有 8,136 万美元流出产品, 结束了连续两天的正流入势头。</p><p>按净资产计算最大的现货比特币 ETF 贝莱德的 IBIT 录得 268 万美元的净流入, 根据 SosoValue 的数据。富兰克林的 EZBC 录得 342 万美元的流入, 标志着自 7 月 22 日以来首次净流入。这两只基金是周三唯一报告流入的基金。</p><p>格雷斯凯的 GBTC 报告了该类基金中最大的流出, 净流出 5,687 万美元。其次是富达的 FBTC, 流出 1,805 万美元, Ark 和 21Shares 的 ARKB 流出 677 万美元, Bitwise 的 BITB 流出 578 万美元。</p><p>其他 6 只现货比特币 ETF 当天录得零流动。</p><p>所有现货比特币基金的总日交易量周三达到 13 亿美元, 而周二为 11.8 亿美元。</p><p>现货以太坊 ETF 继续呈现正流向<br>与此同时, 9 只现货以太坊 ETF 周三录得 1,077 万美元的净流入, 连续第三天保持正流向, 根据 SosoValue 的数据。</p><p>格雷斯凯以太坊信托(ETHE)继续出现流出, 有 1,695 万美元流出该产品。这是唯一一只出现流出的现货以太坊 ETF。</p><p>第二大现货以太坊 ETF 格雷斯凯以太坊迷你信托(ETH)录得 226 万美元的温和流入,此前连续两天报告零流动。</p><p>贝莱德的 ETHA 录得该类 ETF 中最大的流入, 达 1,613 万美元。富达的 FETH 录得 665 万美元的流入, Bitwise 的 ETHW 录得 267 万美元的净流入。</p><p>周三, 这 9 只 ETF 的总交易量为 1.5591 亿美元, 远低于周二的 1.9076 亿美元和周一的 2.8596 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-bitcoin-etfs-see-81-million-exit-ending-two-day-positive-flow-streak?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/fdg8.jpeg',
      source_url:
        'https://www.theblock.co/post/311311/spot-bitcoin-etfs-see-81-million-exit-ending-two-day-positive-flow-streak',
      timestamp: 1723717264000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '币安在与 FIU 和解 225 万美元罚款后重新进入印度',
      content:
        '<p>据 The Block 报道, Binance 今天宣布, 其网站和应用程序现已完全向印度用户开放。</p><p>一位 Binance 发言人告诉 The Block, 该交易所已经支付了印度监管机构之前施加的 225 万美元罚款。</p><p>Binance 已经注册为印度金融情报部门的"报告实体", 这表明世界最大的加密货币交易所现在获准在印度运营, 此前它从 1 月份开始就被阻止在印度运营。</p><p>在今天发布的一篇博客文章中, Binance 表示, 其网站和应用程序现已完全向印度用户开放。"与 FIU 的注册凸显了 Binance 在印度以及其他它经营所在司法管辖区遵守反洗钱标准的承诺, "该交易所表示。</p><p>Binance 首席执行官 Richard Teng 在文章中表示, "认识到印度 VDA 市场的活力和潜力, 与印度法规的这种一致有助于我们为印度用户量身定制服务"。</p><p>Binance 重新进入印度, 此前印度监管机构在 1 月份阻止了 9 个加密货币网站, 因为它们在未能遵守当地法规的情况下进行了非法运营。</p><p>6 月,FIU 正式命令 Binance 支付 1.882 亿印度卢比(225 万美元)的罚款, 原因是违反了该国《预防洗钱法》下的规则。当时 FIU 表示, 它已经向 Binance 发出了具体指示,要求该公司确保严格遵守该国的反洗钱法。</p><p>Binance 发言人今天告诉 The Block, "我们可以确认罚款已经支付"。</p>',
      url: 'https://tokeninsight.com/zh/news/binance-re-enters-india-after-settling-2.25-million-penalty-with-fiu?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dsa976.jpeg',
      source_url:
        'https://www.theblock.co/post/311317/binance-re-enters-india-after-settling-2-25-million-penalty-with-fiu',
      timestamp: 1723716581000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '现货以太坊 etf 净流入 2400 万美元，Grayscale 的 ETHE 回到负流量',
      content:
        '<p>据 The Block 报道：美国现货以太坊交易所交易基金录得 24.3 百万美元的净流入 , 而现货比特币交易所交易基金则录得 38.9 百万美元的流入 。</p><p>Grayscale 的 ETHE 在前一天没有流量后又转为负流量 。</p><p>周二 , 美国现货以太坊交易所交易基金录得 24.34 百万美元的净流入 , 延续了周一的正流量 。 与此同时 , Grayscale 以太坊信托基金 (ETHE) 在前一天报告零流量后又转为负流量 。</p><p>根据 SosoValue 的数据 , Grayscale 的 ETHE 是周二唯一一只报告净流出的现货以太坊基金 , 有 31 百万美元流出 。</p><p>其他三只基金的流入抵消了这一流出 。 贝莱德的 ETHA 是昨天流入最大的基金 , 录得 49.12 百万美元的净流入 , 而前一天没有流量 。 富达的 FETH 录得 5.41 百万美元的净流入 , 而 Inveco 的 QETH 录得 813,690 美元的流入 。</p><p>周二九只现货以太坊交易所交易基金的总日交易量约为 1.91 亿美元 , 而周一为 2.859 亿美元 。</p><p>现货比特币 ETF 继续保持正流量<br>与此同时 , 根据 SosoValue 的数据 , 美国 12 只现货比特币 ETF 周二录得 38.94 百万美元的净流入 。</p><p>这主要来自于最大的现货比特币 ETF 贝莱德的 IBIT , 它昨天录得 34.55 百万美元的净流入 。</p><p>富达的 FBTC 以 22.56 百万美元的净流入紧随其后 , 比特股的 BITB 录得 16.54 百万美元的流入 。</p><p>Grayscale 的 GBTC 继续出现流出 , 有 28.65 百万美元流出 , 使该 ETF 连续第九天出现流出 。 Ark 和 21Shares 的 ARKB 昨天录得 6 百万美元的净流出 。</p><p>周二 , 这 12 只 ETF 的总日交易量为 11.8 亿美元 , 略低于周一的 13 亿美元 。</p><p>根据 The Block 的价格页面 , 比特币价格在过去 24 小时内上涨了 3.27% 至 61,109 美元 。 以太坊上涨 2.1% 至 2,713 美元 。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-record-24-million-in-net-inflows-grayscale-s-ethe-shifts-back-to-negative-flows?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/閪粉.jpeg',
      source_url:
        'https://www.theblock.co/post/311054/spot-ethereum-etfs-record-24-million-in-inflows-grayscales-ethe-shifts-back-to-negative-flows',
      timestamp: 1723630949000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title:
        '高盛 (Goldman Sachs) 报告称，截至6月30日，其持有的现货比特币 ETF 价值 4.18 亿美元',
      content:
        '<p>据 The Block 报道 : 这家华尔街巨头拥有近 700 万股的贝莱德 IBIT 基金 , 这使其成为该基金第三大持有者 。</p><p>根据周二提交给证券交易委员会的季度 13F 备案 , 跨国金融服务公司高盛持有价值约 4.186 亿美元的美国比特币现货交易所交易基金 (ETF) 股票 。</p><p>该投资银行最大的比特币现货 ETF 持股为 690 万股的贝莱德 iShares 比特币信托基金 , 价值 2.386 亿美元 。 根据 Fintel 的数据 , 高盛是 IBIT 基金第三大持有者 , 仅次于 Millennium Management 和 Capula Management Ltd 。</p><p>高盛还披露持有 150.1 万股的 Fidelity FBTC , 价值 7950 万美元 , 以及 660,183 股的 Grayscale 转换比特币基金 , 价值 3510 万美元 。 其比特币 ETF 持股清单还包括 5610 万美元的 Invesco Galaxy 比特币 ETF , 以及来自 Bitwise 、 WisdomTree 和 Ark-21Shares 的三只其他基金 , Macroscope 在 X 上首次注意到 。</p><p>持有 1 亿美元以上权益资产的机构投资经理必须每季度向 SEC 提交 13F 备案 。 13F 备案提供了投资经理的长期股权头寸和期权的季度快照 。 然而 , 这些报告不披露空头头寸 , 这限制了它们作为投资组合策略综合概览的效用 。</p><p>欧洲最大的对冲基金之一 Capula 在本月早些时候提交的 13F 备案中披露 , 其比特币现货 ETF 持股达 4.64 亿美元 。 其两大最大持股也是贝莱德和富达的比特币现货基金 。</p>',
      url: 'https://tokeninsight.com/zh/news/goldman-sachs-reports-418-million-in-spot-bitcoin-etf-holdings-as-of-june-30?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/df878.jpeg',
      source_url:
        'https://www.theblock.co/post/311061/goldman-sachs-418-million-spot-bitcoin-etfs',
      timestamp: 1723630581000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Curve Finance 减少 CRV 排放，提高 DAO 的可持续性',
      content:
        '<p>据 Cointelegraph 报道, Curve Finance 的 CRV 代币发行量减少至年度 1.627 亿枚, 而 Curve DAO 的收益首次超过发行量。</p><p>Curve Finance 是一个去中心化交易所(DEX)和自动做市商(AMM)平台, 宣布减少其本地 CRV 代币的年度发行量。&nbsp;</p><p>根据 Cointelegraph 获得的新闻稿,这是"自 2020 年代币推出以来的第五次连续年度发行量减少"。</p><p>"2020 年, 发行量为每年 2.74 亿枚代币, 而现在到 2024 年, 这一数字已下降到约 1.627 亿枚。"</p><p>CRV 总供给量减少<br>年度减少使 CRV 总供给量降至 20.9 亿枚, 其中"约 9.3 亿枚"永久锁定在平台上作为 vote-escrowed veCRV。</p><p>考虑到被锁定的供给, CRV 代币的当前流通供给"约为 11.6 亿枚", 与"Curve 平台上所有锁定期的终止"保持一致。</p><p>"发行量的减少和锁定期的终止同时发生, 意味着 CRV 代币的整体年通胀率将大幅下降 - 从 20% 降至仅约 6%。"</p><p>Curve DAO 的影响<br>第五次 CRV 发行量减少和锁定期终止, 也与 Curve 去中心化自治组织(DAO)的一个里程碑同步。</p><p>Curve DAO 的收益"全部分配给 veCRV", 首次超过 CRV 的发行量, 表明该生态系统正在"走向可持续发展的道路"。</p><p>"...被锁定的代币数量不断增加意味着 Curve 的参与者打算长期留在该平台, 对其发展越发承诺。"</p><p>Curve Finance 采用稳定币支付手续费<br>6 月 28 日, Curve Finance 将其费用分配机制从 3cr 代币转变为使用本地稳定币 crvUSD。</p><p>采用 crvUSD 旨在激励用户, 同时提高稳定币的效用和与平台整体生态系统的集成。</p><p>当时,Curve Finance 的创始人 Michael Egorov 告诉 Cointelegraph, 这一转变意味着用户现在可以"以美元计价的稳定币"获得手续费, 大大简化了这一过程。</p>',
      url: 'https://tokeninsight.com/zh/news/curve-finance-reduces-crv-emissions-boosting-dao-sustainability?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdf976.jpeg',
      source_url:
        'https://cointelegraph.com/news/curve-finance-reduces-crv-emissions-boosting-dao-sustainability',
      timestamp: 1723544758000,
      tags: [
        {
          name: 'Curve',
        },
        {
          name: 'DAO',
        },
      ],
    },
    {
      title:
        '现货以太坊 etf 流入 490 万美元，Grayscale 的 ETHE 结束了连续 14 天的流出',
      content:
        '<p>据 The Block 报道, 美国现货以太坊 ETF 录得 490 万美元的净流入, 而现货比特币 ETF 则报告了 2780 万美元的流入。</p><p>格雷斯凯尔的 ETHE 在转换为现货以太坊 ETF 后连续 14 天出现净流出, 但周一录得零流量。</p><p>美国现货以太坊交易所交易基金(ETF)周一录得 490 万美元的流入, 而格雷斯凯尔以太坊信托(ETHE)在转换为 ETF 后首次录得零流量。</p><p>根据 SosoValue 的数据, 这 9 只以太坊 ETF 的净流入扭转了此前连续 3 天的负流。</p><p>值得注意的是, 格雷斯凯尔的 ETHE 在连续 14 天出现流出后录得零流量。VanEck 的 ETHV 是唯一一只经历净流出的现货以太坊 ETF,流出 292 万美元。这是 ETHV 自 7 月 23 日以来首次报告流出。</p><p>富达的 FETH 录得 398 万美元的净流入, Bitwise 的 ETHW 报告流入 286 万美元。Franklin 的 EZET 流入约 101 万美元。</p><p>现货以太坊 ETF 的 总日交易量周一达到 2.86 亿美元, 上周五为 1.669 亿美元。</p><p>现货比特币 ETF 录得流入<br>与此同时, 美国 12 只现货比特币 ETF 周一报告了 2787 万美元的净流入。</p><p>ARK 和 21Shares 的 ARKB 在这些基金中录得最大的净流入, 达 3540 万美元。贝莱德的 IBIT 录得 1345 万美元的净流入, 而格雷斯凯尔的 BTC 流入 785 万美元。</p><p>Bitwise 的 BITB 和格雷斯凯尔的 GBTC 分别出现 1706 万美元和 1177 万美元的流出。</p><p>撰稿时, 比特币价格在过去 24 小时内上涨 1.09% 至约 59,128 美元, 根据 The Block 的价格页面。以太坊则上涨 4.51% 至 2,657 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-see-4.9-million-in-inflows-grayscale-s-ethe-ends-14-day-outflow-streak?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/收到767、.jpeg',
      source_url:
        'https://www.theblock.co/post/310865/spot-ethereum-etfs-see-4-9-million-in-inflows-grayscales-ethe-ends-14-day-outflow-streak',
      timestamp: 1723544163000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '香港将在 18 个月内加强数字资产监管',
      content:
        '<p>根据 Cointelegraph 报道：香港正着手建立全面的监管框架,旨在吸引全球金融科技人才,促进创新,并确保数字资产交易的安全性和完整性。</p><p>作为成为全球金融科技中心的使命的一部分,香港将在未来18个月内加强其数字资产监管。</p><p>在"2024年远景"年度峰会上,香港特别行政区立法会议员邱腾华概述了该市吸引技术人才、建设新基础设施和建立强有力的立法监管的战略计划。</p><p>建立健全的数字资产框架<br>邱强调,这一倡议对未来5到10年的科技产业至关重要。"数字资产行业在过去几年中取得了重大进展,但我们仍处于非常早期的阶段,"邱说。"我们应该建立一个健全的交易所系统,并尽快引入与稳定币相关的法律。"</p><p>预计香港将在2024年底前引入与法定货币挂钩的加密货币稳定币。</p><p>根据邱的说法,沙盒测试已经开展,政府计划在1到1.5年内加强对与数字资产金融产品相关立法的监管和执法。下一步将鼓励项目方在香港探索更多创新的金融产品。</p><p>稳定币沙盒</p><p>香港金融管理局最近在7月18日宣布了其稳定币发行商沙盒的首批参与者。参与者包括一家与大型中国电商零售商有关联的公司、一家本地金融科技公司,以及渣打银行、Animoca Brands和香港电讯组成的联盟。</p><p>京东联链科技也是参与者之一,计划发行与港元挂钩的1:1稳定币。</p><p>这一计划中的稳定币立法彰显了香港的亲加密金融方针,旨在促进创新同时确保监管监督。7月23日,中国最大的资产管理公司之一的嘉实基金管理公司在香港推出了亚洲首只比特币期货反向产品。</p><p>嘉实比特币期货每日(-1x)反向产品(7376.HK)紧随2022年12月该公司推出的比特币期货ETF(3066.HK)之后。</p>',
      url: 'https://tokeninsight.com/zh/news/hong-kong-to-enhance-digital-asset-regulation-in-18-months?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdkj97.jpeg',
      source_url:
        'https://cointelegraph.com/news/hong-kong-enhance-digital-asset-regulation-18-months',
      timestamp: 1723457851000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'ETH 燃烧率下降到最低水平，因为天然气费用徘徊在 2 gwei',
      content:
        '<p>据 The Block 报道, 以太坊网络每日 ETH 销毁量已降至近年来的最低水平。</p><p>目前天然气费用在 1 gwei 到 2 gwei 之间, 这影响了 ETH 的发行。</p><p>周六仅销毁 210 ETH, 而由于天然气费用较低, 净 ETH 发行量超过 2,000 ETH。</p><p>以太坊网络每日 ETH 销毁量已降至今年最低水平, 撰稿时基础费用徘徊在 1 到 2 gwei 之间。</p><p>基础天然气费用的下降代表了近年来观察到的最低水平之一, 这也相应影响了 ETH 的发行。</p><p>周六仅销毁 210 ETH, 创下今年新低,因为天然气费用保持较低。相比之下,8 月 5 日, 当天然气费用约达 100 gwei 时, 每日销毁量激增至 5,000 ETH。</p><p>由于天然气费用如此低廉, 网络的通胀率有所上升。据 The Block 的数据, 周六,虽然销毁了 210 ETH, 但净 ETH 发行量报告为超过 2,100 ETH。</p><p>考虑到这一通胀趋势, Gnosis 创始人 Martin Köppelmann 建议暂时增加天然气限制。"基础费用达到约 0.8 GWEI 的多年最低水平。需要 23.9 GWEI 来抵消质押奖励。在我看来, 以太坊需要再次提高 L1 活动, 即使在如此低的费率下听起来有些违反直觉, 但提高天然气限制可以作为一种策略的一部分。"</p><p>2021 年 8 月实施的伦敦硬分叉(也称为 EIP-1559)引入了一种被销毁的基础费用和给验证者的优先费用。由于基础费用与网络活动直接相关, 较高的费用会导致更多 ETH 被销毁, 从而减少供给。</p><p>天然气费用下降归因于用户向 Layer 2 扩容解决方案的迁移增加, 以及 3 月份 Dencun 升级引入的 blob 交易的采用, 这有助于降低 Layer 2 网络的成本。</p><p>ETH 目前交易价格为 2,540 美元, 年初至今涨nearly 10%, 市值为 3,050 亿美元, 根据 The Block 的价格页面。</p>',
      url: 'https://tokeninsight.com/zh/news/eth-burn-rate-drops-to-lowest-levels-as-gas-fees-hover-at-2-gwei?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/楼7snfkd.jpeg',
      source_url:
        'https://www.theblock.co/post/310586/eth-burn-rate-drops-to-lowest-levels-as-gas-fees-hover-at-2-gwei',
      timestamp: 1723456918000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 流入 1.92 亿美元，以太 etf 损失 300 万美元',
      content:
        '<p>据 The Block 报道, 上周四, 贝莱德的 IBIT 基金以 1.576 亿美元的流入额领先其他基金。</p><p>现货以太坊 ETF 出现 2.87 百万美元的净流出。</p><p>美国现货比特币交易所交易基金 (ETF) 在上周四录得 1.9256 亿美元的正流入。</p><p>根据 SoSoValue 的数据, 贝莱德的 IBIT 基金在昨日的流入额中位居领先, 达到 1.576 亿美元。威斯多姆树的 BTCW 基金则成为昨日的黑马, 吸引了 1.1852 亿美元的流入, 这是它有史以来最大的流入额, 比前一天的最高纪录高出 10 倍有余。</p><p>此外,富达的 FBTC 基金录得 6,525 万美元的净流入, ARK Invest 和 21Shares 的 ARKB 基金录得 3,279 万美元的净流入。VanEck 的 HODL 基金也录得 338 万美元的净流入。</p><p>格雷斯凯尔转换后的 GBTC 基金在上周四录得相当大的 1.8294 亿美元的净流出。Hashdex 的现货比特币基金也出现 2.03 百万美元的流出。</p><p>上周四, 现货比特币 ETF 的总交易量达到 20 亿美元, 而前一天为 17.9 亿美元。自 1 月推出以来, 这 12 只基金已累计净流入 174.3 亿美元。</p><p>以太坊 ETF 出现小幅流出<br>美国现货以太坊 ETF 上周四的流入和流出基本持平, 导致净流出 2.87 百万美元。</p><p>贝莱德的 ETHA 基金录得 1,174 万美元的净流入, 而格雷斯凯尔的小信托基金录得 500 万美元的流入。Bitwise 的以太坊基金也录得 278 万美元的净流入。这些流入被格雷斯凯尔的 ETHE 基金 1,983 万美元的净流出和富达以太坊 ETF 258 万美元的流出所抵消。</p><p>以太坊 ETF 的总日交易量昨日达到 3.3849 亿美元, 自 7 月 23 日推出以来, 这些基金已累计净流出 3.9023 亿美元。</p><p>比特币价格在过去 24 小时内上涨 6.93% 至 60,837 美元, 以太坊则上涨 9.72% 至 2,662 美元, 据 The Block 的加密货币价格页面。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-see-192-million-in-inflows-ether-etfs-lose-3-million?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sldf.jpeg',
      source_url:
        'https://www.theblock.co/post/310363/us-spot-bitcoin-etf-192-million-inflows',
      timestamp: 1723198380000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Solana 开发人员通过协调补丁解决关键漏洞',
      content:
        '<p>根据 The Block 的报道, Solana 的开发人员、验证者和客户端团队合作解决了一个关键的安全漏洞。</p><p>开发人员确保在公开披露之前, 网络的绝大多数权益得到修复。</p><p>Solana 的开发人员、验证者和客户端团队在公开披露问题之前, 就解决了一个关键的安全漏洞, 并确保了网络绝大多数权益得到修复。</p><p>这一过程于 2024 年 8 月 7 日星期三开始, 当时 Solana 基金会通过私人渠道联系了已知的网络运营商,据 Solana 验证者 Laine 介绍。这初次接触是为了谨慎地修补漏洞, 以防止被以任何方式利用。</p><p>Laine 补充说, 这个补丁通过 Anza 工程师的 GitHub 存储库提供, 使运营商能够独立验证并应用这些更改。到 2024 年 8 月 8 日 UTC 14:00, 已向各利益相关方分发了实施补丁的详细说明,结果网络的 66.6% 权益得到了修复。</p><p>在 70% 的网络实施了该补丁后, 才公开披露了这一漏洞。随后, Solana Labs 在 Discord 上发布公告, 敦促所有剩余的运营商升级他们的系统。声明读道:"核心贡献者已经发现了一个需要紧急响应的网络安全问题。v1.18.21 带有补丁将在 30 分钟内提供。请准备好在公告发出后立即升级。"</p>',
      url: 'https://tokeninsight.com/zh/news/solana-developers-address-critical-vulnerability-with-coordinated-patch?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/djf7.jpeg',
      source_url:
        'https://www.theblock.co/post/310361/solana-developers-address-critical-vulnerability-with-coordinated-patch',
      timestamp: 1723197533000,
      tags: [
        {
          name: 'Solana',
        },
      ],
    },
    {
      title: '瑞波高管欢呼1.25亿美元罚款是“胜利”，瑞波币飙升26%',
      content:
        '<p>根据 The Block 的报道，随着 Ripple 与美国证券交易委员会 (SEC) 案件进入尾声，且没有迹象表明 XRP 将被归类为证券，XRP 的价格已经上涨了 26%。</p><p>XRP 的价格上涨 26%，这是因为纽约联邦法官推进了对 Ripple Labs 为期三年的证券诉讼的终结，Ripple 的高管将此称为对该行业的"胜利"。</p><p>在 8 月 7 日，法官命令 Ripple Labs 支付 1.25 亿美元的民事罚款，并表示该公司"永久被禁止和禁止"违反美国证券法，这是 SEC 提起的一起案件的一部分。</p><p>据 Cointelegraph 报道，这一裁决似乎将 Ripple 与 SEC 的案件推向最后阶段，因为监管机构最初在 2020 年 12 月提起了该诉讼。</p><p>根据 CoinMarketCap 的数据，消息传出后，XRP 价格上涨了 26%，至 0.63 美元，基本抵消了 8 月 5 日以来加密货币普跌造成的损失。</p><p>目前，XRP 的交易价格为 0.59 美元。</p><p>Ripple Labs CEO Brad Garlinghouse 在 X 上发帖表示："这是 Ripple、该行业和法治的胜利。SEC 针对整个 XRP 社区的阻力已经消除。"</p><p>Ripple Labs 联合创始人 Chris Larsen 补充说："SEC 对我们的疯狂运动终于结束了。希望这能结束本届政府对加密货币的战争。"</p><p>然而，其他加密货币评论者更关注 XRP 价格的变动。</p><p>加密货币律师兼 Hodl Law 创始人 Fred Rispoli 在 X 上写道："总的来说，这对 Ripple 来说是一个巨大的胜利。尽管我对 1.25 亿美元的罚款感到惊讶，但仅在过去 5 分钟内，Ripple 就从 XRP 价格上涨中获得了超过这笔罚款的收益。"</p><p>加密货币研究员 Ripple Van Winkle 告诉他的 10.84 万名 X 粉丝说："XRP 准备腾飞了！不再受到限制！不再被压价！这起诉讼结束了！!"</p><p>这一价格飙升使得多头头寸的清算规模比空头头寸多出 40%。</p><p>根据 CoinGlass 的数据，价格上涨导致价值 540 万美元的空头头寸被清算。</p><p>如果该趋势持续，且价格达到 0.65 美元，还可能会有 2000 万美元的空头头寸被清算。</p>',
      url: 'https://tokeninsight.com/zh/news/xrp-rockets-26-as-ripple-execs-hail-125m-penalty-as-victory?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sdafku.jpeg',
      source_url:
        'https://www.theblock.co/post/310207/bitcoin-etf-45-million-inflow-ether-etf-23-million-outflow',
      timestamp: 1723112291000,
      tags: [
        {
          name: 'Ripple',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 吸引了 4500 万美元，以太坊 etf 则流出 2300 万美元',
      content:
        '<p>据 The Block 报道, 12 只美国现货比特币 ETF 在经历了3天的净流出后, 回到了净流入。</p><p>以太坊 ETF 则出现净流出, 其中以 Grayscale 的 ETHE 基金为主导。</p><p>美国的现货比特币交易所交易基金(ETF)于周三重返正面流入, 报告净流入 4514 万美元。这要好于过去3个交易日比特币 ETF 流出约 5.54 亿美元的情况。</p><p>根据 SoSoValue 的数据, BlackRock 的 IBIT 以 5252 万美元的净流入领跑。其次是 WisdomTree 的 BTCW, 净流入 1050 万美元, 创下其历史最高净流入。Grayscale 的比特币迷你信托基金(Bitcoin Mini Trust)净流入 971 万美元, Bitwise 的 BITB 则录得 300 万美元的净流入。</p><p>Grayscale 改造的 GBTC 基金是唯一一只在周三录得净流出的比特币 ETF, 净流出 3058 万美元。包括富达 FBTC 和 VanEck 的 HODL 在内的另外 7 只基金当日零流入。</p><p>周三,现货比特币 ETF 的总交易量达到 17.9 亿美元, 而前一天为 22 亿美元。自1月份推出以来, 这12只基金累计净流入已达172.3亿美元。</p><p>以太坊ETF转为净流出<br>另一方面,现货以太坊 ETF 则转为净流出, 昨日净流出 2368 万美元。流出主要由 Grayscale 的 ETHE 基金引领,净流出 3186 万美元。</p><p>与此同时, 富达的 FETH 录得 470 万美元的净流入。Bitwise 和富兰克林邓普顿的现货以太坊基金也报告净流入。</p><p>以太坊 ETF 的总日交易量昨日达到 3.2285 亿美元, 自7月23日上市以来, 这些基金已累计净流出 3.8735 亿美元。</p><p>比特币价格在过去24小时内下降0.57%,至56,943.41美元, 而以太坊下跌3.67%, 至2,431.81美元, 根据 The Block 的加密货币价格页面。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-attract-45-million-ether-etfs-see-23-million-in-outflows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ds976n].jpeg',
      source_url:
        'https://www.theblock.co/post/310207/bitcoin-etf-45-million-inflow-ether-etf-23-million-outflow',
      timestamp: 1723111736000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 净流出 1.48 亿美元; 以太 etf 的资金流入为 9800 万美元',
      content:
        '<p>据 The Block 报道: 周二, 美国比特币现货 ETF 出现 1.485 亿美元的净流出。</p><p>以太坊现货 ETF 报告每日总流入 9830 万美元, 其中由 BlackRock 的 ETHA 主导。</p><p>美国比特币现货交易所交易基金 (ETF) 周二继续出现负流量, 录得 1.485 亿美元的净流出。</p><p>根据 SoSoValue 的数据, 富达 FBTC 在 12 只比特币基金中领跌,流出 6448 万美元。格雷斯柯尔转换的 GBTC 基金报告流出 3218 万美元, Ark Invest 和 21Shares 的 ARKB 录得 2888 万美元的净流出。富兰克林邓普顿的比特币基金也在周二流失 2300 万美元。</p><p>资产净值最大的比特币现货 ETF - BlackRock 的 IBIT, 以及其他 7 只基金, 昨日均报零流量。</p><p>周二,比特币现货 ETF 的交易量达到 22 亿美元。自 1 月推出以来, 这 12 只基金已累计净流入 171.9 亿美元。</p><p>以太坊现货 ETF 持续流入<br>与此同时, 以太坊现货 ETF 在周二也出现净流入, 报告每日总流入 9830 万美元。</p><p>最大流入来自 BlackRock 的 ETHA, 录得 10989 万美元。富达的 FETH 记录 2249 万美元, 格雷斯柯尔的小型信托基金流入 470 万美元, 富兰克林邓普顿的以太坊基金则流入不到 100 万美元。</p><p>SOFA.org 的见解负责人 Augustine Fan 告诉 The Block："我们需要把事情放在正确的视角中来理解比特币 ETF 和以太坊 ETF 之间的差异。首先, 以太坊 ETF 自推出以来的累积流入非常有限, 而比特币在过去一个月内则见证了大量的正流入。"</p><p>"以太坊在永续合约 / 现货 / ETF 方面已经经历了大量抛售, 所以看到小幅反弹也就很合理, 因为风险情绪正在略有好转, "Fan 评论道。</p><p>昨日, 以太坊基金的总交易量达到 3.3013 亿美元, 而自 7 月 23 日上市以来, 这些基金已累计流出 3.63 亿美元。</p><p>比特币和以太坊都正在从周一的全球市场下跌中恢复过来。根据 The Block 的价格页面, 比特币在过去 24 小时内上涨 2.61% 至 57,060 美元, 以太坊上涨 1.25% 至 2,522 美元。</p><p>SOFA.org 的 Fan 表示："加密货币的整体走势将与高贝塔股票 (科技股) 和风险偏好在短期内的表现保持一致, 我们预计这种情况会有所缓和。"</p><p>"要想重新步入正面方向, 我们需要更有信心美国不会陷入衰退, 鲍威尔在 Jackson Hole 的表现强劲, 最后是风险情绪在 9 月 / 10 月能够持续复苏, 也许特朗普的当选前景也能有所反弹。"</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-see-148-million-in-net-outflows-ether-etfs-log-98-million-in-inflows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/腌9sdf6.jpeg',
      source_url:
        'https://www.theblock.co/post/309868/us-spot-bitcoin-etf-148-million-outflows',
      timestamp: 1723027034000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '“发生了一些事情”——比特币持有者在过去 30 天里攫取了 230 亿美元',
      content:
        '<p>据 Cointelegraph 报道，链上数据显示，比特币鲸鱼在市场低迷的过去一个月中持续积累了比特币。</p><p>根据链上数据，比特币"永久持有人地址"在过去一个月内累积了近 230 亿美元的该资产。</p><p>8 月 7 日，CryptoQuant 创始人兼 CEO Ki Young Ju 在 X 平台上兴奋地表示，"我很确定幕后正在发生一些事情"。</p><p>这一评论是针对比特币永久持有人 30 天需求变化的最近激增。</p><p>过去 30 天内，价值约 228 亿美元或 404,448 个比特币已流入永久持有人地址，"而这明显是在积累"，Ki 说。</p><p>他预测，在一年内，某些实体，如传统金融机构、公司、政府或其他机构，"将宣布他们在 2024 年第三季度收购了比特币"，并补充道:</p><p>"散户投资者将后悔没有买入，因为他们担心德国政府出售、Mt. Gox 事件或其他任何宏观经济问题。"</p><p>在 8 月 7 日的另一篇 X 帖中，Ki Young 还提到了另外一些看涨因素，如比特币矿工活动。</p><p>他说，"矿工资本损失基本结束了"，并补充称哈希率接近历史高点，而美国矿业成本约为每枚 43,000 美元，因此除非价格跌破这一水平，否则哈希率很可能保持稳定。</p><p>他表示，"散户投资者大多缺席，类似于 2020 年中期"，并补充说长期持有者(超过 3 年)在 3 月至 6 月之间有所出售，但"目前没有来自老鲸的显著抛售压力"。</p><p>他说："根据这些数据，我相信牛市仍在继续。如果两周内市场不能复苏，我会重新考虑。我关注智慧资金，所以如果我错了，这意味着新鲸鱼要么被误导了，要么低估了宏观环境。"</p><p>7 月底，他观察到流向永久持有人地址(如交易所交易基金)的资金流，并表示并非所有剩余的比特币都在托管钱包中，"但鲸鱼明显正在积累，这是前所未有的水平"。</p><p>自 8 月 5 日市场低迷导致比特币价格暴跌至 49,800 美元以来，这种积累行为似乎有所增加，根据 Cointelegraph 的数据。</p><p>该资产已从那时起反弹 14%，于 8 月 6 日重新站稳 57,000 美元。此外，加密货币恐慌-贪婪指数已从极度恐慌转移到恐慌，表明情绪略有好转。</p>',
      url: 'https://tokeninsight.com/zh/news/something-is-happening-bitcoin-hodlers-scooped-23b-in-the-past-30-days?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/so7.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-hodlers-scooped-23-billion-past-30-days',
      timestamp: 1723026107000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '加密货币市场低迷，Memecoins 暴跌',
      content:
        '<p>据 The Block 报道: GMCI 纪念币指数显示, 该板块在过去 24 小时内下跌 8.87%。</p><p>Cinneamhain Ventures (CEHV) 普通合伙人 Adam Cochran 表示, 无论何时市场出现下跌, 纪念币都会受到重创。</p><p>广泛的加密货币市场下跌也没有放过纪念币领域。</p><p>The Block 的 GMCI 纪念币指数显示, 该板块在过去24小时内下跌8.87%。按权重计算, 前三大资产-Dogecoin、Shiba Inu 和 Pepe- 分别下跌 9.23%、2.36% 和 13.87%。</p><p>Solana 上的 memecoin 也遭到重创。它们的市值在一天内下跌了 16%, The Block 之前有报道。</p><p>Cochran 表示, 无论何时市场出现下跌, 纪念币都会受到重创。他在社交媒体平台X上写道: "我们开始清洗掉一些 memecoin。在 \'Pump Fun\' 上获得 6.9 万美元价格并在 DEX 上市的币种的\'毕业率\'一直停滞在 1.4% 左右, 同时也没有新 memecoin 突破 2000 万美元的完全稀释估值(FDV), 概念币在任何轻微波动中都会遭受最严重的打击,这都表明我们终于要走出这轮概念币周期。"</p><p>根据 The Block Prices 的数据, 截至 8 月 5 日下午 5 点(UTC 21:00), Dogecoin 的交易价格为 0.094 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/memecoins-tank-amid-crypto-market-downturn?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/s9d7f6.jpeg',
      source_url:
        'https://www.theblock.co/post/309591/memecoins-tank-amid-crypto-market-downturn',
      timestamp: 1722939969000,
      tags: [
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: '由于市场动荡，美国现货比特币 etf 昨日净流出1.68亿美元',
      content:
        '<p>据The Block报道:美国比特币现货交易所交易基金(ETF)昨天经历了$1.684亿的净资金流出。</p><p>格雷森的GBTC在周一主导了$6,912万的净流出。</p><p>加密货币和全球股票市场在当天经历了大幅动荡。</p><p>美国比特币现货交易所交易基金(ETF)在周一经历了$1.684亿的净资金流出,这是由于加密货币市场出现了显著的动荡。</p><p>在12只比特币现货ETF中,格雷森的GBTC录得$6,912万的日度净流出,根据SoSoValue的数据。Ark Invest和21Shares的ARKB紧随其后,流出$6,900万,而富达的比特币基金报告净流出$5,800万。</p><p>这些流出被格雷森最新上市的比特币信托基金的$2,181万净流入所抵消。VanEck和Bitwise的ETF在周一也吸引了约$300万资金。</p><p>规模最大的比特币现货ETF - 贝莱德的IBIT,以及Valkyrie、Invesco和其他3只基金,昨天都没有资金流动。这12只基金自1月以来累计净流入$173.4亿。</p><p>周一,比特币现货ETF的总交易额达$52.4亿,这是自3月25日以来最高的单日交易额,这可能是由于当日全球市场的剧烈动荡。</p><p>全球加密货币和股票市场在周一的大幅下跌,是由多重金融和宏观经济因素引发的。影响全球股市的宏观问题包括中东局势升级和美国经济数据疲弱,而加密货币相关因素如Jump Crypto的资产动向和即将到来的美国选举不确定性,也进一步导致了加密货币市场抛售。</p><p>比特币价格一度跌破$50,000大关,但已收复至$55,524,根据The Block的比特币价格页面。以太坊价格周一也暴跌至约$2,200的低位,并反弹至$2,500。</p><h2>以太币现货ETF录得涨幅</h2><p><br>尽管市场遭受重创,但以太币现货ETF在周一录得$4,873万的净流入。以BlackRock的ETHA基金的$4,700万流入为首,SoSoValue数据显示。VanEck和富达的以太币ETF紧随其后,净流入约$1,600万,而格雷森的以太币小型信托基金流入$759万。Bitwise和富兰克林邓普顿的基金也录得净流入。</p><p>格雷森的ETHE基金是唯一在周一录得$4,684万净流出的ETF。Invesco和21Shares的基金当日无资金流动。它们的总交易额达$7.1561亿。</p><p>这些以太币现货ETF才刚刚在上月开始交易,已累计净流出$4.6198亿。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-saw-168-million-in-net-outflows-yesterday-amid-market-turbulence?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/skdf67.jpeg',
      source_url:
        'https://www.theblock.co/post/309632/us-spot-bitcoin-etf-168-million-outflows',
      timestamp: 1722939293000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '随着价格下滑，Jump Crypto 移动了数亿美元的加密货币',
      content:
        '<p>据 The Block 报道, Jump Trading 的加密货币部门 Jump Crypto 似乎正在清算一些头寸, 将硬币从交易所热钱包转移到交易所充值地址, 这可从区块链数据中看出。</p><p>大部分加密货币是 Jump 从 7 月 25 日开始赎回并可能出售的质押以太币, 这是在美国基于现货的以太坊 ETF 推出后几天。</p><p>随着加密货币行业的资产价格继续下滑, 比特币今天跌破 60,000 美元后才略有回升, 数据显示 Jump Crypto 正在清算价值数亿美元的加密货币。</p><p>由 Arkham Intelligence 标记为 Jump Crypto 交易公司所有的地址从昨天(8 月 3 日)开始流入约 3 亿美元, 主要来自被 Arkham 标记为交易所钱包的地址。同样, 该交易公司的钱包在同一时期流出约 8000 万美元, 主要流向 Coinbase、Gate.io、Binance 等交易所, 区块链数据显示这一资金转移正在进行中。</p><p>被转移的大部分资金是以太币。正如用户 EmberCN 指出的, Jump 似乎自 7 月 25 日以来一直在将价值超过 5 亿美元的 Lido 的 wstETH 赎回为以太币, 这是在 23 日美国基于现货的以太坊 ETF 推出后几天。根据 EmberCN 的说法, Jump 目前仍持有价值约 1.3 亿美元的质押以太币, 而价值近 2 亿美元的未质押以太币已进入交易所。</p><p>Jump Crypto 的总裁 Kanav Kariya 在 6 月份离开了该公司, 此前曾有报道称美国商品期货交易委员会正在调查该公司的加密货币投资活动。</p>',
      url: 'https://tokeninsight.com/zh/news/jump-crypto-moves-hundreds-of-millions-in-crypto-as-prices-slide?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/oub97\\\\.jpeg',
      source_url:
        'https://www.theblock.co/post/309266/jump-crypto-moves-hundreds-of-millions-in-crypto-as-prices-slide',
      timestamp: 1722854159000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '5000 亿美元的暴跌: 加密货币一年来最大的三天暴跌',
      content:
        '<p>根据 Cointelegraph 的报道, 加密货币市场刚刚经历了 12 个月以来最大规模的三天抛售。这次抛售的主要原因是美国就业数据疲软以及对经济衰退的担忧再度升温。</p><p>从 8 月 2 日开始, 加密货币市场的总市值减少了多达 5100 亿美元, 创下近一年来最大的三天抛售纪录。这次加密货币市场的剧烈抛售与股市表现不佳有关, 同期标准普尔 500 指数下跌了 4.4%。</p><p>市场下跌主要受到了疲软的就业数据、主要科技股增长放缓以及经济衰退担忧的影响。多家大型公司如微软和英特尔公布的第二季度业绩低于预期, 而英伟达等市场领头羊受到了即将降息的预期打击, 导致资金流向了较小的滞后公司。</p><p>上一次加密货币出现如此剧烈的三天抛售是在 2023 年 8 月中旬。比特币和以太坊在 8 月 5 日的抛售中分别下跌了 10% 和 18%。在过去七天内, 比特币和以太坊的价格分别下跌了 20% 和 28%。</p><p>在前十大加密货币中, 第一层网络 Solana 受到的打击最为严重, 自 7 月 30 日以来下跌了 30.6%。一些分析师指出, Jump Crypto 大规模抛售也助长了这一情况。</p><p>加密恐惧与贪婪指数目前已下降至"恐惧"区间, 显示分数为 26。展望未来,加密市场面临另一周的艰难局面, 需要传统金融机构的现货和衍生品交易回升来支撑。</p>',
      url: 'https://tokeninsight.com/zh/news/500b-plunge-largest-3-day-wipeout-for-crypto-in-a-year?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dsf9876.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-crash-300-billion-largest-three-day-plunge-crypto-one-year',
      timestamp: 1722853906000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 流入 5000 万美元，以太坊 etf 回归正流量',
      content:
        '<p>据 The Block 报道: 周四, 美国现货比特币 ETF 录得 5,064 万美元的净流入, 其中由于格雷斯卡尔比特币迷你信托基金(Grayscale\'s Bitcoin Mini Trust)仅在周三开始交易, 成为主导。</p><p>现货以太坊 ETF 录得 2,675 万美元的净流入, 而基金交易量有所下降。</p><p>美国 12 只现货比特币交易所交易基金(ETF)周四共录得 5,064 万美元的每日净流入, 而现货以太坊 ETF 则重拾净流入, 录得 2,675 万美元。</p><p>根据 SoSoValue 的数据, 格雷斯卡尔的比特币迷你信托基金(Grayscale\'s Bitcoin Mini Trust)仅在周三开始交易, 但昨日以 19,113 万美元的净流入领跑。其次是贝莱德(BlackRock)的 IBIT, 录得 2,590 万美元的流入。</p><p>这些流入被五只美国基金的净流出所抵消, 其中包括格雷斯卡尔的 GBTC, 周四流出 7,133 万美元。富达(Fidelity)的 FBTC 录得 4,840 万美元的净流出, 而 Ark Invest 和 21Shares 的 ARKB 录得 2,242 万美元的流出。来自 Bitwise 和 VanEck 的基金也录得净流出,而其他五只来自 Valkyrie 等发行商的基金昨日则录得零流动。</p><p>12 只比特币 ETF 周四的每日总交易量约为 29.1 亿美元,而周三为 13.7 亿美元。自 1 月以来, 这些现货比特币产品累计净流入 177.4 亿美元。</p><p>根据 The Block 的比特币 ETF 跟踪器, 周四最大的两只现货比特币 ETF - 贝莱德的 IBIT 和格雷斯卡尔的 GBTC - 均下跌约 3%。</p><p>流入由贝莱德的 ETHA 主导, 录得正流入 8,965 万美元。富达的以太坊基金录得 1,170 万美元的净流入, 而 Bitwise 的 ETHW 录得 335 万美元。</p><p>数据显示, 格雷斯卡尔的 ETHE 以 7,795 万美元的每日净流出抵消了大部分流入。</p><p>周四, 以太坊基金的总交易量为 3.3111 亿美元,显示自 7 月 23 日首次亮相以来交易量有所下降, 当时交易量约为 11.1 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-log-50-million-in-inflows-ether-etfs-return-to-positive-flows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kjsd79.jpeg',
      source_url:
        'https://www.theblock.co/post/309034/us-spot-bitcoin-etf-50-million-inflows',
      timestamp: 1722594743000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: '在美国政治赌注的推动下，Polymarket 累计成交量突破 10 亿美元',
      content:
        '<p>据 Cointelegraph 报道 : 尽管收到了价值超过 40 亿美元的比特币 , 这些比特币在 Mt. Gox 崩溃后 10 年里升值超过 8,500% , 但 Mt. Gox 破产管理人的债权人仍在持有他们的资产。</p><p>近一半的应归还给 Mt. Gox 债权人的比特币已经分发 , 但尽管等待了 10 年 , 许多债权人仍在持有他们的比特币。</p><p>共 141,686 个比特币中 , 有 41.5% 或 59,000 个比特币已经被重新分配给了破产的 Mt. Gox 交易所的债权人。</p><p>尽管收到了价值近 40 亿美元的比特币 , 但根据 7 月 29 日的 Glassnode 报告 , Mt. Gox 的债权人们并没有进行出售。</p><p>" 债权人选择收取比特币而不是法定货币 , 这在日本破产法中是一个新做法。 因此 , 很可能只有这些分发的硬币中的一小部分会真正被卖到市场上。 "</p><p>共有价值 94 亿美元的比特币被欠给约 12.7 万名 Mt. Gox 的债权人 , 他们已经等待了 10 多年才收回他们的资金 , 这可能会带来巨大的抛售压力 , 从而拖累比特币的价格。</p><p>这份报告是在 Kraken 于 7 月 24 日完成了向 Mt. Gox 债权人分发比特币的工作一周后发布的。</p><p>Mt. Gox 曾是一家位于日本的著名比特币交易所 , 但在 2014 年遭到黑客攻击而崩溃。</p><p>该交易所成立于 2010 年 , 在高峰期曾处理超过 70% 的比特币交易量。 Mt. Gox 损失了 85 万个比特币 , 使其成为有史以来最大的一次黑客攻击。</p><p>基于交易所交易量 , Mt. Gox 债权人并未进行抛售<br>尽管 Glassnode 承认其理论存在 " 一定程度的猜测 " , 但加密货币交易所的基础数据也表明 , Mt. Gox 的债权人并未进行抛售。</p><p>值得注意的是 , 衡量现货买卖交易量净差的指标累积成交量差 (CVD) , 在 Mt. Gox 比特币分发后在 Kraken 上也没有出现明显上升。</p><p>报告指出 : " 我们可以看到在分发后出现了适度的卖出压力上升。 但这仍然在日常范围内。 "</p><p>这种缺乏抛售压力令人惊讶 , 因为自 Mt. Gox 崩溃以来 , 比特币价格已经上涨了 8,500% 以上。</p><p>比特币投资者正在转向 " Hodling "<br>比特币的当前分布情况表明 , 投资者已经完成了获利回吐 , 正在转向 " Hodling " , 这是加密货币圈的行话 , 意为死命般地持有。</p><p>值得注意的是 , 新投资者持有的比特币比例出现了明显下降 , 这类似于宏观市场高点附近的行为模式。</p><p>这突出了投资者行为向 Hodling 的转变 , 据 Glassnode:</p><p>" 这描述了长期投资者在价格达到 7.3 万美元历史新高前为满足新需求而支出和出售币的行为。 近期这些曲线的下降速率有所放缓 , 这表明投资者行为正在逐步回归以 Hodling 为主导。 "</p><p>超过 65.8% 的比特币供给已经静置超过一年 , 而超过 54% 的比特币已经静置超过两年。</p>',
      url: 'https://tokeninsight.com/zh/news/polymarket-crosses-1-billion-in-cumulative-volume-driven-by-us-political-bets?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kjsadg796.jpeg',
      source_url:
        'https://www.theblock.co/post/309061/polymarket-crosses-1-billion-in-cumulative-volume-driven-by-us-political-bets',
      timestamp: 1722594458000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'DEX',
        },
      ],
    },
    {
      title: '超过 41.5% 的 Mt. Gox 比特币作为债权人继续持有',
      content:
        '<p>据 Cointelegraph 报道 : 尽管收到了价值超过 40 亿美元的比特币, 这些比特币在 Mt. Gox 崩溃后 10 年里升值超过 8,500%, 但 Mt. Gox 破产管理人的债权人仍在持有他们的资产。</p><p>近一半的应归还给 Mt. Gox 债权人的比特币已经分发, 但尽管等待了 10 年 , 许多债权人仍在持有他们的比特币。</p><p>共 141,686 个比特币中, 有 41.5% 或 59,000 个比特币已经被重新分配给了破产的 Mt. Gox 交易所的债权人。</p><p>尽管收到了价值近 40 亿美元的比特币, 但根据 7 月 29 日的 Glassnode 报告, Mt. Gox 的债权人们并没有进行出售。</p><p>" 债权人选择收取比特币而不是法定货币, 这在日本破产法中是一个新做法。 因此, 很可能只有这些分发的硬币中的一小部分会真正被卖到市场上。 "</p><p>共有价值 94 亿美元的比特币被欠给约 12.7 万名 Mt. Gox 的债权人, 他们已经等待了 10 多年才收回他们的资金, 这可能会带来巨大的抛售压力, 从而拖累比特币的价格。</p><p>这份报告是在 Kraken 于 7 月 24 日完成了向 Mt. Gox 债权人分发比特币的工作一周后发布的。</p><p>Mt. Gox 曾是一家位于日本的著名比特币交易所, 但在 2014 年遭到黑客攻击而崩溃。</p><p>该交易所成立于 2010 年, 在高峰期曾处理超过 70% 的比特币交易量。 Mt. Gox 损失了 85 万个比特币, 使其成为有史以来最大的一次黑客攻击。</p><p>基于交易所交易量, Mt. Gox 债权人并未进行抛售<br>尽管 Glassnode 承认其理论存在 “ 一定程度的猜测 ”, 但加密货币交易所的基础数据也表明, Mt. Gox 的债权人并未进行抛售。</p><p>值得注意的是, 衡量现货买卖交易量净差的指标累积成交量差 (CVD), 在 Mt. Gox 比特币分发后在 Kraken 上也没有出现明显上升。</p><p>报告指出 : " 我们可以看到在分发后出现了适度的卖出压力上升。 但这仍然在日常范围内。 "</p><p>这种缺乏抛售压力令人惊讶, 因为自 Mt. Gox 崩溃以来, 比特币价格已经上涨了 8,500% 以上。</p><h2>比特币投资者正在转向 " Hodling "</h2><p><br>比特币的当前分布情况表明 , 投资者已经完成了获利回吐 , 正在转向 “ Hodling ”, 这是加密货币圈的行话, 意为死命般地持有。</p><p>值得注意的是, 新投资者持有的比特币比例出现了明显下降 , 这类似于宏观市场高点附近的行为模式。</p><p>这突出了投资者行为向 Hodling 的转变, 据 Glassnode:</p><p>" 这描述了长期投资者在价格达到 7.3 万美元历史新高前为满足新需求而支出和出售币的行为。 近期这些曲线的下降速率有所放缓, 这表明投资者行为正在逐步回归以 Hodling 为主导。 "</p><p>超过 65.8% 的比特币供给已经静置超过一年, 而超过 54% 的比特币已经静置超过两年。</p>',
      url: 'https://tokeninsight.com/zh/news/over-41.5-of-mt.-gox-bitcoin-distributed-as-creditors-continue-to-hodl?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/duf87.jpeg',
      source_url:
        'https://cointelegraph.com/news/mt-gox-creditors-hold-41-percent-bitcoin-distribution',
      timestamp: 1722508318000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '交易所',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 的净流入仅为 29.9 万美元，以太坊 etf 的流出为 7700 万美元',
      content:
        '<p>根据 The Block 的报告:</p><p>美国现货比特币 ETF 录得每日净流入 299,000 美元。</p><p>与此同时, 现货以太坊 ETF 录得 7,721 万美元的净流出。</p><p>美国现货比特币交易所交易基金 (ETF) 周三仅录得 299,000 美元的每日净流入, 而现货以太坊 ETF 则录得 7,721 万美元的净流出。</p><p>仅有两只现货比特币 ETF 录得净流入 - BlackRock IBIT 的 2,099 万美元和 Grayscale 比特币迷你信托的 1,800 万美元净流入。Grayscale 比特币迷你信托仅在周三开始交易。</p><p>富达 FBTC 基金流出 3,157 万美元, 而 Ark 和 21Shares 的 ARKB 基金则录得 461 万美元的净流出。Bitwise 的 BITB 基金录得 251 万美元的净流出。其他现货比特币 ETF 没有任何流入。</p><p>现货比特币 ETF 的交易量在周三达到 13.7 亿美元, 与周二持平。</p><h2>现货以太坊 ETF 出现流出</h2><p>与此同时, 美国 9 只现货以太坊 ETF 录得 7,721 万美元的净流出。Grayscale 以太坊信托 (ETHE) 自 7 月 23 日首次亮相以来一直录得每日流出, 周三净流出 1.3333 亿美元。这是该组中唯一一只出现当日流出的现货以太坊基金。</p><p>Grayscale 以太坊迷你信托以 1,954 万美元的净流入领跑正面流动。其次是富达 FETH 的 1,880 万美元、BlackRock ETHA 的 498 万美元和 VanEck ETHV 的 481 万美元净流入。</p><p>Bitwise 的 ETHW 也录得 471 万美元的净流入, 21Shares 的 CETH 录得 328 万美元的净流入。其他两只现货以太坊 ETF 没有任何流入。</p><p>9 只现货以太坊 ETF 的总交易量在周三降至 4.725 亿美元, 低于周二的 5.6322 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-log-mere-299-000-in-net-inflows-ethereum-etfs-see-77-million-in-outflows?utm_source=public&utm_medium=api',
      image_url: '',
      source_url:
        'https://www.theblock.co/post/308651/us-spot-bitcoin-etfs-log-mere-299000-in-net-inflows-ethereum-etfs-see-77-million-in-outflows',
      timestamp: 1722507558000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '以太坊',
        },
        {
          name: 'ETF',
        },
      ],
    },
    {
      title: 'Terra 链停止运营，ASTRO 代币下跌超过 60%',
      content:
        '<p>据 《The Block》 报道, 由于遭到疑似漏洞攻击, Terra 区块链的暂时停摆导致了 ASTRO 代币价值大跌。</p><p>Terra 区块链团队宣布, 该链将在区块高度 11430400 处临时停摆, 在此期间将不再处理用户交易。根据 Terra 官方 X 平台的消息, 团队将与 Terra (Phoenix-1) 验证节点合作, 在暂停后应用紧急修补程序来"补救一个疑似遭到利用的漏洞"。</p><p>Cyvers Alerts 在 X 平台上透露, 该漏洞导致约 6000 万枚 Astroport (ASTRO) 代币、350 万美元 Circle USD、50 万枚泰达币 (USDT) 和 2.7 个比特币遭窃取。</p><h2>Astro 代币价格暴跌 60% 以上</h2><p><br>由于区块链暂停和漏洞修复的消息, Astro 代币价格崩盘, 从约 0.045 美元跌至 7 月 31 日凌晨 3 点的最低 0.01313 美元。</p><p>在消息曝光前, 这批被盗的 6000 万 Astro 代币价值约 270 万美元, 现已跌至仅 108 万美元左右, 代币价格稳定在 0.018 美元附近。</p><p>尽管这 6000 万枚代币仅相当于总发行量的 5.5% 左右, 但这一事件还是为 Astroport 去中心化交易所创下了新的历史最低价。</p><h2>Terraform Labs 被迫关停</h2><p><br>6 月 12 日, Terraform Labs 同意向美国证券交易委员会 (SEC) 支付约 44.7 亿美元的和解款。</p><p>这包括 36 亿美元的违规所得退还、4.2 亿美元的民事罚款, 以及近 4.67 亿美元的预判利息。前 CEO Do Kwon 需承担 2.04 亿美元的责任, 因 SEC 认定该公司应为 Terra 生态系统崩溃造成的 400 亿美元投资者损失负责。</p><p><br>7 月 19 日, Terraform Labs 宣布将重新开放 Shuttle 桥, 允许用户赎回在 Terra Classic 链上的封存资产。</p><p>Terra 在 X 平台上发布消息, 告知社区最近的破产法庭裁决将允许他们撤销并销毁 1.5 亿枚 LUNA 代币。Terra 还告知用户有 30 天时间通过 Shuttle 桥钱包赎回包装资产。</p><p>过 30 天后, 该桥将永久关闭, 剩余资产将被销毁。</p>',
      url: 'https://tokeninsight.com/zh/news/terra-chain-halts-operations-astro-token-falls-over-60?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/cjv79.jpeg',
      source_url:
        'https://cointelegraph.com/news/terra-blockchain-halt-astro-token-drop',
      timestamp: 1722422090000,
      tags: [
        {
          name: 'Terra',
        },
      ],
    },
    {
      title: '现货以太坊 etf 在 7 月 30 日流入 3400 万美元后转为正值',
      content:
        '<p>据 The Block 报道 : 以太坊 ETF 的每日流入量首次自推出以来转为正数, 扭转了过去四天资金外流 547 百万美元的趋势。</p><p>在美国上市的现货以太坊交易所交易基金 (ETF) 的资金流动在其推出日之后首次实现每日净流入, 这主要源于 Grayscale Ethereum Trust 的流出放缓。</p><p>根据 Farside Investors 和分散式聚合器 Tree News 的初步数据, 所有九只现货以太坊 ETF 的净流入达到 3360 万美元 (2023 年 7 月 30 日)。</p><p>尽管这个数字并不令人印象深刻, 但这是这些基金在推出日之外首次录得流入。自 7 月 24 日以来, 现货以太坊投资产品已有 547 百万美元流出。</p><p>7 月 30 日, 贝莱德的 iShares Ethereum ETF (ETHA) 录得最大流入, 达 1.179 亿美元。</p><p>富达的 Advantage Ether ETF (FETH) 流入 1640 万美元,而 Bitwise Ethereum 基金 (ETHW) 和富兰克林以太坊 ETF (EZET) 分别流入 350 万美元和 370 万美元。</p><p>与此同时, Grayscale 的 ETHE 当天的流出额仅为 1.203 亿美元, 仅为其推出日流出额的四分之一。其他基金没有录得任何流入或流出。</p><p>以太坊支持者 Anthony Sassano 评论说, 这种正向转变是 Blackrock CEO Larry Fink 送给以太坊的生日礼物。</p><p>Split Capital 的创始人兼首席投资官 Zaheer Ebtikar 表示, "这显然是资本在轮动", 因为 7 月 30 日比特币现货 ETF 出现 1830 万美元的流出。</p><p>就在一天前的 7 月 29 日, Steno Research 的高级分析师 Mads Eberhardt 表示,Grayscale ETHE 的大规模流出可能本周会有所缓解, 这似乎已经实现。</p><p>7 月 31 日在 X 平台上,ETF Store 总裁 Nate Geraci 评论说,仅在一周的交易中,Blackrock 的 iShares Ethereum ETF 就已经位列今年所有新发 ETF 流入前 15 名,也位列约 330 只新 ETF 中的前 15 名。</p><p>自 7 月 23 日推出以来,Blackrock ETHA 基金已经流入 6.18 亿美元,成为以太坊 ETF 和比特币 ETF 行业的领头羊。</p><p>7 月 29 日,Blackrock 的 ETF 和投资负责人 Samara Cohen 表示,到今年年底,以太坊 ETF 将成为大型证券公司所提供的模型投资组合的一部分。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-flip-positive-after-34m-inflow-on-july-30?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sldjh8.jpeg',
      source_url:
        'https://cointelegraph.com/news/spot-ethereum-etfs-flip-positive-after-34m-inflow-july-30',
      timestamp: 1722420670000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title:
        '在有争议的投票决定转移2400万美元的代币后，Compound 与加密鲸鱼 Humpy 达成休战',
      content:
        '<p>Compound Finance 解决了与神秘加密鲸鱼 Humpy 的治理纠纷。</p><p>这场争议始于在一次投票中通过了提案 289, 将 240 万美元从 Compound 的资金池划拨给一个收益协议。该提案受到广泛批评和操纵指责, 因为一小群人购买了大量的 COMP 代币来影响结果。</p><p>一项新提议提出了一个新的质押产品, 旨在与所有各方的利益保持一致, 特别是满足 Humpy 作为委托人和 COMP 持有者的需求。</p><p>Compound Finance 与神秘加密鲸鱼 Humpy 及其关联组织 "The Golden Boys" 达成了停战协议, 这是在激烈讨论和一些社区成员认为是治理攻击之后达成的。</p><p>这一冲突始于由 Humpy 领导的提案 289 在争议的情况下获得通过, 旨在将 Compound 价值 2400 万美元的资金池转移到由 "The Golden Boys" 领导的收益协议。</p><p>不久之后, 该提案受到广泛批评和操纵投票的指控 , 因为一小群人通过在公开市场上购买大量的 COMP 代币来影响投票结果。</p><p>根据 Compound 的 Bryan Colligan 在新的论坛帖子中写的, 提案 289 将被撤回 , 以减轻它带来的治理风险。取而代之的是一个新的质押产品, 它与所有相关方的利益保持一致, 特别是满足 Humpy 作为最近的委托人和 COMP 持有者的需求。</p><p>这个新的质押产品声称通过将每年新生成的 30% 的代币储备按比例分配给质押 COMP 的持有者, 来提高 COMP 代币的效用。</p><p>尽管需要 Compound DAO 的治理投票才能在链上部署, 但这一新建议已经得到 Humpy 和其他 Compound 委托人以及来自 OpenZeppelin 和 Gauntlet 的安全专家的支持。</p><p>OpenZeppelin 的安全解决方案架构师 Michael Lewellen 曾强烈反对提案 289 , 他表示 : "OpenZeppelin 很高兴看到一个潜在的解决方案, 以确保治理得到保护, 并服务于社区利益。自提案 289 以来, 我们一直与许多社区委托人密切合作。"</p><p>最新的进展显示, 从 Compound 资金池中自动部署 2400 万美元的计划已被取消。</p><p>当提案 289 上周末获批时, 人们对 "The Golden Boys" 对 Compound 资产的意图提出了担忧, 强调他们重复尝试将资金转移到他们自己的产品 goldCOMP 。这种怀疑被他们之前被 Compound DAO 拒绝的两个提案所助长。</p><p>另一个问题是一旦从 Compound 转移, 资金的安全性。人们担心资金转移到 "信托设置" 合约可能不安全, 因为它由 "The Golden Boys" 拥有的多重签名钱包来控制。</p><p>Humpy 此前在 Balancer 和 Sushi 等其他 DeFi 协议中也参与了类似有争议的行为。在这些情况下, Humpy 积累了大量的投票权, 以批准可能更有利于个人利益而非 DAO 更广泛目标的提案。</p>',
      url: 'https://tokeninsight.com/zh/news/compound-reaches-truce-with-crypto-whale-humpy-after-controversial-vote-to-move-24-million-in-tokens?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/fd86fs.jpeg',
      source_url:
        'https://www.theblock.co/post/308215/compound-reaches-truce-with-crypto-whale-humpy-after-controversial-vote-to-move-24-million-in-tokens',
      timestamp: 1722331974000,
      tags: [
        {
          name: 'Compound',
        },
        {
          name: 'DAO',
        },
      ],
    },
    {
      title: '美国现货以太坊 etf 净流出 9830 万美元，延续了负流动趋势',
      content:
        '<p>据 The Block 报道: 周一, 现货以太币 ETF 经历了 9829 万美元的净流出。其中,Grayscale 的 ETHE 基金录得 2.1 亿美元的净流出。</p><p>在 9 只美国现货以太币 ETF 中, 周一共有 9829 万美元流出这些产品, 这是其连续第四天出现负流。</p><p>其中, Grayscale Ethereum Trust (ETHE) 是唯一一只录得流出的以太币基金, 净流出 2.1004 亿美元。该 ETF 自上周二发行以来, 每天都出现数亿美元的流出。</p><p>在净流入方面, BlackRock 的 ETHA 录得 5817 万美元, 富达的 FETH 录得 2482 万美元, VanEck 的 ETHV 录得 1091 万美元, Bitwise 的 ETHW 录得 1045 万美元。</p><p>Grayscale Ethereum Mini Trust 也录得 490 万美元的净流入, Franklin 的 EZET 录得 252 万美元。而由 Invesco 和 21Shares 管理的另外两只现货以太币 ETF 周一无任何流动。</p><p>周一, 现货以太币 ETF 的总交易量为 7.7301 亿美元, 而上周五为 9.3386 亿美元, 上周四为 9.5585 亿美元。</p><p>与此同时, 11 只美国现货比特币 ETF 周一录得 1.2413 亿美元的净流入。其中, BlackRock 的 IBIT 录得 2.0562 亿美元的净流入, 是当日唯一一只录得净流入的基金。</p><p>而 Grayscale 的 GBTC 录得 5429 万美元的净流出, Bitwise 的 BITB 录得 2130 万美元的流出, 富达的 FBTC 录得 589 万美元的净流出。</p><p>周一, 现货比特币 ETF 的总交易量升至 26.8 亿美元, 高于上周五的 20.4 亿美元和上周四的 15.1 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-ethereum-etfs-saw-98.3-million-in-net-outflows-extending-negative-flow-streak?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sda75.jpeg',
      source_url:
        'https://www.theblock.co/post/308210/us-spot-ethereum-etfs-saw-98-3-million-in-net-outflows-extending-negative-flow-streak',
      timestamp: 1722330961000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '灰度基金',
        },
      ],
    },
    {
      title: '2400 万美元的 Compound Finance 提案不顾 DAO 的反对被 whale 通过',
      content:
        '<p>据 The Block 报道: Compound Finance 的 DAO 近期通过的一项提案引发了治理攻击的争议, 一个由"Humpy"这头鲸鱼领导的小群体在公开市场上积累足够的代币, 帮助勉强通过了他们的提案, 这与许多社区成员的反对意见相悖。</p><p>该提案将 499,000 个 COMP 代币 (当前价值约 2400 万美元) 分配给由"Golden Boys"集团控制的收益协议。这个集团由 Humpy 推动该提案, 并据称曾在过去采取类似的 DAO 劫持行为。</p><p>Compound 金融的一项最近提案的通过引发了社区成员对治理攻击的指控。他们指称, 一个小群体通过在公开市场上大量购买代币, 得以强行推动该提案通过批准流程。</p><p>289 号提案将 Compound 金库 5% 的 499,000 个 COMP 代币 (价值约 2400 万美元) 分配给"Golden Boys"设计的一种收益协议, 在周日以 682,191 比 633,636 的微弱优势获得通过。投票始于周四晚上 11:40, 持续到周末。</p><p>但是, 投票结果背后还有更多内幕, 社区成员们声称。担任 Compound Finance 安全顾问的 OpenZeppelin 安全解决方案架构师 Michael Lewellen 指出, 几个账户大量在公开市场购买 COMP 代币与几项旨在将 COMP 持有量转移到"Golden Boys"创造的 goldCOMP 产品的提案之间存在联系。</p><p>对于 Lewellen 的安全警报, 包括 Wintermute Governance、Columbia Blockchain、Penn Blockchain 和 StableLab 在内的几位社区成员都表达了类似的担忧, 尤其是当该集团又提出两次未能通过的最初提案时。</p><p>"根据我的个人观点,如果 @Humpy 和 Golden Boys 继续试图从协议中获取资金, 这可以被视为治理攻击, 因为这明显违背了所有其他 Compound DAO 代表的意愿, "Lewellen 在创建 289 号提案后发帖表示。Lewellen 暂时无法就此立即发表评论。</p><p>但是, 在 289 号提案获得通过后, 名为 Humpy 的"Golden Boys"的apparent 领导人为该提案进行了辩护, 反驳了 Lewellen 的帖子。"\'盗取资金\'这个词是错误和具有误导性的, 特别是来自 Compound 的风险专家。所要求的投资通过了一个有限行动条件集的信托设置, 不允许偷窃/转移资金, "Humpy 声称。</p><p>Wintermute 的治理账户在早期帖子中质疑了"信托设置"确实能防止资金转移的说法, 写道:"任何形式的提款行为(分红)都完全由 GoldenBoyzMultisig 控制, 这意味着 DAO 实际上不能随时自行召回资金。DAO 首先要投票启动一个 PHASE 更新, 然后信任 GoldenBoyzMultisig 调用相关的提款功能。"</p><p>Compound 官方增长团队的创始人兼 CEO Bryan Colligan 指出, 即使不考虑风险, 这个机会对 Compound Finance 也不太有利可图。"除了安全问题, 从我们的初步分析来看, 有许多更好的收益挖掘(POL)机会可以利用新兴链和分散交易所的合作关系。我们正在评估的大部分机会起始收益率为 15-20%, 有些甚至高达 40%, "Colligan 在 X 上写道。</p><p>虽然 Humpy 并非独自行事, 但 Golden Boys 多签账户的其中一名成员声称, 他完全不知道这个提案正在进行投票。"从之前的多签账户来看, 我不知道这次投票正在进行, 我也没有参与投票, "X 用户 Ogle 写道, 他被 Humpy 列为多签治理员之一。</p><p>不过, Ogle 对治理攻击的指控作出了更加平和的回应。"根据我去年的互动, 他们是自私的但是好演员, 意思是我会很惊讶如果这是有意伤害任何人的。我猜这是一种让所有人(包括该集团)都能赚钱的方式, 但我真的只是刚刚听说这件事...所以我不比你知道更多, "Ogle 对该提案作出回应。</p><p>在该提案获得通过后, Compound 代币价格在过去 24 小时内下跌近 7%。</p>',
      url: 'https://tokeninsight.com/zh/news/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dk878.jpeg',
      source_url:
        'https://www.theblock.co/post/307943/24-million-compound-finance-proposal-passed-by-whale-over-dao-objections',
      timestamp: 1722248812000,
      tags: [
        {
          name: 'DAO',
        },
        {
          name: 'Compound',
        },
      ],
    },
    {
      title: '在特朗普加强对加密货币的支持后，比特币逼近 7 万美元',
      content:
        '<p>据 The Block 报道：在撰写本文时, 比特币跳涨 3.3%, 交易价格约为 69,800 美元。前美国总统唐纳德·特朗普 (Donald Trump) 在周六于纳什维尔举行的比特币 2024 大会上进一步表示支持加密货币。</p><p>周一, 比特币交易接近7万美元大关, 创6周新高, 此前特朗普在周末重申了他对加密货币的支持。</p><p>根据 The Block 的价格页面, 世界最大的加密货币目前交易价格约为 69,800 美元, 较前24小时上涨 3.32%。以太坊涨幅为 4.28%, 至 3,350 美元, 而 SOLANA 则上涨 5.9%, 至约193美元。</p><p>加密市场制造商 Keyrock 亚太业务发展主管贾斯汀·德安特汉 (Justin d\'Anethan) 告诉The Block:"来自众多政治人物和经济利益相关方的积极言论正在增强投资者情绪。在纳什维尔, 比特币大会上一直有备受尊重的演讲者谈论加密货币的重要性, 以及进一步投资比特币的潜力 - 这当然是许多交易者想相信并提前布局的。"</p><p>在周六于纳什维尔举行的比特币 2024 大会上, 共和党总统候选人特朗普承诺, 如果 11 月当选, 他将创建一个"战略比特币储备", 并阻止美国出售其现有的比特币持有量。特朗普还声称, 他将解雇现任证券交易委员会主席加里·甘斯勒 (Gary Gensler)。</p><p>与此同时, 在一个周末发表的采访中, 参议员辛西娅·拉米斯(Cynthia Lummis)表示, 她打算在下周提出一项法案, 要求美国财政部在5年内购买 100 万枚比特币,约合 680 亿美元。</p><p>拉米斯表示, 这样的立法将要求美国财政部在"多个地理位置"自行保管这些比特币, 并补充说, 除非用于"减轻债务", 否则政府将至少持有这些币20年。</p><p>德安特汉表示:"人们普遍相信, 共和党在今年的选举中获胜的可能性比民主党更大, 这导致人们相信会出现更加宽松的货币环境和以企业为中心的政府。较低的税率和潜在的降息支持所有风险资产。"</p><p>普雷斯托(Presto)研究部门负责人 Peter Chung 表示, 跟踪美国选举在 11 月份的进展已变得 "比以往任何时候都更加重要"。</p><p>Chung 说:"在特朗普演讲之前, 短线投机者的头寸被清算, 因为市场在演讲期间出现\'抛售新闻\'的短暂下挫, 这在期货市场的大量清算中有所体现。结果, 短线投机头寸现已被转移到理解美国政治正在发生的变化对比特币意味着什么的长期投资者手中。"</p><p>Chung补充说: "随着这一隐忧的消除, 市场现在不受任何限制, 可以反映不仅特朗普演讲, 而且拉米斯\'比特币战略储备\'法案的影响。"</p><p>BitU Protocol 增长负责人 Nick Ruck 表示, 交易者正在等待看看利率可能发生的变化, 以及特朗普如果当选将任命谁担任关键职位, 特别是联储和证交会。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-inches-toward-70-000-following-trump-s-heightened-crypto-endorsement?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/lsahd6.jpeg',
      source_url:
        'https://www.theblock.co/post/307952/bitcoin-inches-toward-70000-following-trumps-heightened-crypto-endorsement',
      timestamp: 1722248323000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Aave 提案考虑激活收费开关并从公开市场回购代币',
      content:
        '<p>据 The Block 报道：一项新的 Aave 提案考虑增加一个费用开关, 以将平台净剩余收益的一部分返还给其关键用户。</p><p>这一举措还可能导致 Aave 协议重新质押, 为 Aave 及其用户提供新的收入来源。</p><p>去中心化借贷平台 Aave 可能会采用一个费用开关, 将部分平台净剩余收益返还给其关键用户。</p><p>Aave Chan Initiative (ACI) 的创始人 Marc Zeller 在周四发布了一份"温度检查"("temp check")。ACI 是为 Aave DAO 提供服务的顶级独立组织之一。下一步是让 Aave 社区就此发表意见, 并可能进行快照投票。</p><p>"在 ACI 的帮助下, 我们认为 DAO 现在已准备好探索协议成熟的另一个步骤, 我们希望提交给治理考虑一个明确的途径, 将协议净剩余收益重新分配给 Aave 生态系统的关键参与者, 从而创造新的积极动力和新的协同效应, "泽勒在温度检查中写道。</p><p>泽勒在社交媒体平台 X 上还表示, 这一提案可能会导致 Aave 协议重新质押, 为 Aave 及其用户提供新的收入来源。</p><p>Aave 是一个去中心化的借贷协议, 总价值锁定超过 125 亿美元。今年 5 月, 该协议推出了其 V4 路线图, 其中包括加强对 Aave 的 GHO 稳定币的支持以及对平台的其他改进, 《The Block》之前有报道。</p><p>根据 The Block Prices 的数据, Aave 的原生代币 AAVE 在过去 24 小时内下跌了 3.13%, 现报 91.27 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/aave-proposal-considers-activating-fee-switch-and-buying-back-tokens-from-open-market?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/ks87gf.jpeg',
      source_url:
        'https://www.theblock.co/post/307498/aave-proposal-considers-activating-fee-switch-and-buying-back-tokens-from-open-market',
      timestamp: 1721986529000,
      tags: [
        {
          name: 'Aave',
        },
        {
          name: 'DAO',
        },
        {
          name: '借贷',
        },
      ],
    },
    {
      title: '美国现货以太坊 etf 在第三天净流出 1.52 亿美元',
      content:
        '<p>据 The Block 报道, 周四,9 只美国以太坊现货 ETF 录得 1.523 亿美元的净流出, 而周三的净流出为 1.33 亿美元。</p><p>另一方面,比特币现货 ETF 当日录得 3,116 万美元的净流入。</p><p>这 9 只美国以太坊现货 ETF 在周四交易的第三天录得 1.523 亿美元的净流出, 延续了前一天的流出。</p><p>根据 SosoValue 的数据, Grayscale 以太坊信托基金 (ETHE) 是唯一一只记录流出的以太坊基金, 净流出 3.4622 亿美元。</p><p>显著的流出被其他基金的流入所抵消。在流入中, 贝莱德的 ETHA 领跑, 净流入 7,093 万美元,其次是 Grayscale 以太坊迷你信托的 5,809 万美元、富达 FETH 的 3,432 万美元和 Bitwise ETHW 的 1,634 万美元净流入。</p><p>VanEck ETHV 也录得 800 万美元的净流入, 而 Invesco 的 QETH 录得 624 万美元的净流入。由富兰克林和 21Shares 管理的另外两只以太坊现货 ETF 周四的流量为零。</p><p>这 9 只以太坊基金的 1.523 亿美元流出跟上周三的 1.33 亿美元流出相呼应。</p><p>根据 The Block Pro Research 编辑的雅虎财经数据, 周四这些以太坊现货基金的总日交易量约为 8.608 亿美元。这些基金在周二和周三的交易量分别为 10.5 亿美元和 9.446 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-ethereum-etfs-see-152-million-in-net-outflows-on-third-day?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/khgd86.jpeg',
      source_url:
        'https://www.theblock.co/post/307656/us-spot-ethereum-etfs-see-152-million-net-outflows-third-day',
      timestamp: 1721985449000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '比特币主网首次获得 ZK-proof 验证',
      content:
        '<p>据 Cointelegraph 报道,BitcoinOS 成功在 BTC 主网上验证了第一个 ZK 证明, 标志着比特币作为去中心化应用平台的新时代到来。</p><p>比特币 rollups 协议 BitcoinOS (BOS)于 2024 年 7 月 24 日 UTC 11:22 在区块链主网上成功验证了第一个零知识(ZK)证明。</p><p>这一成就使得在不需要对区块链基础层进行进一步改动的情况下, 在比特币主网上解锁新的功能和可扩展性成为可能。</p><p>在与 Cointelegraph 的书面问答中,BOS 联合创始人 Edan Yago 表示, 这一发展"代表了比特币不再仅仅是数字黄金"的时代。</p><p>"它也是一个操作系统和平台, 可以建立整个去中心化应用的世界。[...] 这标志着以太坊、索拉纳和所有其他第一层项目不再安全,因为它们面临来自比特币的竞争。"</p><h2>主网 ZK 证明验证的含义</h2><p><br>支持这一主网验证的技术是 BOS 的 ZK Succinct Non-Interactive Argument of Knowledge (zk-SNARK) 验证软件库 BitSNARK。</p><p>根据 Cointelegraph 获得的新闻稿,BitSNARK 使开发者能够创建"近乎无需信任的桥梁"来转移比特币。Yago 解释了在主网建立 ZK 证明的含义,称一笔交易现在可以代表"数百甚至数千笔交易"。</p><p>"单笔比特币交易现在可用于私密交易和智能合约等用途。"</p><h2>比特币区块链转变为操作系统</h2><p><br>Yago 解释说,ZK 在比特币主网上的验证突破与该公司的目标密切相关, 允许它实质上被转变为"操作系统"。</p><p>Yago 解释说, 通过将比特币主网转变为"不仅仅是支付交易系统", 它可以用于去中心化服务和活动, 如 DAO、DeFi 等。</p><p>对于可升级性, Yago 表示, "升级比特币的唯一方式是通过软分叉和共识层的变化", 但这种情况不再适用。</p><p>"现在可以以无需许可的方式引入任何你想要的功能到比特币, [...] 将很多人认为是缺点的事情, 即它在僵化和很难改变, 转变为它的主要优势。"</p><h2>StarkWare 在测试网上验证首个 ZK 证明</h2><p><br>7月17日,StarkWare 宣布在比特币测试网 Signet 上成功验证了自己的 ZK 证明, 这是一个历史性的里程碑。</p><p>这一发展是继该公司进行 3 个月的"OP_CAT"探索后实现的,这使它能够在网络上建立新的 STARK 验证器。</p><p>该验证器为基于 ZK 的 layer-2 解决方案的开发奠定了基础, 有助于提高比特币的可扩展性, 并推动在区块链上进行全球支付的机会。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-mainnet-receives-first-ever-verified-zk-proof?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kdfhg87\'.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-mainnet-first-verified-zk-proof',
      timestamp: 1721902879000,
      tags: [
        {
          name: '零知识证明',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '现货以太坊 etf 在发行的第二天就流出了 1.13 亿美元',
      content:
        '<p>据 Cointelegraph 报道, 这八只新上市的以太坊 ETF 无法超越格雷斯凯尔最近转换为以太坊信托基金的 3.27 亿美元流出。</p><p>总部位于美国的现货以太坊交易所交易基金 (ETF) 在第二个交易日出现净流出 1.133 亿美元, 主要是由于格雷斯凯尔以太坊信托基金的大量流出。</p><p>在这八只"新生"现货以太坊 ETF 中, 有七只在第二个交易日录得净流入。Fidelity Ethereum Fund (FETH) 和 Bitwise Ethereum ETF (BITW) 吸引了最大的净流入, 分别为 7,450 万美元和 2,960 万美元。</p><p>而贝莱德旗下的 iShares Ethereum Trust (ETHA), 在7月23日录得该组合中最强劲的流入, 但在7月24日只吸引了 1,740 万美元的投资。</p><p>新 ETF 的表现受到格雷斯凯尔以太坊信托基金(ETHE)大量抛售的拖累。ETHE 在转型为现货以太坊基金后, 在7月22日至24日的两个交易日内流出了3.269亿美元。</p><p>格雷斯凯尔于 2017 年推出 ETHE, 让机构投资者可以购买以太坊。但 ETHE 有6个月的锁定期。在7月22日转型为现货以太坊基金后, 投资者现在可以更轻松地出售他们的以太坊。</p><p>在转型后的两个交易日内, ETHE 已经流出了 8.11 亿美元, 意味着现有的 ETHE 投资者已经抛售了基金持有量的9%以上。</p><p>最近以太坊 ETF 的表现并非空前绝后。</p><p>比特币现货 ETF 在最初的 10 个交易日中, 有6个交易日录得净流出, 很多人将其归咎于格雷斯凯尔比特币信托基金的流出。</p><p>在撰稿时,以太坊的价格为 3,172 美元, 在过去24小时内下跌超过6.8%, 在过去一周下跌7.4%, 据 TradingView 数据。</p><p>以太坊价格的下跌来自于股票市场的更广泛的抛售, 标普500指数7月24日收盘下跌2.3%。</p><p>值得注意的是, 相比比特币下跌 2.6%, 以太坊的跌幅更大。这与凯科分析师 Will Cai 的预测一致, 即在 ETF 发行后, 以太坊价格可能会对流入产生极大的"敏感性"。</p><p>格雷斯凯尔的 ETHE 在转型为现货以太坊 ETF 的首个交易日就流出 4.844 亿美元。但其他八只产品的强劲流入推动了整体净流入达 1.066 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-post-113m-of-outflows-on-second-day-of-launch?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/qlj37gy.jpeg',
      source_url:
        'https://cointelegraph.com/news/ethereum-etfs-post-113-million-outflows-day-two-trading',
      timestamp: 1721902333000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '随着 Meta 发布 Llama 3.1，马克·扎克伯格呼吁开源人工智能',
      content:
        '<p>据 Cointelegraph 报道, Meta 首席执行官马克·扎克伯格表示, 该公司正在"迈向开源 AI 成为行业标准的下一步"。</p><p>扎克伯格将开源软件 Linux 从最初的封闭源 Unix 的演化与 AI 的未来潜力进行了对比, 并暗示开源 AI 将成为行业标准。</p><p>"我相信 AI 的发展也将类似如此。如今, 几家科技公司正在开发领先的封闭模型。但开源正在迅速缩小差距。"</p><p>在吹捧公司最新的 AI 时, 这位科技亿万富翁补充说, &nbsp;Llama 3 在与最先进模型相媲美的同时, 在某些领域还处于领先地位。</p><p>这个新模型可以进行多语言对话, 编写更高质量的计算机代码, 并解决更复杂的数学问题。它也拥有 4050 亿个参数, 这大大超过了之前的版本, 但仍然落后于如 OpenAI 的 GPT-4, 后者拥有 1 万亿个参数。</p><p>他表示, 从明年开始, Meta 预计未来的 Llama 模型将成为"行业最先进的", 但在此之前, 它已经在开放性、可修改性和成本效率方面处于领先地位。</p><p>"Meta 致力于开源 AI, "他在列举几项优势(包括定制、摆脱封闭供应商的依赖、数据保护以及为开发者带来的成本效益)之前说道。</p><p>他还表示, 开源 AI 可能比封闭的替代品更安全, 因为它具有透明度和更广泛的审查, 并表示这对美国及其盟友在应对"像中国这样拥有大量资源的国家的威胁"的能力很有战略优势。</p><p>扎克伯格认为, 开源 AI 对于实现 AI 的积极未来至关重要, 总结道:"开源将确保更多人能够获得 AI 的利益和机会, 权力不会集中在少数公司手中, 技术可以更均匀和安全地部署到整个社会。"</p><p>Llama 3.1 的发布将成为行业的"拐点", 届时大多数开发者将开始主要使用开源 AI, 他总结道。</p>',
      url: 'https://tokeninsight.com/zh/news/mark-zuckerberg-calls-for-open-source-ai-as-meta-releases-llama-3.1?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/jdjduy66767.jpeg',
      source_url:
        'https://cointelegraph.com/news/mark-zuckerberg-calls-open-source-meta-releases-llama-3-1',
      timestamp: 1721806645000,
      tags: [
        {
          name: 'AI',
        },
      ],
    },
    {
      title: '花旗将 Coinbase 股票评级上调至“买入”，理由是美国政治的“变化”',
      content:
        '<p>据 Cointelegraph 报道：花旗集团的分析师表示, 潜在的"加密友好"政府和不断增长的收入是推动 &nbsp;Coinbase 股票上涨的看涨因素。</p><p>投资银行花旗银行已经提高了对加密货币交易所 Coinbase 的股价目标, 原因是美国的政治局势 "转变" 以及最高法院最近的一项裁决是看涨该股票的催化剂。</p><p>在 2023 年 7 月 23 日的一份投资者报告中, 花旗分析师 Peter Christiansen、David Wieloszynski 和 Nicolette Radomski 将他们对 Coinbase(COIN) 的评级从 "中性" 的 260 美元, 上调至"买入"的 345 美元目标价。</p><p>投资银行援引最近在美国选举领域出现的一系列进展, 指这带来了加密资产"监管环境改善"的原因。</p><p>前总统和共和党提名人唐纳德·特朗普已将比特币和加密货币作为其竞选活动的关键元素, 誓言要结束拜登政府对加密货币的"战争", 禁止央行数字货币, 并扩大对美国比特币矿工的保护。</p><p>尽管美国证券交易委员会对包括 Coinbase 在内的加密公司采取了越来越多的执法行动, 但花旗分析师表示, 当前"力量均势"已转向有利于 Coinbase 和数字资产公司。</p><p>除了美国可能出现加密货币友好型政府之外, 花旗分析师还指出, 推翻 "chevron 防御原则"也增加了拥有 Coinbase 股票的"风险/回报格局"。</p><p>6 月 28 日, 最高法院投票推翻了持续 40 年的 "chevron防御原则", Wiley Rein 的合伙人 Joshua Simmons 告诉 Cointelegraph, 这对美国的加密监管来说是一个"游戏规则改变者"。</p><p>在"chevron原则"被推翻后, 法院必须使用自己的判断来解释法规, 不再因为法律模糊而被迫接受监管机构的解释。花旗分析师认为, 这可能有利于 Coinbase 在其与监管机构的持续诉讼中。</p><p>"我们不是法律专家, 但这一决定确实让人质疑 SEC 关于\'howey 测试\'的解释, 这是他们在起诉中使用的一个关键依据, 是否仍然是不可推翻的框架, "分析师们写道。</p><p>此外, 投资银行还注意到 Coinbase 的二层网络 Base 的用户数量增加, 并将发行场外以太币ETF视为该加密交易所未来的一个额外收入来源。</p><p>"除了行业/加密市场的敞口, 我们认为 COIN 还可能从潜在的美国加密赶超相对较高的线上活动/流动性中获益, 这是在国外发展起来的, "分析师说。</p>',
      url: 'https://tokeninsight.com/zh/news/citi-upgrades-coinbase-shares-to-buy-citing-shifting-us-politics?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/aksding.jpeg',
      source_url:
        'https://cointelegraph.com/news/citi-upgrades-coinbase-shares-to-buy-citing-shifting-us-politics',
      timestamp: 1721805662000,
      tags: [
        {
          name: '美国证监会',
        },
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: '现货以太坊 etf 将于周二开始交易',
      content:
        '<p>据 The Block 报道, 争夺以太坊交易所交易基金(ETF)份额的公司的注册文件已于周一生效, 这标志着这些产品开始交易的最终批准。</p><p>比特币现货 ETF 已经于今年早些时候获得批准, 并自此吸引了数十亿美元的资金, 尽管有人预计以太坊现货 ETF 可能面临较低的需求。</p><p>一些以太坊现货交易所交易基金已经获得批准, 并可以从周二开始交易, 此前经过了数周的注册文件修改。</p><p>美国证券交易委员会(SEC)批准了 21Shares、Bitwise、贝莱德、富达、富兰克林邓普顿、VanEck 和 Invesco Galaxy 的注册表于周一下午生效。Grayscale Ethereum Trust 和 Grayscale Ethereum Mini Trust 的注册表单也于周一生效。</p><p>"21Shares Core Ethereum ETF (CETH) 的推出标志着 21Shares 和美国投资者的一个重要里程碑。今天的批准代表加密货币作为一个资产类别已经稳定下来," 21Shares 联合创始人兼总裁 Ophelia Snyder 在一份电子邮件声明中说。</p><p>寻求推出其以太坊现货 ETF 的公司在 5 月获得了美国证券交易委员会对 19b-4 表格的批准。但是, 他们在推出之前仍需要注册表单生效。这些批准是意外的, 因为SEC 与发行人之间缺乏互动。然而, 就在最后期限的前一周, 该机构似乎改变了心意, 开始告知交易所将批准该周的以太坊 ETF。</p><p>富达数字资产管理部门主管 Cynthia Lo Bessette 表示, 该公司的以太坊现货 ETF 将让投资者通过"周到的指数和产品设计, 在由专门的运营和交易团队以及业内领先的安全性支持下, 获得对以太币的投资机会"。</p><p>"这体现了富达丰富的历史和致力于满足客户不断变化需求的承诺, "Lo Bessette 补充说。</p><p>比特币现货 ETF 已于今年早些时候获得批准, 并自此吸引了数十亿美元。彭博 ETF 分析师 Eric Balchunas 在 5 月接受 The Block 采访时表示, 以太坊 ETF 可能吸引较低的需求, 可能只获得比特币产品所获资产的 10%到 15%。</p><p>"这将把它们定在大约 50 亿到 80 亿美元, 对于任何正常的首次推出来说, 这已经是非常不错的表现了," 他说。</p><p>The ETF Store 总裁 Nate Geraci 在周一 The Block 举办的 X 活动上表示, 目前的以太币现货市场规模不到比特币市场的三分之一。</p><p>"在我看来, 这是对我们可以从以太币现货 ETF 中预期的需求的一个合理的代理, "Geraci 补充说。"我认为, 我们将看到大约三分之一的比特币现货 ETF 所看到的需求。"</p><p>在批准比特币现货 ETF 之后,交易所开始考虑在这些产品上进行交易选择, 但尚未获得监管批准。期权是指投资者有权在特定日期和时间以商定的价格买卖的合约。</p><p>接下来, 公司可能决定在其以太坊现货 ETF 产品中包括质押。获批的以太坊 ETF 最初确实包括了质押组件, 但后来被移除。SEC 过去曾对质押服务存在问题。</p><p>如果公司想在其以太坊现货 ETF 中包括质押或期权, 他们必须获得 SEC 的批准, 彭博 ETF 分析师 James Seyffart 在周一的 X 活动上表示。</p><p>"这不是\'是否\', 而是\'何时\', "Seyffart 说。"只是需要解决\'何时\'的问题。"</p><p>Variant 首席法律官 Jake Chervinsky 在 7 月 17 日的一篇 X 文章中表示, 以太坊现货 ETF 中包括质押的可能性是 "何时", 而不是"是否"。</p><p>"没有什么好的理由让 SEC 阻止 ETH ETF 参与质押, "Chervinsky 在 X 上说。质押的 ETH 不是一种证券, 投资者可以完全了解并自行决定是否承担质押产品的风险。这需要一些时间, 但这是\'何时\'而不是\'是否\', 在我看来。"</p>',
      url: 'https://tokeninsight.com/zh/news/spot-ethereum-etfs-get-final-sign-off-to-begin-trading-tuesday?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/saljf9y7.jpeg',
      source_url:
        'https://www.theblock.co/post/306699/spot-ethereum-etfs-get-final-sign-off-to-begin-trading-tuesday',
      timestamp: 1721723386000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '美国证监会',
        },
      ],
    },
    {
      title: 'Gate 将停止对日本客户的服务',
      content:
        '<p>据 Cointelegraph 报道, 该加密货币交易所将其终止服务的原因归咎于监管压力和来自当地金融监管机构的 "合规要求"。</p><p>加密货币交易所 Gate.io 开始终止其对日本客户的服务, 原因是来自日本金融监管机构的"合规要求"。</p><p>Gate.io 在 7 月 22 日的一份公告中宣布, 将终止所有日本客户的服务, 并表示将协助受影响的客户迁移他们的资产。</p><p>自 7 月 22 日起, 总部设在开曼群岛的该交易所将暂停为所有位于日本的客户开设新账户。</p><p>该交易所表示, 它正在关闭业务, 原因是"来自金融服务 Agency 等机构的合规要求", 并表示将尽快提供有关关闭的更多详情。</p><p>根据通知, Gate.io 将推出一项计划, 以遵守日本的法律法规, 并通过将客户迁移到符合日本规定的交易所来提供支持。</p><p>它还表示, 将从其网站上删除任何日语信息, 但会提供账户迁移的更新信息。</p><p>服务终止计划和交易迁移的时间安排将根据日本金融监管机构金融服务 Agency 的合规要求执行。</p><p>但是, 该交易所没有提供一个具体的关闭日期。</p><p>日本被广泛视为一个国际加密货币中心, 尽管该国对加密资产有非常严格的规定, 但它是最早合法化加密货币交易的国家之一。</p><p>日本的《支付服务法》(PSA) 管理着加密资产, 要求交易所向金融服务 Agency 注册, 并且必须遵守反洗钱 (AML) 法规, 进行客户身份核查。</p><p>Gate.io 目前拥有 3,557 个交易对, 全球 24 小时交易量为 195 亿美元 (根据 CoinGecko 的数据)。</p><p>Cointelegraph 联系了 Gate.io 寻求更多细节, 但尚未收到任何回复。</p><p>尽管面临监管障碍, 但一些日本公司仍在大举投资比特币。</p><p>7 月 22 日, 日本投资和咨询公司 Metaplanet 宣布, 它购买了额外的 20.4 个比特币, 价值约 120 万美元, 以完成 6 月份公布的购买计划。</p>',
      url: 'https://tokeninsight.com/zh/news/gate.io-to-wind-down-services-for-customers-in-japan?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kdhnf86.jpeg',
      source_url:
        'https://cointelegraph.com/news/gate-io-wind-down-services-japan',
      timestamp: 1721722194000,
      tags: [
        {
          name: '交易所',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        '区块链安全公司 Veridise 发现，ZK 审计发现关键问题的可能性是前者的两倍',
      content:
        '<p>据 The Block 报道: Veridise 报告称, ZK 项目的安全审计是其他审计类型的两倍,更有可能发现关键性问题。</p><p>该公司的 ZK 审计中有 55% 发现了关键性问题, 而其他 DeFi 审计中只有 27.5% 发现了关键性问题。</p><p>区块链安全公司 Veridise 报告称, 对零知识项目的审计更有可能发现关键性问题,比其他审计类型高出两倍。</p><p>Veridise 分析了其最近 100 次审计中的 1,605 个漏洞发现, 平均每次审计发现约 16 个问题, ZK 审计的平均值略高,为 18 个发现的问题。</p><p>但是, 当关注关键性漏洞时, Veridise 发现 55% (20 次审计中的 11 次) 的 ZK 审计包含关键性问题, 而其他审计 (包括智能合约、钱包集成、区块链实现和中继器) 中只有 27.5% (80 次审计中的 22 次) 包含关键性问题。</p><p>ZK 协议因其在区块链交易中增强隐私性和可扩展性的潜力而在加密货币领域越来越受欢迎。 它们使一方能够向另一方证明某个声明是真实的, 而无需透露除该声明有效性之外的任何信息。</p><p>然而, Veridise 表示 ZK 安全性"更具挑战性", 审计发现更多关键性漏洞是由于复杂的加密构造以及 ZK 协议的创新性质, 这通常会推动现有加密技术的边界。</p><p>Veridise 的 CEO 兼联合创始人 Jon Stephens 告诉 The Block, "开发 ZK 电路需要精确地推理见证发生器中操作的语义。 如果这些语义没有正确地编码为约束条件, 就会出现错误。 电路中确实会有更多错误, 因为这与典型的编程范式有很大不同。"</p><p>总体而言, Veridise 审计发现的最常见漏洞是逻辑错误 (385)、可维护性 (355) 和数据验证 (304), 占所有发现问题的 65%。这三类问题也在 360 个 ZK 审计专项发现的漏洞中占主导地位。</p><p>虽然可维护性问题不是严格的安全漏洞, 包括例如糟糕的编码实践, 但它们有时"一步之遥"就会变成关键 bug。</p><p>在发现的 223 个严重 (关键或高级别) 问题类型中, 逻辑错误 (91) 和数据验证 (35) 问题占主导地位, 其次是"未经约束的电路" (19)、拒绝服务 (16) 和访问控制 (13) 漏洞等。这五种类型占所有审计中高严重性问题的 78%, 共发现 174 个漏洞。</p><p>在 ZK 审计专项发现的漏洞中, 虽然严重问题占大多数漏洞类型的 10% 到 30%, 但"未经约束的电路"有 90% 的可能性包含关键或高级别的问题。</p><p>Veridise 解释说,"未经约束的电路"是零知识相关审计中的典型问题, 即算术电路的约束条件没有充分强制执行所有必要条件, 以检查某些计算是否正确执行。 这种情况在传统智能合约中是不会发生的。</p><p>这意味着恶意方可以制造一个证明, 欺骗验证器接受一个虚假的声明为真, 严重损害了协议的完整性。</p><p>在 Veridise 的审计中, 零知识技术经常应用于关键基础设施协议, 如 L2 ZK-rollups、ZK-VMs 和 circom 库 - 其中 Veridise 之前发现了一个"百万美元"的 ZK bug。 这些协议的安全性非常重要, 因为它影响所有建在它们之上的去中心化应用程序。</p><p>此外, 逻辑错误是由于代码逻辑流程中的错误而无法执行预期功能, 一个典型的例子是智能合约错误地允许用户提取超过其余额的资金。而数据验证问题则涉及未能正确验证数据的正确性、完整性和真实性。</p><p>拒绝服务问题涉及旨在破坏协议正常运行的攻击, 例如智能合约可能被错误地设计成允许攻击者消耗所有可用的 gas。</p><p>最后, 访问控制问题涉及用户能够访问受限区域或功能。</p><p>Veridise 声称, 自 2018 年以来, 有超过 100 亿美元从各种区块链和 DeFi 平台被黑客攻击。 更好地了解这些漏洞类型,有助于引导 Web3 项目关注最严重的漏洞, 并主动防范它们。</p>',
      url: 'https://tokeninsight.com/zh/news/blockchain-security-firm-veridise-finds-zk-audits-are-twice-as-likely-to-uncover-critical-issues?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/mf8g7.jpeg',
      source_url:
        'https://www.theblock.co/post/306331/blockchain-security-veridise-zk-audits-critical-issues',
      timestamp: 1721643556000,
      tags: [
        {
          name: '零知识证明',
        },
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '特朗普的共和党全国代表大会演讲给了科技爱好者对未来的希望',
      content:
        '<p>据 Cointelegraph 报道, 硅谷居民正纷纷支持特朗普,特朗普在共和党全国代表大会上的讲话阐述了这些原因。</p><p>前总统唐纳德·特朗普在共和党全国代表大会 (RNC) 上的讲话中, 微妙地暗示他可能愿意拥抱科技行业。这只是在他 90 分钟演讲中的短短几句话。如果你眨眼的话, 就会错过它。但这些话很重要。"美国," 特朗普说, "正处于新黄金时代的边缘, 但我们将有勇气掌握它。"</p><p>"e/acc" 社区的人, 这是一个由马克·安德森和加里·坦支持的科技主导运动, 也注意到了这一点。该运动的创始人之一, 一个名为 "@BasedBeffJezos" 的匿名社交媒体用户分享了特朗普讲话的片段, 并问他的关注者 "你能感受到加速吗?"</p><p>一件确定的事情是, 共和党方对比特币很感兴趣。今年夏天早些时候, 在与行业代表会晤后, 特朗普表示, 他希望所有未来的比特币都在美国开采。共和党的官方平台声明, 该党 "将结束民主党非法和反美的加密货币打击, 并反对中央银行数字货币的创建。我们将捍卫开采比特币的权利, 并确保每个美国人都有权自主保管他们的数字资产, 并免受政府监视和控制进行交易。"</p><p>如果这还不够明确地传递信息, 该党的新提名副总统候选人 J.D.·范斯,是一名持有比特币、对证券交易委员会持批评态度的人, 他公开批评了主席加里·根斯勒对区块链和加密货币的方法 "几乎完全违背了应该采取的方式"。</p><p>而且特朗普对加密货币的兴趣很可能会增加, 因为他计划于 7 月 27 日在纳什维尔主办比特币 2024 大会。</p><p>但是, 这是否会转化为对新兴技术的更广泛的无许可创新的支持, 还有待观察。</p><p>有值得鼓励的地方。在人工智能方面, 该党似乎准备拥抱这项技术为我们的经济和社会带来的前景。共和党已将其列入党纲, 承诺废除拜登政府的人工智能行政命令, 并支持以言论自由和人类繁荣为基础的人工智能发展。唐纳德·特朗普甚至似乎对人工智能感到敬畏, 在他的提名演讲中短暂提到了它, 并强调不应让国内人工智能问题阻碍美国在塑造世界技术中的作用。</p><p>像美国第一政策研究所 (AFPI) 和传统基金会这样的团体, 虽然不在正式的党内架构之内, &nbsp;但正试图影响潜在的特朗普第二任期, 也支持人工智能等技术。例如, AFPI 据说正在起草一个框架, 使美国在人工智能领域领先。传统 "2025 项目" 不仅强调了人工智能技术的发展的重要性, 还强调它们在检测政府支出中的浪费、欺诈和滥用以及执行国际贸易协议中的作用。</p><p>但也有令人担忧的地方。尽管一个有利于加密货币/人工智能的白宫可能会产生重大影响, 但目前还不清楚这如何转化为美国技术方面的具体内容。</p><p>自动驾驶汽车无非是将人工智能应用于汽车。虽然共和党的立场是支持人工智能, 但围绕自动驾驶汽车的态度相当模糊。特克·卡尔森和肖恩·奥布莱恩都有机会在共和党全国代表大会上发言。卡尔森表示, 如果他是总统, "我们不会让无人驾驶卡车上路。 完全不行。"</p><p>作为 teamsters 工会主席的奥布莱恩, 倡导要求在自动驾驶卡车上始终有持有商业驾驶执照的人驾驶, 并在全国游说禁止自动驾驶汽车。</p><p>尽管范斯对加里·根斯勒提出了批评, 但他同样赞赏联邦贸易委员会 (FTC) 主席丽娜·汗。</p><p>实际上, 在他批评根斯勒对加密货币和区块链方法的同一次演讲中, 他说汗是 "拜登政府为数不多做得很好的人之一"。而她做了什么? 她提出了拜登政府对人工智能最激进的监管方法, 几乎阻挡了每一起科技并购, 并继续推进可能最终破坏特朗普所看到的 "新黄金时代" 的可疑法律理论。</p><p>这是否令人担忧? 硅谷并不这么认为。事实上, 科技界的一众大佬已经排队支持共和党的提名候选人。</p><p>虽然有很多值得鼓舞的地方, 但现在还为时尚早, 无法确定我们可能会有一个全面呼吁无许可创新的白宫。 目前, 加密货币有机会摆脱阴霾。希望各行各业的创新者都能找到出路。</p>',
      url: 'https://tokeninsight.com/zh/news/trump-s-rnc-speech-gave-tech-enthusiasts-hope-for-the-future?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/jaskdj86.jpeg',
      source_url:
        'https://cointelegraph.com/news/trump-rnc-speech-gave-tech-enthusiasts-hope-future',
      timestamp: 1721642977000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'WazirX 黑客将 1.49 亿美元的 SHIB, MATIC 其他山寨币注入 ETH',
      content:
        '<p>据 Cointelegraph 报道, 区块链安全公司表示, 恶意行为者通常会将 altcoins 转换为以太币 (Ether), 以准备进行洗钱, 因为原生代币没有内置的冻结机制。</p><p>WazirX 加密货币交易所 235 百万美元被盗案的黑客已将近 150 百万美元的 altcoins 转换为以太币 - 这可能是为了避免资金被冻结或列入黑名单。</p><p>根据区块链分析公司 Spot On Chain 的数据, 7月18-19日期间的大规模资金转换包括 9020 万美元的 Shiba Inu、1020 万美元的 Polygon MATIC 以及约 750 万美元的 Pepe (PEPE)。</p><p>这些转账使得被盗资金中以太币的总额从最初的 5200 万美元增加到 2.01 亿美元。</p><p>Spot On Chain 告诉 Cointelegraph, 黑客可能将 ERC-20 代币转换为以太币, 因为后者更加流动性强,且不会被列入黑名单。</p><p>"一些 ERC20 代币有合约功能可以将地址列入黑名单, 而以太币本身没有这样的功能。"</p><p>区块链安全公司 PeckShield 补充说, "尽快兑换成以太币可以帮助黑客在当局或中心化代币发行商采取任何预防措施之前保护好资金"。</p><p>稳定币发行商 Tether 就曾经 blacklist 了数百个涉嫌可疑交易的钱包地址, 这就是一个典型的例子, Spot On Chain 补充说。</p><p>区块链安全公司 Beosin 表示, 以太币也更容易通过加密货币交易所和混币协议进行洗钱, 而且其价格也更加稳定。</p><p>此次黑客攻击引发了 SHIB 的抛售, 价格下跌近7%,而以太币的价格仅下跌0.1%。</p><p>据 Spot On Chain 在X上的帖子, 黑客还手持价值约 1200万 美元的 Chromia (CHR)、Celer Network (CELR)、Frontier (FRONT) 和 Ooki (OOKI)代币。</p><p>印度加密货币交易所 WazirX 在7月18日暂停了提现服务, 因为此次安全漏洞导致其近一半的储备被清空,据 WazirX 6 月的储备证明。</p><p>"这是我们无法控制的不可抗力事件, 但我们正在全力寻找和追回资金。我们已经阻止了一些存款, 并联系了相关钱包进行追回, "WazirX在X上发帖称。</p><p>区块链取证公司 Elliptic 告诉 Cointelegraph, WazirX &nbsp;235 百万美元被黑的攻击手法和技术特征, 令他们认为这可能是朝鲜黑客所为。</p>',
      url: 'https://tokeninsight.com/zh/news/wazirx-hacker-funnels-149m-of-shib-matic-other-altcoins-into-eth?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/dskaf767.jpeg',
      source_url:
        'https://cointelegraph.com/news/wazirx-hacker-converts-149-million-in-altcoins-to-ether',
      timestamp: 1721385360000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '交易所',
        },
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: 'Hamster Kombat 的用户被网络钓鱼攻击和虚假空投瞄准',
      content:
        '<p>据 Cointelegraph 报道, 加密货币骗子正试图利用以 Telegram 为基础的点击游戏 Hamster Kombat 的病毒式流行, 进行欺骗性的空投。</p><p>Hamster Kombat 玩家正遭受骗子和恶意行为者的针对, 他们试图从这款点击赚钱游戏的病毒式流行中获利。</p><p>Telegram 上最快增长的移动游戏之一 Hamster Kombat 的玩家正遭受网络钓鱼攻击。这些攻击涉及骗子诱骗受害者采取某些行动, 从而使攻击者获益。</p><p>这些网络钓鱼攻击最近被网络安全公司卡巴斯基发现, 据安全专家奥尔加·斯维斯图诺娃介绍:</p><p>"我们的团队已经揭露了一系列针对Hamster Kombat用户的欺骗性计划。在一种方案中, 骗子以将游戏币兑换成卢布为诱饵, 诱使受害者通过网络钓鱼链接提供 Telegram 登录凭证。"</p><p>斯维斯图诺娃解释说, 一旦攻击者获得用户凭证,成功攻击就可以实施:</p><p>"一旦输入了凭证, 攻击者就可以访问个人账户, 从而窃取数据、勒索和发送欺骗性消息。这一计划针对的是俄罗斯用户, 但来自其他国家的骗子也可能开始利用同样的方式诈骗受害者。"</p><p>Hamster Kombat 是最受欢迎的移动游戏之一, 在81天内吸引了2.39亿用户。根据 Telegram 创始人 Pavel Durov 的说法, 这款点击游戏每天都有400万至500万新用户加入, 使其成为世界上增长最快的数字服务之一。</p><p>网络安全公司警告 Hamster Kombat 的虚假加密货币空投</p><p><br>加密货币骗子也瞄准了这款病毒式流行的点击游戏,实施了虚假的空投计划,旨在窃取用户的加密货币钱包凭证。</p><p>卡巴斯基的斯维斯图诺娃表示, Hamster Kombat 的虚假空投旨在窃取用户的加密货币钱包信息:</p><p>"骗子利用免费加密货币的诱惑, 提供虚假的 Hamster 货币空投, 目的是窃取加密货币钱包信息...骗子还设立了声称以折扣价出售 Hamster 货币的网络钓鱼网站, 欺骗用户提供对其加密货币钱包的访问权限。"</p><p>Hamster Kombat (HMSTR) 代币在7月8日登陆 Bybit 进行预市场交易后, 受到了更多关注。</p><p>该网络安全公司补充说, 骗子还创建了承诺免费发放代币的虚假网站, 目的是通过"欺骗性佣金支付"的方式窃取用户的加密货币。</p><p>加密货币黑客和网络钓鱼攻击继续损害行业声誉<br>黑客攻击和网络钓鱼攻击继续拖累加密货币行业的合法性。</p><p>自2011年6月19日报告了第一起已知的加密货币黑客事件以来,过去13年里, 价值近190亿美元的数字资产在785起已报告的黑客和漏洞攻击中被盗。</p><p>2019年Plus Token欺诈案仍是最大单一加密货币盗窃案, 攻击者获得了价值29亿美元的比特币和以太币。</p><p>网络钓鱼骗局也是一个日益严重的问题, 特别是在一些最新的区块链上。例如,与1月相比, 3月份Base遭受的网络钓鱼攻击增加了1900%, 导致通过网络钓鱼窃取的加密货币增加了18倍。</p>',
      url: 'https://tokeninsight.com/zh/news/hamster-kombat-users-targeted-by-phishing-attacks-and-fake-airdrops?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/aljbsdf7y.jpeg',
      source_url:
        'https://cointelegraph.com/news/hamster-kombat-phishing-scams-fake-airdrops',
      timestamp: 1721384757000,
      tags: [
        {
          name: '游戏',
        },
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: '美国现货比特币etf连续第9天出现净流入',
      content:
        '<p>据 The Block 报道,美国现货比特币 ETF 周三报告净流入 5,335 万美元。</p><p>其中, 贝莱德的 IBIT 以 11,037 万美元的净流入领跑。</p><p>11 只美国现货比特币交易所交易基金周三共录得 5,335 万美元的每日净流入, 连续第 9 天保持正面走势。不过, 周三的净流入显著低于周二的 4.22 亿美元。</p><p>贝莱德的 IBIT 以 11,037 万美元的最大净流入领跑, 根据 SoSoValue 数据, 该最大现货比特币 ETF 的资产净值当日交易量为 12.1 亿美元。唯一另一只录得净流入的基金是富达的 FBTC,报告净流入 283 万美元。</p><p>另一方面,格雷斯凯的 GBTC 录得 5,386 万美元的净流出, 比特怀的 BITB 也流出 600 万美元。包括 ARK Invest 和 21Shares 的 ARKB 在内的其余 7 只基金昨日均未录得任何流动。</p><p>周三, 美国现货比特币基金的总交易量达到 17.9 亿美元。交易量水平仍大幅低于 3 月, 当时某些日子的交易量超过 80 亿美元。自 1 月上市以来, 这些 ETF 累计净流入 165.9 亿美元。</p><p>比特币价格在过去 24 小时内下跌 0.42%, 报 64,776 美元, 据 The Block 的比特币价格页面。</p><p>周三, 美国 ETF 发行商贝莱德、富达、格雷斯凯、比特怀等公司公布了即将推出的现货以太坊 ETF 的费率。贝莱德将费率设定为 0.25%,与其他几家发行商的费率水平相似。然而, 格雷斯凯将其格雷斯凯以太坊信托基金的费率设定为 2.5%,明显高于其他发行商。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-post-ninth-consecutive-day-of-net-inflows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/askdfba79.jpeg',
      source_url:
        'https://www.theblock.co/post/306054/us-spot-bitcoin-etfs-ninth-consecutive-net-inflows',
      timestamp: 1721296274000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '印度加密货币交易所 WazirX 被利用，获利超过 2.3 亿美元',
      content:
        '<p>根据 The Block 的报道, WazirX 遭受了一次攻击,导致超过 2.3 亿美元的加密资产被非法转移。</p><p>这次攻击针对的是该交易所的多重签名钱包。交易所确认了这一情况。</p><p>加密货币交易所 WazirX 遭受了一次钱包漏洞攻击, 导致超过 2.3 亿美元的加密资产被非法转移。</p><p>这次攻击针对的是该交易所在以太坊网络上的多重签名钱包, 可能是由于私钥遭到泄露而造成的。为了实施这次攻击, 攻击者需要将这个安全钱包的实现升级为一个恶意合约, 安全公司 Blocksec 解释道。</p><p>交易所承认了这一事件, 并表示正在调查资金流出情况,已暂停所有提款服务。"我们知道我们的一个多重签名钱包遭遇了安全漏洞。我们的团队正在积极调查这一事件。为了确保您的资产安全, 我们将暂时暂停 INR 和加密货币的提款," WazirX 表示。</p><p>被盗的资金被转移到一个地址, 攻击者正积极将被盗的资产, 如 PEPE 、 GALA 和 USDT,转换成以太币。链上数据显示, 黑客还盗走了价值 1 亿美元的 Shiba Inu 以及 1.529 万个 ETH (5200 万美元) 和 2000 万个 MATIC 代币 (1100 万美元)。</p><p>Blocksec 的联合创始人 Yajin (Andy) Zhou 表示,"看起来 WazirX 交易所存在私钥泄露问题。泄露的私钥被用来将一个持有大量资产的安全多重签名钱包升级为一个恶意合约。然后使用这个恶意合约来掏空大部分安全钱包中的资产。"</p><p>被盗的资金已转移到一个地址, 攻击者正在积极将被盗资产兑换成以太币。</p><p>链上数据显示, 黑客还盗走了价值 1 亿美元的 Shiba Inu (SHIB) 、 2000 万个 MATIC 代币 (1100 万美元) 、 6400 亿个 PEPE 代币 (750 万美元) 、 570 万个 USDT 和 1.35 亿个 GALA (350 万美元)。</p>',
      url: 'https://tokeninsight.com/zh/news/indian-crypto-exchange-wazirx-exploited-for-over-230-million?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kg7t98ify.jpeg',
      source_url: 'https://www.theblock.co/post/306041/wazirx-exploit',
      timestamp: 1721295677000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: '特朗普:他将发布第四部 NFT 合集:“人们希望我再做一本”',
      content:
        '<p>据 CoinDesk 报道: 特朗普总统竞选活动筹集了约 300 万美元的加密货币,主要是比特币和以太币。</p><p>据彭博社采访, 前总统唐纳德·特朗普计划推出第四个 NFT 系列。</p><p>特朗普已转向拥抱加密货币行业, 并表示"如果我们不这样做, 中国就会接手"。</p><p>根据彭博社商业周刊周二发表的一篇广泛采访, 唐纳德·特朗普计划推出第四个 NFT 系列。</p><p>在采访中, 特朗普表示他之前的系列"非常成功", 并于一天内售罄: "整个系列都售罄了: 45,000 张卡片。而且我做了三次[并且]我会再做一次, 因为人们希望我再做一次。这是难以置信的精神。很漂亮。"</p><p>特朗普此前在 5 月份为其 NFT 系列持有者举办的一个晚会上暗示过将推出第四个 NFT 系列, 但当时并未确定, 只说"我相信供需关系。正如你所知, 第一个做得很好, 第二个也很好, 第三个也很好。到某个时候也许会有变化。"</p><p>但随着加密货币行业继续支持特朗普的连任竞选, 这位前总统似乎越来越习惯于接受 NFT 和加密货币。5 月份, 特朗普的竞选活动开始接受加密货币捐款。周二发布的华尔街日报报告援引联邦选举委员会(FEC)的新数据显示, 特朗普上季度筹集的约 3.31 亿美元竞选资金中, 约 300 万美元为加密货币。</p><p>昨天, 特朗普宣布亲比特币参议员 J.D. Vance (共和党-俄亥俄州)作为他的副手人选。</p><p>包括 Kraken 联合创始人 Jesse Powell 以及 Gemini 联合创始人泰勒和卡梅隆·温克尔沃斯在内的加密货币行业主要人物, 已向特朗普的连任竞选和相关超级政治行动委员会(super PAC)捐赠了大笔资金, 包括新成立的特朗普导向的 America PAC 和亲加密的 Fairshake。</p><p>特朗普在彭博社商业周刊的采访中说, "这是不会消失的。这令人惊叹。"并补充说,他在筹款活动中"认识了很多人"来自加密货币行业, 称他们是"一流人才"。</p><p>曾经是加密货币的公开批评者, 特朗普告诉彭博社商业周刊, 他已经转向拥抱这个行业, 因为"如果我们不这样做, 中国就会接手, 中国就会拥有它 - 或者别人, 但最可能是中国。中国非常重视它"。</p><p>特朗普说:"我们有一个良好的基础。这还是个婴儿。现在还是个初创企业。但我不想为允许其他国家接管这个领域负责。"</p>',
      url: 'https://tokeninsight.com/zh/news/trump-says-he-ll-release-fourth-nft-collection-the-people-want-me-to-do-another-one?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/nj7fdb.jpeg',
      source_url:
        'https://www.coindesk.com/policy/2024/07/16/trump-says-hell-release-fourth-nft-collection-the-people-want-me-to-do-another-one/',
      timestamp: 1721212847000,
      tags: [
        {
          name: 'NFT',
        },
        {
          name: 'DeFi',
        },
        {
          name: '政策与监管',
        },
        {
          name: 'Kraken',
        },
      ],
    },
    {
      title: '美国现货比特币 ETF 净流入4.22亿美元，为6月初以来最大',
      content:
        '<p>据 The Block 报道, 周二美国现货比特币 ETF 实现了 4.2267 亿美元的净流入。</p><p>其中, BlackRock 的 IBIT 主导了 260.23 万美元的流入 , 这是自 6 月 6 日以来的最高水平。</p><p>11 家美国现货比特币交易所交易基金 (ETF) 在周二创下了 4.2267 亿美元的每日净流入纪录, 这也是 6 月 5 日以来最大的流入额。 这使得它们的正流入连续保持 8 天。</p><p>BlackRock 的 IBIT 以 260.23 万美元的流入量领跑 , 这是自 6 月 6 日以来的最大净流入。 根据 SoSoValue 的数据, IBIT 在周二的交易量约为 10.2 亿美元。</p><p>富达的 FBTC 以 61.05 万美元的流入跟在其后, ARK Invest 和 21Shares 的 ARKB 有 29.85 万美元的流入 , VanEck 的 HODL 有 22.04 万美元的流入。</p><p>Invesco 和 Galaxy Digital 的现货比特币基金录得 2054 万美元的净流入, 而 Bitwise 的 BITB 报告了 1734 万美元的流入。 富兰克林邓普顿和 Valkyrie 的比特币 ETF 也吸引了资金。</p><p>与此同时, Grayscale 转换后的 GBTC 基金没有任何流入。 周二没有基金报告净流出。</p><p>周二 , 美国现货比特币基金的总交易额达到 17.6 亿美元。 自 1 月份推出以来, 这些 ETF 已累计净流入 165.3 亿美元。</p><p>与此同时, 比特币价格在过去 24 小时内上涨 1.61% , 交易价格为 65,865 美元, 根据 The Block 的比特币价格页面。 今天早些时候, 世界上最大的加密货币简短地突破了 66,000 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-post-422-million-in-net-inflows-largest-since-early-june?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/anewohe8.jpeg',
      source_url:
        'https://www.theblock.co/post/305788/us-spot-bitcoin-etfs-post-422-million-in-net-inflows-largest-since-early-june',
      timestamp: 1721211658000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '日本 Metaplanet 追加购买价值 120 万美元的比特币，股价飙升 26%',
      content:
        '<p><br>据 The Block 报道: 这家东京上市公司的股价在周二上午交易中飙升 25.8%。</p><p>今天披露的最新收购让它的比特币总持有量达到约 &nbsp;1420 万美元。</p><p>日本投资公司 Metaplanet Inc. 在宣布购买价值约 126 万美元的额外比特币后, 其股价在周二上午交易中跳涨了 25.8%。</p><p>这家东京上市公司今天披露, 它购买了价值 2 亿日元(合 21.877 个比特币)的额外比特币。这使其比特币总持有量达到 225.611 个比特币, 约合 22.5 亿日元(1420 万美元)。</p><p>这次最新收购发生在公司在 7 月 8 日购买 42.47 个比特币后仅一周之内。5 月, 该公司宣布开始将比特币作为其战略性库存资产。"此举是为了应对日本持续的经济压力, 特别是高政府债务水平、持续的负实际利率以及因此而导致的日元疲软, "该公司当时表示。</p><p>根据 Google Finance 的数据, Metaplanet 的股票在上午交易中飙升约 25.81%。</p><p>上月, Metaplanet 宣布其董事会同意使用通过债券发行筹集的资金购买价值 10 亿日元(626 万美元)的比特币。</p><p>比特币资产情况网站数据显示, Metaplanet 此前在 4 月 23 日、5 月 10 日、6 月 11 日、7 月 1 日和 7 月 8 日购买了比特币。</p>',
      url: 'https://tokeninsight.com/zh/news/japan-s-metaplanet-buys-additional-1.2-million-worth-of-bitcoin-shares-surge-26?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/njnjfnu.jpeg',
      source_url:
        'https://www.theblock.co/post/305510/japans-metaplanet-buys-additional-1-2-million-worth-of-bitcoin-shares-surge-26',
      timestamp: 1721125447000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '最新消息: Mt. Gox 在预期派息之前转移了数十亿美元的比特币',
      content:
        '<p>据 The Block 报道: Mt. Gox 比特币钱包在周二转移了约 58 亿美元的比特币到目前未知的地址。</p><p>根据区块链分析平台 Arkham 的标记, 在周二 UTC 时间 6:49, 一个与 Mt. Gox 相关的比特币钱包转移了近 42,588 个比特币(约 27 亿美元)到一个目前未知的地址 "18vjn"。</p><p>这次大规模转账是在一笔被认为是测试交易之后进行的。在 UTC 时间 5:13, Mt. Gox 的一个钱包转移了 0.021 个比特币(约 1,320 美元)到一个未知地址。在 UTC 时间 6:39, Mt. Gox 还将 44,000 个比特币 (约 28 亿美元)转移到内部。</p><p>在随后的一笔交易中, 在 UTC 时间 8:12, 另一个标有 Mt. Gox 标签的地址向未标记的地址 "3JQie" 发送了超过 48,641 个比特币(约 31 亿美元)。</p><p>本月初, Mt. Gox 将近 47,229 个比特币转移到一个新的钱包。</p><p>这些转账发生在即将向债权人偿还约 90 亿美元比特币的背景下。</p><p>这家已经停止运营的交易所在 2014 年 2 月申请破产,此前经历了多次被盗事件, 导致损失高达 95 万个比特币。</p><p>伴随着今天最新转账的发生, 比特币价格从约 65,000 美元下跌到约 63,000 美元。</p><p>根据 Arkham 的数据, Mt. Gox 目前仍持有近 139,000 个币,价值超过 87 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/update-mt.-gox-moves-billions-of-dollars-in-bitcoin-ahead-of-anticipated-payouts?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/kjji883f.jpeg',
      source_url:
        'https://www.theblock.co/post/305546/mt-gox-movements-3-billion-usd',
      timestamp: 1721124958000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '包含 6000 万美元比特币的休眠地址在近 12 年后苏醒',
      content:
        '<p>据 The Block 报道: 一个于 2012 年收到了 1,000 个比特币 (当时价值约 1.2 万美元) 的比特币地址, 在近 12 年的不活跃后, 于 2024 年 1 月首次将这些如今价值超过 6,000 万美元的资金转移到了一个新的地址。</p><p>这个钱包最初是由上链监测平台 Whale Alert 发现的, 但目前仍不知道其所有者的身份。</p><p>这个钱包在 11 年 9 个月前收到了这 1,000 个比特币, 直到上周日才进行了第一次转账交易, 将这 1,000 BTC 转移到了一个新的地址上。</p><p>当时这 1,000 个比特币的价值仅为 1.21 万美元, 但经过近 12 年的持有, 其价值已增长了约 500,000%。</p><p>这笔交易被广播到网络上时, 这 1,000 个比特币的价值约为 4,160 万美元。 但由于比特币价格的上涨, 到实际被记账时, 这些比特币的价值已经增加了近 2,000 万美元。</p><p>最近其他比特币鲸鱼账户的动态:</p><p>10 天前, 另一个沉睡了 12 年以上的钱包转移了近 700 万美元的资金。</p><p>5 月 12 日, 一个 10 年前沉睡的 1,000 BTC (价值 6,000 万美元) 账户首次转账。 在此之前的一周, 另一个 10 年未动的账户转移了价值 4,400 万美元的 687.33 个比特币。</p><p>3 月, 比特币区块链上第五大富豪地址在 2019 年后首次转移了 60 亿美元。 同月, 另一个实体还将 2010 年挖掘的 1.4 亿美元比特币合并到一个单一钱包中。</p><p>1 月, 在美国批准现货比特币 ETF 后的不到一周内, 近 50,000 个沉睡多年的比特币首次 "苏醒"。</p>',
      url: 'https://tokeninsight.com/zh/news/dormant-address-containing-60-million-in-bitcoin-wakes-up-after-nearly-12-years?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/jfhgisdhfjbr983d.jpeg',
      source_url:
        'https://www.theblock.co/post/305202/dormant-address-containing-60-million-in-bitcoin-wakes-up-after-nearly-12-years',
      timestamp: 1721039025000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '特朗普躲过暗杀后，比特币突破 6.3 万美元',
      content:
        '<p>据 The Block 报道：比特币价格于周一上涨 4.41% 至 63,008 美元。</p><p>一位专家评论称, 亲加密货币候选人特朗普在遭暗杀未遂后获胜的可能性有所增加。</p><p>周一早上, 比特币价值反弹突破 63,000 美元大关, 此前亲加密货币前总统特朗普在周六的集会上幸免于遭暗杀。</p><p>根据 The Block 的比特币价格页面, 比特币目前交易价格为 63,008 美元, 较前一日上涨 4.41%。加密货币市场整体在过去 24 小时内也有所增值。以太币上涨 4.99% 至 3,366 美元, 索拉纳上涨 5.75% 至 153.72 美元。过去一天, 整个加密货币市场上涨 4.17%。</p><p>"特朗普在周末幸存了一次暗杀未遂, 市场将此解读为显著提高了他在未来选举中获胜的机会," 比特币研究所首席分析师 Ryan Lee 说。</p><p>在过去几个月里, 即将成为共和党总统候选人的特朗普一直在宣扬支持本地区块链和加密货币行业。特朗普的竞选团队接受加密货币捐款, 并承诺在白宫支持比特币挖矿。</p><p>周一盘前交易中, 前美国总统特朗普的媒体和科技集团公司股价大涨 64.4%,此前他在枪击事件中的生还成为了本周末全球最重大的新闻之一。</p><p>特朗普在枪击事件后仍表示, 他将如期出席本月晚些时候在纳什维尔举行的比特币 2024 会议, 组织者在 X (Twitter) 上周日称。</p><p>去中心化预测市场平台 Polymarket 上的美国总统选举获胜者投注显示,71% 的用户押注于特朗普获胜 — 较枪击事件前约 60% 有所增加。拜登总统在同一平台上获胜的几率为 18%。</p><p>上周五, 根据 Arkham Intelligence 的数据, 德国政府出售并清空了其加密货币钱包, 此前一直有比特币转账到 Bitstamp 、Coinbase 、Kraken 、B2C2 Group 和 Cumberland DRW 等交易所。这些转账似乎与德国计划出售从一个非法电影盗版平台没收的 5 万枚比特币有关。</p><p>德国政府的此计划以及 Mt Gox 向债权人支付价值 90 亿美元的比特币赔付, 给比特币市场带来了抛售压力。这些市场压力导致比特币本月早些时候一度跌至 54,000 美元以下的低点。</p><p>上周,Bitwise 首席投资官 Matt Hougan 表示, 加密货币行业有关键的有利因素, 可能会推动比特币在年底前升至 10 万美元, 包括美国政治态度对加密货币的积极变化、联邦储备局即将进行的利率下降, 以及稳定币市场的强劲增长。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-breaks-above-63-000-after-trump-survives-assassination-attempt?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/29734764539er.jpeg',
      source_url: 'https://www.theblock.co/post/305218/bitcoin-trump-attack',
      timestamp: 1721038152000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        '伯恩斯坦: Iris Energy已承诺将大部分Childress站点用于扩展比特币挖矿',
      content:
        '<p>据 CoinDesk 报道,在 Culper Research 发布的一份报告称,该公司的 Childress 站点不适合人工智能和高性能计算后,比特币矿商的股票在昨天下跌。</p><p>Iris Energy 股票在一家做空机构表示该公司的 Childress 站点不适合托管人工智能或高性能计算后,下跌了 14%。</p><p>Bernstein 指出, 该公司从未表示有意改造比特币采矿站点用于人工智能。</p><p>Iris Energy (IREN) 股票在昨天下跌近 14%, 此前 Culper Research 发布了一份做空报告, 指出比特币矿商 Iris Energy 位于德克萨斯州 Childress 的站点不适合用于人工智能 (AI) 或高性能计算 (HPC)。</p><p>然而, 券商 Bernstein 在一份研究报告中表示, 该公司已将大部分计划在该站点的扩张用于比特币(BTC)挖矿, 而该站点现有的电力和数据中心基础设施非常适合这一目的。</p><p>"Iris Energy 从未声称有意将其在 Childress 的比特币采矿站点改造为人工智能, "由 Gautam Chhugani 领导的分析师写道。</p><p>Bernstein 还估计, 该公司65%的价值来自比特币挖矿, 其余35%来自AI/HPC。Bernstein 表示, 他们完全不赞同该采矿活动毫无价值的观点。</p><p>Iris Energy 的人工智能潜在收益主要来自 1.4 吉瓦的西德克萨斯站点, 该站点拥有电网连接, 机会在于土地和电力供应的变现, 报告称。</p><p>Bernstein 表示,Iris Energy 目前每兆瓦 100 万美元的资本支出指标反映了比特币挖矿的资本支出, 将其与 AI/HPC 资本支出相比并不恰当。</p><p>该报告还表示, Iris Energy 的估值与其他比特币矿商如 CleanSpark (CLSK) 和 Marathon Digital (MARA) 相符, 它们的估值完全由采矿推动。</p><p>Bernstein 本周早些时候启动对 Iris Energy 的覆盖,给予跑赢大盘的评级, 目标价为26美元。该股周四收于 11.20 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/iris-energy-has-committed-most-of-childress-site-to-expansion-of-bitcoin-mining-bernstein?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/83467452.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/07/12/iris-energy-has-committed-most-of-childress-site-to-expansion-of-bitcoin-mining-bernstein/',
      timestamp: 1720781093000,
      tags: [
        {
          name: '挖矿',
        },
      ],
    },
    {
      title: '现货比特币 etf 净流入 7900 万美元，连续第五天实现正流入',
      content:
        '<p>据 The Block 报道: 美国 11 只比特币现货 ETF 在周四录得近 7900 万美元的净流入。</p><p>其中, 贝莱德的 IBIT 以 7209 万美元的净流入领跑。</p><p>美国比特币现货 ETF 在周四录得总计 7893 万美元的每日净流入, 已连续第五天呈现正面趋势。</p><p>按净资产值计算, 是最大的比特币现货 ETF IBIT 以 7209 万美元的净流入录得当日最大净流入。该基金在周三也是交易量最大的比特币 ETF,交易量达 7.2561 亿美元。富达的 FBTC 录得 3269 万美元的净流入。</p><p>Bitwise 的比特币现货基金也吸引了 753 万美元的流入, 而 Ark Invest 和 21Shares 的 ETF 则增加了 431 万美元。</p><p>周三的流入被格雷斯克的 GBTC 的3769万美元净流出所抵消。另外六只基金, 包括 VanEck 的 HODL,昨天报告零流动。</p><p>7月11日, 美国比特币现货 ETF 的总交易额达到13.1亿美元。相比之下,3 月份的交易量曾多次超过80亿美元, 现在仍然明显低于当时。自1月份推出以来, 这些 ETF 已累计净流入 155 亿美元。</p><p>与此同时, 美国发行商仍在等待美国证券交易委员会 (SEC) 批准其最新修订的以太坊现货 ETF 注册声明。虽然发行商已根据 SEC 的反馈修改了以太坊基金的 S-1 声明, 但一位发行商告诉 The Block, 他们预计 SEC 的下一条消息将会对这一备受期待的发布提供很多信息。</p>',
      url: 'https://tokeninsight.com/zh/news/spot-bitcoin-etfs-log-79-million-in-net-inflows-reaching-fifth-consecutive-day-of-positive-flows?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/q8234y923.jpeg',
      source_url:
        'https://www.theblock.co/post/304992/spot-bitcoin-etfs-log-79-million-in-net-inflows-reaching-fifth-consecutive-day-of-positive-flows',
      timestamp: 1720780620000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        '美国现货比特币 etf 报告净流入 1.47 亿美元，延续了连续 4 天的积极势头',
      content:
        '<p>据 The Block 报道: 本周三, 美国比特币现货交易所交易基金 (ETF) 连续第四天出现净流入。</p><p>富达公司的 FBTC 基金以 5,779 万美元的净流入量领跑。</p><p>美国比特币现货 ETF 总体每日净流入 147.37 万美元, 延续了连续四天的正净流入态势。</p><p>其中, 富达的 FBTC 基金领跑周三的净流入, 达 5,779 万美元(数据来自SoSoValue)。富兰克林邓普顿的比特币现货基金以 3,166 万美元的大额净流入紧随其后, 这也是自 5 月初以来该基金最大的净流入。</p><p>规模最大的比特币现货基金——黑石的 IBIT, 昨日也录得 2,224 万美元的净流入。Valkyrie 的 BRRR 基金净流入为 2,068 万美元。</p><p>Invesco 和 Galaxy Digital 的 BTCO 基金分别录得约 950 万美元的净流入, 而 ARK Invest、21Shares、Bitwise 和 VanEck 的基金则有较小的净流入。</p><p>格雷斯凯尔的 GBTC (第二大比特币 ETF) 是唯一一只昨日录得净流出 (815万美元) 的基金。</p><p>周三, 11 只比特币现货基金的总成交额达 12.5 亿美元。不过, 与今年 3-4 月每日超过 120 亿美元的峰值相比, 现货比特币 ETF 的交易量仍明显偏低。自 1 月以来, 这些 ETF 共累计净流入 154.2 亿美元。</p><p>过去 24 小时内, 比特币价格下跌 2% 至 57,623 美元。尽管从上周的下跌中有一定程度的恢复, 但仍远低于 6 月初 7 万美元以上的价格水平。加密货币投资者目前面临着来自 Mt Gox 赔付计划和德国政府比特币动向的压力。</p><p>与此同时, 加密资产管理公司 Bitwise 的首席投资官 Matt Hougan 表示, 由于包括比特币政治态度转变和美联储可能降息等因素, 比特币有望在年底前达到 1 万美元的目标价位。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-report-147-million-in-net-inflows-extending-positive-streak-to-4-days?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/9347466753.jpeg',
      source_url:
        'https://www.theblock.co/post/304685/us-spot-bitcoin-etfs-report-xx-million-net-inflows',
      timestamp: 1720692876000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '自2018年以来，加密矿工在马来西亚窃取了7.23亿美元的电力',
      content:
        '<p>根据 Cointelegraph 报道, 马来西亚能源转型和水资源变革副部长透露, 在一次行动中, 他们处置了 2,000 多台被查获的矿机。</p><p>根据马来西亚能源和水资源副部长 Akmal Nasrullah Mohd Nasir 的说法, 2018 年至 2023 年期间, 马来西亚的非法加密货币挖矿运营商盗取了价值 7.23 亿美元的电力。</p><p>Nasir 在一个处置 2,022 台被查获的价值约 46.7 万美元的设备(包括比特币矿机和电力设备)的活动上发表了上述言论, 据《马来邮报》报道。</p><p>Nasir 表示, 这些非法挖矿活动不仅危害了马来西亚国有电力运营商 Tenaga Nasional Berhad, 也危害了受影响地区的当地居民。</p><p>电力盗窃者通常会避免向相关部门登记, 并找到绕过电表或从电线分流电力的方法。</p><p>Nasir 说: "这些人挖掘加密货币而偷盗电力的原因, 是因为他们认为这种活动不会被发现, 因为他们的场所没有电表。"</p><p>"但是, 供电公司有各种方法来检测某个地区的不正常用电情况, "他补充说, 以解释马来西亚官员是如何在 2022 年 10 月的一次行动中查获 2,000 多件物品的。</p><p>马来西亚 Universiti Teknologi MARA 在 2022 年 12 月解释说, 在该国, 加密货币挖矿并不是非法的, 但偷盗电力进行挖矿是非法的。</p><p>马来西亚官员自 2019 年 8 月起就一直在查扣加密货币矿机, Nasir 表示这是根据该国的刑事诉讼法进行的。</p><p>一些矿机被用挖土机碾压销毁。</p><p>Nasir 表示, 遏制非法矿工是其部门的一项优先工作, 同时还要增加马来西亚的可再生能源来源。</p><p>此外, 马来西亚也在打击未经注册的加密货币交易所。 去年5月, 马来西亚证券委员会要求加密货币交易所火币全球关闭其运营, 因为其未能注册交易服务。</p><p>目前, HATA 数字、Luno、SINEGY、MX Global、Tokenize Technology 和 Torum International 是马来西亚唯一注册的加密货币交易平台。</p>',
      url: 'https://tokeninsight.com/zh/news/crypto-miners-stole-723m-of-electricity-in-malaysia-since-2018-report?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/78595.jpeg',
      source_url:
        'https://cointelegraph.com/news/crypto-miners-stole-723m-electricity-malaysia-since-2018-report',
      timestamp: 1720690952000,
      tags: [
        {
          name: '挖矿',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '比特币反弹至 6 万美元，但波动可能持续',
      content:
        '<p>根据 CoinDesk 的报道: K33 Research 表示, 市场将不得不接受在今年中期出现 40 亿美元至 70 亿美元的比特币抛售压力, 这将对价格产生打击。</p><p>加密货币在周二出现反弹, 比特币 (BTC) 涨近 3% 至约 58,000 美元, 之前的恐慌情绪有所缓解。</p><p>这种复苏是广泛的, 过去 24 小时内, CoinDesk 20 指数上涨 2.4%, 领涨的有Solana (SOL)、Filecoin (FIL)以及 Avalanche (AVAX) 和 Internet Computer Protocol &nbsp;(ICP) 的本地代币。</p><p>这种上涨势头可能会持续一段时间, 比特币可能会达到 60,000 美元, 但这种涨势将是短暂的,10x Research 的创始人 Markus Thielen 表示。</p><p>"从技术分析的角度来看, 55,000-56,000 美元的价格区间正在形成支撑。然而, 考虑到中期技术面的损害, 我们预计这只会是一次短期的看涨反弹趋势。"</p><p>Thielen补充说,"我们预计比特币可能会反弹至接近 60,000 美元, 然后又会下跌至 5 万美元左右的低位, 这将造成复杂的交易环境。"</p><p>季节性趋势也不利于比特币, K33 Research 的高级分析师 Vetle Lunde 在周二表示, 第三季度通常是收益最低的时期。</p><p>这种疲弱的季节性与德国萨克森州出售被扣押资产以及正在进行的 Mt. Gox 清算赔付同步, 这些都对价格形成了压力。</p><p>据 K33 Research 的估计,市场将不得不在夏季吸收来自萨克森州和 Mt. Gox 客户的 75,000 至 118,000 个比特币的抛售, 价值 43 亿美元至 68 亿美元。</p><p>"我们预计这些流动将在未来几个月对表现构成负担, 并且波动的市场状况将一直持续到 10 月。" Lunde 说。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-rebounds-toward-60k-but-choppiness-likely-to-persist?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/77646746.jpeg',
      source_url:
        'https://www.coindesk.com/markets/2024/07/09/bitcoin-rebounds-toward-60k-but-choppiness-likely-to-persist-analysts/',
      timestamp: 1720607778000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        'Elliptic 指控洗钱和其他犯罪与数十亿美元的 Huione Guarantee 市场有关',
      content:
        '<p>据 The Block 报道, Elliptic 公司追踪到至少 110 亿美元的加密货币流向位于柬埔寨的 Huione Guarantee 市场。</p><p>这家区块链分析公司发布了一份报告, 指控 Huione 的商家宣传非法服务。</p><p>尽管加密资产助长了全球犯罪活动, 但 Elliptic 的研究人员表示, 区块链的透明性有助于他们的调查工作。</p><p>区块链侦探公司 Elliptic 的分析人员在周三发布的一份新报告中声称, 他们已经发现了由位于柬埔寨的 Huione Guarantee 市场所实施的据称涉及洗钱和其他犯罪的行为。</p><p>自 2021 年成立以来, 与 Huione 及其独立商家相关的加密钱包已经接收到至少 110 亿美元, 这是 Elliptic 给出的一个保守估计。</p><p>"并非所有这些交易都可以明确地与欺诈或其他非法活动挂钩; 但是, Huione Guarantee 的活动性质表明, 这些付款的大部分与此有关,"研究人员写道。</p><p>根据 Elliptic 的说法, Tether 的稳定币是该网站最受欢迎的支付选择之一, 该网站也支持支付应用程序和银行转账。</p><p>Huione Guarantee 是更大的 Huione 集团的一个部分,该集团运营着一个名为 Huione Pay 的支付应用程序, 并在东南亚地区的保险、航空和房地产行业有所涉足。Elliptic 还声称, Huione 的高管与柬埔寨首相洪森有联系。</p><p>在这份 6 页文件中, Elliptic 的研究人员声称, 这个所谓的"中性"市场已经沦为犯罪的温床。由于商家运营自己的即时通讯应用频道, Huione 表示, 它无法了解"客户的具体业务"或平台上资金流的性质。</p><p>因此, Elliptic 声称, Huione 对正在发生的任何数量的犯罪行为都视而不见, 包括商家 "明确提供洗钱服务"、"性剥削"计划和恶意软件。</p><p>报告中展示的一些据称的商家和客户之间的对话截图显示, 有人愿意洗钱来自 "猪屠宰" 骗局的所得, 这是一种日益普遍的涉及社会工程技术从受害者那里窃取资金的投资欺诈。</p><p>报告中显示的其他广告包括用于困住受剥削工人的 "诈骗化合物" (如缅甸、老挝和柬埔寨等国家) 的电击项圈。美国和平研究所发现, 依赖于强迫劳动的大规模诈骗化合物正在快速蔓延到亚洲。</p><p>尽管抗审查的区块链网络有助于全球犯罪活动, 但 Elliptic 的研究人员指出, "调查人员和合规团队能够利用区块链分析预先检测和中断 USDT 付款"。</p><p>该公司表示,它已经识别并标记了 Huione 公司控制的 "数百个加密货币地址", 这意味着 "接收加密资产的交易所和其他企业可以对这些交易进行筛查...以确保这些资金不会被进一步洗钱"。</p>',
      url: 'https://tokeninsight.com/zh/news/elliptic-alleges-money-laundering-and-other-crimes-linked-to-multi-billion-dollar-marketplace-huione-guarantee?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/1425125.jpeg',
      source_url:
        'https://www.theblock.co/post/304386/elliptic-alleges-money-laundering-linked-to-marketplace-huione-guarantee',
      timestamp: 1720606373000,
      tags: [
        {
          name: '政策与监管',
        },
        {
          name: 'Tether',
        },
      ],
    },
    {
      title:
        'Kraken：澳大利亚投资者仍然青睐比特币，而更新的表情币也越来越受欢迎',
      content:
        '<p>据 The Block 报道, 全球加密货币交易所表示, 在 2023 年 5 月至 2024 年 5 月期间, 比特币仍是澳大利亚最受交易青睐的加密货币。</p><p>该交易所发现, 较新的迷因币 (memecoins) 如 Pepe 和 Wif 的受欢迎程度正在上升。</p><p>加密货币交易所 Kraken 表示, 澳大利亚投资者更倾向于交易比特币, 而包括 Pepe 和 Dogwifhat 在内的新兴迷因币也吸引了澳大利亚用户的关注。</p><p>在对 Kraken 交易所上数百万个澳大利亚钱包进行分析后, 该公司在一份声明中表示, 在 2023 年 5 月至 2024 年 5 月期间, 比特币仍是最受交易青睐的加密货币。比特币约占澳大利亚总交易量的 27.07%, 略高于 26.46% 的全球平均水平。</p><p>索拉纳是澳大利亚第二受欢迎的加密货币, 占总交易量的 10.02%, 而全球平均水平为 7.81%。以太坊排名第三, 占澳大利亚总交易量约 9.66%,而全球为 9.93%。</p><p>Kraken 澳大利亚及全球其他地区的董事总经理乔纳森·米勒表示:"推出诸如 SOL/AUD 之类的新交易对是为了直接满足我们澳大利亚客户的需求。很高兴看到澳大利亚人对新兴迷因币表现出的热情, 这些迷因币是加密货币生态系统中有趣且日益流行的一部分。澳大利亚人并不陌生于走出常规, 这在导航这个日新月异的资产类别时很有用。"</p><p>该报告还发现, 与其他已建立的迷因币(如 Doge) 相比, 澳大利亚投资者更倾向于持有较新的迷因币, 包括 Pepe、Wif 和 Bonk。约 2.65% 的澳大利亚用户持有Pepe, 几乎是全球平均水平 1.49% 的两倍, 而约 1.58% 的澳洲投资者持有 Wif, 而全球平均水平为 0.45%。</p>',
      url: 'https://tokeninsight.com/zh/news/aussie-investors-still-favor-bitcoin-while-newer-memecoins-gain-popularity-kraken?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/3467543765.jpeg',
      source_url:
        'https://www.theblock.co/post/304152/aussie-investors-still-favor-bitcoin-while-newer-memecoins-gain-popularity-kraken',
      timestamp: 1720521162000,
      tags: [
        {
          name: 'Meme',
        },
      ],
    },
    {
      title: '德国政府准备下一次 2.76 亿美元的比特币抛售',
      content:
        '<p>据 Cointelegraph 报道：德国政府在 1 小时内转移了约 3,100 枚价值 1.78 亿美元的比特币, 进一步抛售可能会随之而来。</p><p>在 7 月 9 日转移了约 3,100 枚价值 1.78 亿美元的比特币后, 德国政府继续进行比特币的抛售。</p><p>与此同时, 政府还从 Bitstamp 撤回了大约 1,700 枚价值 9,178 万美元的比特币, 从交易所收回了部分 BTC。</p><p>在撰写本文时, 德国政府还从其主要储备中转移了 3,107 枚比特币, 可能正在为进一步的抛售做准备。</p><p>目前, 德国政府的主要地址持有约 26,000 枚价值 15 亿美元的比特币, 而用于出售持有的地址目前持有 4,800 枚价值 2.77 亿美元的比特币。</p><h2>德国政府的抛售持续进行</h2><p><br>从 7 月 9 日 UTC 7:30 开始, 总共有 3,100 枚比特币流出, 其中 2,500 枚被发送到一个未知的 B2C2 集团, 400 枚发送到集中交易所 Kraken, 剩下的 200 枚发送到一个未知钱包。</p><p>德国政府在 7 月 8 日又抛售了价值 9 亿美元的比特币, 这表明他们计划继续稳步出售剩余的 15 亿美元比特币持有量。</p><p>尽管经历了大规模抛售, 但这 16,309 枚已经卖出的比特币现在价值已超过 9.3 亿美元, 这表明买家仍然有信心在这个价格范围内购买比特币。</p><h2>经济政策影响</h2><p><br>华尔街交易员预计美联储在 9 月将有 72% 的可能性降息, 较低的利率可能有助于刺激对比特币的投资。</p><p>这种宏观经济趋势往往会对比特币等资产产生明显影响, 因为比特币仍被视为风险资产, 不像黄金等在地缘政治动荡期间成为流动性避风港。</p><p>与比特币抛售同时发生的是矿工活动和储备的减少, 这表明市场情绪可能已接近底部。</p><p>根据 Bitfinex 分析师的观点, 7 月 6 日和 7 日的市场数据显示了这一本地底部, 尽管 Mt. Gox 开始向其债权人偿还比特币和比特币现金 (BCH)。</p><h2>比特币可能准备反弹</h2><p><br>尽管与德国政府和 Mt. Gox 向债权人偿还有关的比特币抛售, 但一些指标表明比特币已准备好反弹。</p><p>比特币触及自2月底以来的最低点 53,550 美元后, 反弹至当前的57,600美元高位。</p><p>在此期间, 相对强弱指数 (RSI) 显示价格下跌而 RSI 值上升, 这表明抛售压力正在减弱。</p>',
      url: 'https://tokeninsight.com/zh/news/german-gov-t-prepares-for-next-276m-btc-sell-off?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/45765467.jpeg',
      source_url:
        'https://cointelegraph.com/news/german-government-prepares-next-276m-btc-selloff?_gl=1%2ad07xsu%2a_ga%2aMTQyOTE4MjY0Ni4xNzE4NjE0MzUz%2a_ga_53R24TEEB1%2aMTcyMDUxOTg4OC4yMC4xLjE3MjA1MTk5MTQuMzQuMC4yMTM1MzQ2NDY2',
      timestamp: 1720520544000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '德国政府在持续的抛售狂潮中又转移了1000个比特币',
      content:
        '<p>据 The Block 报道: 德国政府将 250 枚比特币转移到 Bitstamp, 另外 250 枚比特币转移到 Coinbase。</p><p>另外 500 枚比特币被转移到一个未标记的地址。</p><p>德国政府继续将比特币转移到集中交易所, 可能是为了出售。</p><p>链上分析平台 Arkham 的数据显示, 被标记为德国政府所有的地址转移了 250 枚比特币到 Bitstamp, 以及 250 枚比特币到 Coinbase, 总价值近 2800 万美元。</p><p>另外 500 枚比特币被转移到一个未标记的地址, 可能属于某个集中加密货币交易所或场外交易服务。</p><p>德国政府目前在已知地址上持有 38,826 枚比特币, 总价值 21.7 亿美元。</p><p>德国政府持续数周的抛售并未受到该国政府内部的普遍欢迎。德国联邦议院议员 Joana Cotar 强烈批评政府"仓促"抛售所持有的比特币, 缺乏全面的比特币战略。&nbsp;</p><p>"与其将比特币持有作为战略性储备货币, 正如已在美国讨论的那样, 我们的政府反而在大规模抛售, "这位独立议员和比特币倡导者上周四写道, 称这 "不明智" 且 "适得其反"。</p><p>根据 The Block 的比特币价格页面, 比特币价格当日下跌 3.34%, 延续了最近几周的总体下跌趋势。</p>',
      url: 'https://tokeninsight.com/zh/news/german-government-transfers-another-1-000-bitcoins-in-ongoing-selling-spree?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/23437.jpeg',
      source_url:
        'https://www.theblock.co/post/303856/german-government-bitcoin-transfers-selling-spree',
      timestamp: 1720435755000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: 'Celo 推出 Dango Layer 2 测试网络，这是加入以太坊生态系统的第一步',
      content:
        '<p>据 The Block 报道：Celo 成功推出了其 Dango Layer 2 测试网, 该测试网构建在 Optimism 的 OP 堆栈之上。</p><p>经过去年夏天的投票, Celo 计划将其 Layer 1 区块链转变为以太坊 Layer 2 网络, 成功的测试网启动标志着这一计划的第一个重要步骤。</p><p>Celo 是一个面向移动端的 Layer 1 区块链, 它已经推出了 Dango Layer 2 测试网, 这是 Celo 加入以太坊生态系统的一个重要步骤。</p><p>Celo 与以太坊虚拟机 (EVM) 兼容, 它在去年 7 月投票决定将其 Layer 1 网络转变为以太坊的 Layer 2 链。经过 8 个月的评估, Celo 社区决定使用 Optimism 的 Stack 构建这个 Layer 2 网络, 加入到所谓的 "Superchain" 生态系统, 与 Base、Zora、Mode 等以太坊 Layer 2 网络并列。</p><p>虽然 Celo 用户可以继续使用原生的 USDT 和 USDC 稳定币支付该新网络的 gas 费用, 但在以太坊和 Celo 之间桥接代币将变得更加容易。交易速度也将加快, 吞吐量将提高 50%, 区块时间将从 5 秒缩短至 2 秒, 这都是根据 Celo 的公告。</p><p>"对于大多数与 EVM 兼容的链来说, 在以太坊扩容路线图证明自身的市场中, 独立定位越来越难以证明, "Celo 核心开发人员 cLabs CTO Marek Olszewski 去年告诉 The Block。</p><p>根据公告, Celo 团队预计 2024 年初将实现主网上线。</p>',
      url: 'https://tokeninsight.com/zh/news/celo-launches-dango-layer-2-testnet-in-first-step-towards-joining-ethereum-ecosystem?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/76536.jpeg',
      source_url:
        'https://www.theblock.co/post/303841/celo-launches-dango-layer-2-testnet-in-first-step-towards-joining-ethereum-ecosystem',
      timestamp: 1720420887000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: '以太坊',
        },
        {
          name: 'Celo',
        },
      ],
    },
    {
      title: 'Mt . Gox 的债权人可能要等上三个月才能收到他们的比特币',
      content:
        '<p>据 The Block 报道：债权人收到比特币或比特币现金赔付的时间表因托管机构而有所不同。</p><p>对于通过 Kraken 账户进行赔付申请的人来说, 可能需要长达 90 天的时间。</p><p>根据托管人的文件, MtGox 的债权人可能需要等待长达 3 个月的时间才能收到他们的比特币或比特币现金赔付, 这取决于他们向哪些加密货币交易所提出了申领。</p><p>这家已经倒闭的加密货币交易所的托管人今天宣布, 已经开始向部分指定的加密货币交易所进行赔付, 这是根据重组计划进行的。</p><p>托管人此前详细说明, 赔付在债权人账户中可见的时间表可能因交易所而有所不同。Kraken 有 90 天的处理时间, 而 Bitstamp 可能需要长达 60 天。BitGo 将在 20 天内完成赔付。SBI VC Trade 和 Bitbank 将在 14 天内完成全部赔付。</p><p>托管人在文件中表示:"每个指定的加密货币交易所等,有义务在从托管人那里转移 BTC/BCH 的某个天数内, 将 BTC/BCH 的数量添加到债权人账户的余额中(或转移到与账户关联的钱包)。"</p><p>托管人在今天的公告中指出, 如果债权人满足某些条件, 包括确认注册账户的有效性、接受指定加密货币交易所的认购意向, 以及与托管人完成讨论, 赔付将"及时进行"。</p><p>据 Arkham 的数据, 今天早些时候, MtGox 将 47,228.7 个比特币 (约27.1亿美元) 转移到一个钱包, 随后又进行了多次交易, 包括向加密货币交易所 Bitbank 发送 1,545 个比特币 (8500万美元)。</p><p>今天比特币价格一度跌破 54,000 美元, 目前交易价格为 54,270 美元, 24 小时内下跌 6.48%。加密货币市场整体也出现了超过 6.65 亿美元的日常清算。</p>',
      url: 'https://tokeninsight.com/zh/news/mt-gox-creditors-may-have-to-wait-for-up-to-three-months-to-receive-their-bitcoin?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/86755jhk.jpeg',
      source_url:
        'https://www.theblock.co/post/303624/mt-gox-creditors-may-have-to-wait-for-up-to-three-months-to-receive-their-bitcoin',
      timestamp: 1720173309000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '比特币下跌，1亿美元比特币被清算:ETF投资者会恐慌性抛售吗?',
      content:
        '<p>据 Cointelegraph 报道：尽管比特币跌破了 ETF 买家的实现价格, 但 ETF 持有者并没有恐慌性抛售, 但深度调整仍在眼前。</p><p>在过去 24 小时内, 价值超过 1 亿美元的杠杆头寸被清算, 引发了比特币可能回落至 5 万美元关口的担忧。</p><p>根据 CoinGlass 数据, 比特币清算达到 1.004 亿美元, 其中价值 8600 万美元的累计多头头寸被清算。</p><p>这些清算是由连续 3 天的负面价格走势引发的, 使比特币价格从 7 月 2 日的 6.2 万美元跌至 7 月 4 日凌晨 9:22 的 5.7043 万美元。</p><p>比特币随后反弹至上午 9:40 的 5.78 万美元以上, 但仍较此前下跌 4.5%。</p><p>密切关注比特币在 6 万美元等心理关口的表现对于判断当前比特币周期的进程很重要, 这是因为首只现货比特币交易所交易基金 (ETF) 的推出。</p><h2>比特币跌破 ETF 买家的实现价格, 但 ETF 尚未恐慌性抛售。</h2><p>另一个重要进展是, 比特币跌破了现货比特币 ETF 买家的平均实现买入价, 即 5.7979 万美元, 这被视为比特币分析师的一个重要支撑位。</p><p>尽管出现下跌,但ETF买家尚未开始恐慌性抛售, 7 月 3 日净总流出仅 2050 万美元, 其中 Grayscale 的 ETF 占大部分, 为 2700 万美元。</p><p>但在美国独立日假期结束后, 投资者可能会出现 ETF 的恐慌性抛售。</p><p>预计在 7 月初的 MtGox 赔付款也可能给比特币带来额外的抛售压力。MtGox 债权人赔付将向 1.27 万名等待超过 10 年才能收回资金的债权人分发价值 94 亿美元的比特币。</p><h2>比特币调整还是暂时"震荡"?</h2><p>经过 3 天的价格下跌, 比特币首次在 10 个月内失去了 200 天趋势线。</p><p>这意味着突破可能会进一步推迟, 直到比特币打破 6 月初开始的下行趋势, 据知名加密货币分析师 Rekt Capital 在 7 月 3 日的 X 文章中写道:</p><p>"由于未能重新测试 6 月下跌趋势作为新的支撑, 突破被推迟。不过, 这仍然是未来趋势转变的关键趋势线。"</p><p>然而, 一些交易者分析的技术图表模式表明, 这可能只是一次价格"震荡" - 由多个投资者退出头寸引起的突然价格下跌, 然后是价格的突然恢复。</p><p>根据知名比特币投资者 Elja Boom 在 7 月 4 日 X 文章中的评论, 比特币或会出现"震荡"。</p><p>但 10x Research 的分析师警告, 由于抛售订单的加速, 比特币仍可能重回 5 万美元的水平。</p>',
      url: 'https://tokeninsight.com/zh/news/100m-bitcoin-liquidated-as-btc-drops-will-etf-investors-panic-sell?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/23566472.jpeg',
      source_url:
        'https://cointelegraph.com/news/over-100m-btc-liquidated-bitcoin-fell-57k-etf-panic-selling?_gl=1%2a9nwg7u%2a_ga%2aMTQyOTE4MjY0Ni4xNzE4NjE0MzUz%2a_ga_53R24TEEB1%2aMTcyMDE3MTA1Ny4xNy4xLjE3MjAxNzEzMjMuNjAuMC4yMTI1NzIzMzk1',
      timestamp: 1720172385000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title:
        'EigenLayer 的竞争对手 Symbiotic 在不到一个月的时间里就突破了 10 亿美元的存款',
      content:
        '<p>据 The Block 报道, 重新质押协议 Symbiotic 的存款已超过 10 亿美元。</p><p>该协议昨天达到了其 210,600 枚包装的 stETH (包装的以太坊 Lido 质押衍生品) 的存款上限。</p><p>Symbiotic 允许用户存入资金来保护第三方协议, 与 EigenLayer 产生竞争。</p><p>重新质押协议 Symbiotic 的总锁定价值已经突破了 10 亿美元。</p><p>该项目表示, 它在昨天的 4 个小时内达到了价值约 8 亿美元的 210,600 枚包装的 stETH 的存款限额。根据 DeFiLlama 的数据, 这一增长使用户存款在不到一个月的时间内超过了 10.4 亿美元。</p><p>Symbiotic 允许用户存入资金来支持第三方协议, 采用共享安全模型, 将自己定位为以太坊首个重新质押协议 EigenLayer 的竞争对手。Symbiotic 目前正处于引导启动阶段, 包括整合重新质押的抵押品。</p><p>与 EigenLayer 一样, Symbiotic 旨在通过重新分配现有的质押资本和基础设施来解决网络安全挑战。</p><p>它与 EigenLayer 的不同之处在于, 它支持各种 ERC-20 代币, 而不仅仅是 ETH 和特定衍生品。该协议还具有可定制的模块化设计, 可容纳任何组合的代币作为重新质押的抵押品。</p><p>Symbiotic 最近从 Paradigm 和 cyber.Fund 筹集了 580 万美元的资金, 以推进其发展。一个名为 Mellow 的 Symbiotic 的流动性重新质押平台也已推出。</p><p>目前, EigenLayer 在重新质押细分市场中遥遥领先。根据 The Block 的数据仪表板, 它的总锁定价值约为 170 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/eigenlayer-competitor-symbiotic-crosses-1-billion-in-deposits-in-under-a-month?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/2451255.jpeg',
      source_url:
        'https://www.theblock.co/post/303500/eigenlayer-competitor-symbiotic-crosses-1-billion-in-deposits-in-under-a-month',
      timestamp: 1720088511000,
      tags: [
        {
          name: '质押',
        },
      ],
    },
    {
      title: '比特币在 Coinbase 上跌破 5.8 万美元，这是两个月来的第一次',
      content:
        '<p>据 Cointelegraph 报道：在加密货币市场出现更广泛抛售的情况下, 比特币价格短暂跌至 57,874美元, 同时过去 24 小时内有 5490 万美元的比特币多头头寸被清算。</p><p>7 月 4 日, 比特币价格在 Coinbase 交易所一度跌至低至 57,874 美元, 这是该资产两个多月来首次跌破 58,000 美元大关。</p><p>目前, 比特币价格已经稳定在 58,964 美元附近, 但相比一周前仍下跌 3.4%, 这是根据 TradingView 的数据。</p><p>比特币的下滑来自于数百万美元的加杠杆多头头寸被清算, 打击了投资者对比特币价格上涨的希望。</p><p>根据 CoinGlass 的数据, 过去 24 小时内有超过 5490 万美元的比特币多头头寸被清算。</p><p>同样地, 投资者希望在 7 月中旬推出现货以太坊 ETF 之前获得以太坊多头头寸, 但他们的头寸也被清算掉。</p><p>过去 24 小时内, 总计有 5790 万美元的以太坊多头头寸被清算。</p><p>此次比特币价格更广泛回落的主要原因被归咎于已停止运营的日本加密货币交易所 Mt.Gox, 该交易所计划从 7 月初开始向其债权人偿还价值约 85 亿美元的比特币。</p><p>然而, 一些分析师认为, 这些偿付可能不会对比特币造成如此严重的影响。</p><p>其他主要加密货币和山寨币在比特币急跌至 5.8 万美元以下时也出现了大幅下跌。撰稿时, 以太坊下跌 4.5%, 在 7 月 4 日凌晨 2 点曾一度跌至 3,145 美元。</p><p>BNB 下跌 6%, 从 573 美元跌至 539 美元。</p><p>索拉纳也抹去了最近的大部分涨幅,过去 24 小时内下跌 10.3%, 从每周高点 154 美元跌至 136 美元。</p><p>与此同时, 在过去两天社交媒体上, "买跌"的讨论量大幅攀升, 在 Reddit、X 和 4Chan 等平台上, 该词的使用量在同一时间框内翻了一倍。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-falls-below-58k-on-coinbase-first-time-in-2-months?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/435453.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-price-falls-below-58k-first-time-two-months',
      timestamp: 1720087035000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '富达，Sygnum 与 Chainlink 合作，将NAV数据带到链上',
      content:
        '<p>据 The Block 报道, 该合作旨在为代币化资产的资产净值数据带来透明度和易访问性。</p><p>Chainlink 最近完成了与 Depository Trust and Clearing Corporation 的试点项目。</p><p>分散式计算平台 Chainlink 今天宣布与富达国际和加密银行 Sygnum 合作, 推出一个专注于将资产净值数据引入链上的项目。</p><p>根据周三发布的声明, 该合作旨在为代币化资产的资产净值数据提供透明度和易访问性, 特别是 Sygnum 最近发行的价值 5000 万美元的 Matter Labs 财政储备代币在富达 90 亿美元机构流动性基金中的链上表示。</p><p>Chainlink 表示, 其技术可以确保这些代币的资产净值数据在 ZKsync 区块链上得到安全存储和自动同步, ZKsync 是 Chainlink SCALE 计划的一员。</p><p>新闻稿说:"借助 Chainlink, 资产净值数据可以以自动和安全的方式准确报告和同步到链上, 为 Sygnum、其客户以及更广泛的市场参与者提供实时透明度和内置的历史数据访问能力。"</p><p>Chainlink 补充说, 它的跨链方法有助于将数据安全地分发到各种区块链网络或链下系统。</p><p>Chainlink 联合创始人 Sergey Nazarov 表示:"基金代币化可能是当今最大的数字资产趋势, 这也证明了全球资产管理公司正进入这个不断增长的市场。代币化基金的全球覆盖范围和效率优势远远超过传统方法, 并将在未来成为整个资产管理行业的运营方式。"</p><p>5 月, Depository Trust and Clearing Corporation和Chainlink完成了名为Smart NAV的试点项目,参与方包括BNY Mellon、JPMorgan 和 Invesco。Smart NAV 探讨了在多个区块链上标准化分发资产净值数据的方法。</p>',
      url: 'https://tokeninsight.com/zh/news/fidelity-sygnum-partner-with-chainlink-to-bring-nav-data-onchain?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/23455236.jpeg',
      source_url:
        'https://www.theblock.co/post/303274/fidelity-sygnum-partners-with-chainlink',
      timestamp: 1720000272000,
      tags: [
        {
          name: 'zkSync Era',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 昨日恢复净流出',
      content:
        '<p>据 The Block 报道, 美国现货比特币 ETF 昨日出现净流出 1362 万美元。</p><p>Grayscale 的 GBTC 出现了 3238 万美元的净流出。</p><p>11 只美国现货比特币交易所交易基金周二录得总计 1362 万美元的净流出, 在连续 5 个交易日的净流入后再次转为负值。</p><p>Grayscale 的 GBTC 出现了 3238 万美元的净流出, 其次是 Bitwise 的 BITB, 出现了 676 万美元的流出, 根据 SosoValue 的数据。</p><p>另一方面, 贝莱德的 IBIT 录得 1412 万美元的流入, 富达的 FBTC 录得 542 万美元的流入。VanEck 的比特币基金录得 351 万美元的流入, 而 Ark Invest 和 21Shares 的 ARKB 则录得 248 万美元的净流入。</p><p>这 11 只比特币基金周二的交易量不到 10 亿美元, 显著低于 3 月份达到 80-100 亿美元的高点。自 1 月份推出以来, 这些 ETF 已累计净流入 146.4 亿美元。</p><p>与此同时,比特币价格在过去 24 小时内下跌 3.51%, 报 60,876 美元, 根据 The Block 的比特币价格页面。</p><p>尽管在周二的一份标准 chartered 报告中预测, 该加密货币可能在 8 月创出新高, 并在 11 月美国总统选举前上涨至 10 万美元, 但价格还是出现了下跌。</p><p>然而, 在一种 "最不可能" 的情况下, 即现任总统乔·拜登退出选举竞争, 标准银行预测, 比特币价格可能会进一步下跌到 5 万美元到 5.5 万美元的范围。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-returned-to-net-outflows-yesterday?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/77656.jpeg',
      source_url:
        'https://www.theblock.co/post/303271/us-spot-bitcoin-etfs-experience-outflows',
      timestamp: 1719998036000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '灰度基金',
        },
      ],
    },
    {
      title: '根据欧盟新的 MiCA 加密规则，Circle 获得了第一个稳定币许可证',
      content:
        '<p>据 Coindesk 报道：Circle Mint France 将在遵守 MiCA 的前提下, 在欧盟发行以欧元计价的 EURC 稳定币和 USDC。</p><p>Circle 声称自己是首个符合 MiCA 规定的全球稳定币发行商。</p><p>在 6 月 30 日 MiCA 规则生效前, 一些交易所已经将以欧元计价的稳定币, 如泰瑟的 EURT, 从交易中移除。</p><p>Circle 成为首家获得电子货币机构 (EMI) 牌照的全球稳定币发行商, 这是在欧盟 (EU)《加密资产市场(MiCA)》监管框架下提供以美元和欧元挂钩的加密货币代币的先决条件。</p><p>这份牌照使得该公司在 27 个成员国 4.5 亿人的交易群体中占据有利地位, 这对于其规模仍次于行业龙头泰瑟的 USDC 来说是一个重要优势。</p><p>稳定币是数字资产市场重要的基础设施, 促进了交易所的交易, 并越来越多地用于支付和汇款。Circle 旗下 320 亿美元的 USDC 是第二大稳定币, 与市场领导者泰瑟 1100 亿美元的 USDT 相比, 差距一直在扩大。</p><p>凭借来自法国银行监管机构的牌照, Circle Mint France 将把其以欧元计价的 EURC 稳定币的发行 "本土化" 到欧盟, 并从同一实体发行 USDC。在 6 月 30 日 MiCA 稳定币规则生效前, 一些加密交易所已经将以欧元计价的稳定币从交易中移除, 如泰瑟的 EURT。</p><p>MiCA 对稳定币的全面监管, 是由于像 Meta 的 Diem (前身为Libra) 这样的科技巨头进入金融市场的担忧引发的。这推动了欧洲过去五年的政策制定工作, 正如 Circle 政策负责人 Dante Disparte (曾参与过 Libra 项目)所说。</p><p>Disparte 表示:"就个人而言,我对 MiCA 有一种半亲子关系的感觉, 因为在某种程度上它是由我之前的生活和 Libra Diem 项目加速推动的。MiCA 不仅彰显了这个行业的存在和持久性, 但也很清楚, 在世界第三大经济体内, 已经没有任何捷径可走了。那些在监管避风港或阴影中运营, 然后期望能自由进入消费者和市场参与者的日子已经一去不复返了。"</p>',
      url: 'https://tokeninsight.com/zh/news/circle-snags-first-stablecoin-license-under-eu-s-new-mica-crypto-rules?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/2341.jpeg',
      source_url:
        'https://www.coindesk.com/business/2024/07/01/stablecoin-issuer-circle-snags-mica-compliant-emi-license-for-europe/',
      timestamp: 1719914981000,
      tags: [
        {
          name: 'Circle',
        },
        {
          name: '稳定币',
        },
        {
          name: 'USDT',
        },
      ],
    },
    {
      title: '美国现货比特币etf报告净流入1.3亿美元，是三周来最大的流入',
      content:
        '<p>据 The Block 报道：美国现货比特币 ETF 在周一录得总计 1.2945 亿美元的总净流入, 这是连续第五个交易日录得正流入。周一的净流入也标志着这些 ETF 自 6 月 7 日以来最大的资金流入。</p><p>Fidelity 的 FBTC 引领了昨日的流入, 净流入 6500万 美元, 其次是 Bitwise 的 BITB, 录得 4100 万美元的净流入。 Ark Invest 和 21Shares 的 ARKB 报告净流入 1300 万美元。Invesco 和Galaxy Digital、VanEck 和富兰克林邓普顿的基金则录得约 500 万美元或更低的相对较小的净流入。</p><p>资产规模最大的两只比特币 ETF - BlackRock 的 IBIT 和 Grayscale 的 GBTC - 在周一没有录得任何流入。</p><p>这 11 只比特币基金在周一的交易量约为 13.6 亿美元。自 1 月份推出以来, 它们已累计净流入 14.65 亿美元。</p><p>与此同时, 比特币价格在过去 24 小时内下跌 0.3%, 报 63,094 美元。尽管从上周低于 6 万美元的水平有所回升, 但仍低于 6 月初 7 万 1000 美元的价位。</p><p>QCP Capital 分析师表示, 由于历史上观察到的正向季节性, 比特币和以太坊在 7 月份往往表现更好。Coinbase 分析师也指出了 7 月份的正向季节性趋势。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-report-130-million-in-net-inflows-largest-influx-in-three-weeks?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/1243.jpeg',
      source_url:
        'https://www.theblock.co/post/303045/us-spot-bitcoin-etfs-report-130-million-in-net-inflows',
      timestamp: 1719913202000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'TokenPost 点燃"加密热潮"全球 Web3巡回路演 "IXO™ 2024: 拥抱未来"',
      content:
        '<p>韩国顶尖区块链媒体 TokenPost 即将启动其全球 Web3巡回路演第二阶段"IXO™ 2024: 拥抱未来"。</p><p>活动定于7月9日和10日,上午10点至下午6点,在 Boutique Monaco 举办。由 TokenPost、Mask Network 和 TON 联合主办, Chris &amp; Partners 和 WikiTree 作为联合组织方。</p><p>"IXO™ 2024: 拥抱未来"是一场线下活动,旨在实现"IXO"概念,这是一种面向社区的 Web3募资模式。该路演旨在向公众介绍 Web3技术和项目,推动大规模采用。</p><p>活动将为全球项目、交易所、关键意见领袖(KOL)和 Web3爱好者提供合作和交流的机会,培育健康的行业生态。</p><p>之前于4月举办的"IXO™ 2024终极 Web3路演"吸引了超过40家展示公司参与,两天内吸引了1,300多名与会者,标志着看涨市场趋势的开始。</p><p>"IXO™ 2024"将包括现场展位、项目路演、空投活动和 VIP 派对等多个触点。这个平台将让行业参与者和社区进行互动,分享想法和经验,探索新的商业和合作机会。</p><p>随着宏观经济改善和对以太坊现货 ETF 的期待,"IXO™ 2024: 拥抱未来"有望巩固其在生态系统中的关键地位。</p>',
      url: 'https://tokeninsight.com/zh/news/tokenpost-heats-up-crypto-fever-with-global-web3-roadshow-ixo-2024-embrace-the-future?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/ixo.png',
      source_url: '',
      timestamp: 1719885729000,
      tags: [
        {
          name: '事件',
        },
      ],
    },
    {
      title: '德国政府向交易所额外转移价值 9400 万美元的比特币',
      content:
        '<p>据The Block报道：美国和德国政府都在今天进行了大量的加密货币交易, 这与上周类似的举措保持一致。</p><p>最近几周的交易被广泛解读为这两国政府有意出售其加密资产的信号。</p><p>根据区块链分析公司 Arkham 的数据显示, 德国和美国政府今天似乎又移动了更多的比特币和以太币, 进一步表明它们有意出售这些资产。</p><p>德国政府将总计 1,500 个比特币 (价值 9,400 万美元) 转移到Coinbase、Kraken 和 Bitstamp 等几个地址。数据显示, 德国当局分两次交易分别将 600 个 BTC 和 500 个 BTC 转移到一个未知地址, 并将 200 个 BTC 转移到 Bitstamp 的一个地址、 100 个 BTC 转移到 Coinbase 地址、100 个 BTC 转移到Kraken 地址。</p><p>Arkham 的数据还显示, 标记为美国政府所有的钱包今天将 3,375 个以太币 (约合 1,175 万美元) 从一个持有从爱沙尼亚企业家 Sergei Potapenko 和 Ivan Turõgin 那里没收的资产的地址转移到一个未知地址。</p><p>这些最新的加密货币交易发生在美国和德国政府上周进行类似交易之后。</p><p>目前, 据认为与美国政府相关的钱包持有约 213,534 个比特币 (价值 134.2 亿美元) 和约 50,524 个以太币 (价值约 1.759 亿美元) 等其他加密资产, 而德国政府目前持有 44,692 个比特币(价值约 28.1 亿美元)。</p><p>这两个国家是已知最大的比特币国家持有者, 美国排名第一, 其次是中国、英国、德国和乌克兰。</p><p>在本文发表时,比特币价格在过去 24 小时内上涨 2.19% 至约 62,789 美元, 而以太币价格上涨 2.71% 至 3,479 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/german-government-moves-additional-94-million-worth-of-bitcoin-to-exchanges?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/123群345.jpeg',
      source_url:
        'https://www.theblock.co/post/302749/german-government-moves-additional-94-million-worth-of-bitcoin-to-exchanges',
      timestamp: 1719830675000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '加密货币下滑，NFT 销售额下降 44%',
      content:
        '<p>据 Cointelegraph 报道：尽管大盘下跌，但一些以 PolitiFi 和动物为主题的纪念币在第二季度继续飙升，NFT 也是其中的一部分。</p><p>阿波罗加密公司（Apollo Crypto）的投资总监表示，最近名人、政治和动物主题的纪念币大量涌现，再加上加密市场的低迷，可能是导致第二季度不可兑换代币（NFT）销售额下降 44% 的原因之一。</p><p>CryptoSlam 的数据显示，NFT 的销售额从第一季度的 41.4 亿美元下降到第二季度的 23.2 亿美元，这也是整个市场下滑的一部分。</p><p>"Apollo Crypto 的首席投资官 Henrik Andersson 告诉 Cointelegraph："第二季度是一个困难的市场，比特币下跌了 15%，许多另类币的表现也比这差得多。<img src="https://s2.tokeninsight.com/static/news/content/img/06653611-2b71-446d-b2fb-731577c15d4e.webp"></p><p><br>"[但是]纪念币很可能也从NFT[s]那里夺走了一些心智份额"，Andersson补充道。</p><p>心智份额是一个营销术语，指围绕特定产品或理念的消费者认知度或受欢迎程度。</p><p>CoinGecko的数据显示，虽然NFT的销售已经放缓，但Memecoins的交易量仍然很大，仅在过去24小时内就达到了34亿美元。</p><p>这在很大程度上是由与美国总统大选相关的 PolitiFi Memecoins 的兴起引发的，同时以太坊和 Solana 上也出现了一些新的名人代币。</p><p>MAGA（特朗普）和Pepe（佩佩）是第二季度价格上涨的memecoins之一。</p><h3>铭文将占据更多市场份额</h3><p><br>安德森指出，在未来几个月里，基于比特币的Ordinals的发展也可能会使人们不再关注传统的NFT。</p><p>"从长远来看，我们认为比特币订单将继续占据NFT领域的市场份额，尤其是考虑到市场上即将出现许多比特币L2订单。"<br>然而，最近几周Ordinals和Runes的网络活动也有所下降。</p><p>Runes的交易量从6月份的最高点下降了88%，而在过去一周里，Ordinals的铭文和Runes每天贡献的矿工费都不到2比特币</p><h3><br>NFT 曾经反弹</h3><p><br>2023 年最后一个季度，NFT 小幅反弹，销售额超过 30 亿美元，这可能预示着 2024 年下半年 NFT 有希望重新崛起。</p><p>其中包括 2023 年 12 月 17.7 亿美元的销售额，这是自 2022 年 6 月夏季 NFT 开始减少以来的最大销售额。</p><p>CoinGecko 的数据显示，CryptoPunks 和 Bored Ape Yacht Clubs 等顶级 NFT 收藏品仍然拥有庞大的市值，分别为 9.949 亿美元和 3.459 亿美元</p><p>相比之下，两个最大的Ordinals项目NodeMonkes和Bitcoin Puppets的市值分别为1.211亿美元和9420万美元。</p>',
      url: 'https://tokeninsight.com/zh/news/nft-sales-fell-44-as-crypto-dipped-memecoins-steal-mind-share-in-q2?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/988.jpeg',
      source_url:
        'https://cointelegraph.com/news/nft-sales-plummet-44-percent-memecoins-steal-mind-share?_gl=1%2a1t484yb%2a_ga%2aMTQyOTE4MjY0Ni4xNzE4NjE0MzUz%2a_ga_53R24TEEB1%2aMTcxOTgyNzkwMy4xMy4xLjE3MTk4MjkwMDcuMTUuMC40NTIyNTIwNzk.',
      timestamp: 1719829711000,
      tags: [
        {
          name: 'NFT',
        },
        {
          name: 'NFT MarketPlace',
        },
      ],
    },
    {
      title: '美国政府向 Coinbase 交易所发送 3940 枚比特币',
      content:
        '<p>据 Cointelegraph 报道：阿卡姆情报局的数据显示，比特币是在 2024 年 1 月的审判中从被定罪的毒贩班米特-辛格（Banmeet Singh）身上缴获的。</p><p>来自Arkham Intelligence的链上数据显示，美国政府于2024年6月26日向Coinbase Prime钱包发送了3940个比特币。</p><p>据Arkham Intelligence称，这笔交易发生在UTC时间17:00:41，涉及今年早些时候从被定罪的毒贩班米特-辛格（Banmeet Singh）那里缴获的比特币。</p><h2><strong>班米特-辛格案</strong></h2><p>2019 年，辛格在伦敦被英国当局以贩毒罪名逮捕，最终于 2023 年被引渡到美国。</p><p>美国司法部<a rel="noopener noreferrer nofollow" target="_blank" href="http://www.justice.gov/usao-sdoh/pr/defendant-pleads-guilty-dark-web-narcotics-case-involving-largest-cryptocurrency">声称</a>，从 2012 年到 2017 年，辛格经营着一个毒品走私网络，其中包括马里兰州、纽约州、北达科他州、华盛顿州、俄亥俄州、北卡罗来纳州和佛罗里达州的分销商。</p><p>作为对其判决的一部分，辛格被迫向美国当局交出了 8,100 多个比特币，当时价值约 1.5 亿美元，美国缉毒署（DEA）称这是该机构有史以来查获的最大一笔加密货币。</p><p>辛格还在 2024 年 4 月被判处 5 年监禁，但因服刑时间长而被记功，据说已被美国当局释放。据《哥伦布快报》（The Columbus Dispatch）报道，辛格在获释后计划直接<a rel="noopener noreferrer nofollow" target="_blank" href="http://www.dispatch.com/story/news/courts/2024/04/20/banmeet-singh-international-drug-lord-columbus-ohio-bitcoin-crypto/73385629007/">返回</a>印度家乡。</p><h3><strong>对政府抛售的普遍担忧&nbsp;</strong></h3><p>最近几周，市场参与者普遍担心<a rel="noopener noreferrer nofollow" target="_blank" href="http://cointelegraph.com/news/german-gov-sells-900-bitcoin-400-btc-coinbase-kraken">政府抛售</a>会影响比特币市场，因为有报道称德国政府正在抛售其比特币，截至本文撰写之时，比特币价值约为27.6亿美元。</p><p>最近的一次交易发生在2024年6月26日09:27:57UTC，345个比特币被发送到一个名为 "Flow Traders "的钱包中。</p><p>美国政府也持有大量通过扣押和资产没收获得的比特币。来自 Arkham 的数据显示，截至本文撰写之时，美国政府目前拥有大约 21.4 万个比特币，价值 130 亿美元，这使得美国政府成为 Arkham Intel 数据库中最大的去中心化货币国家持有者。</p><p>Mt.Gox破产财产带来的抛售压力也加剧了投资者对比特币价格下跌的担忧，因为前交易所开始卸载14万个比特币，以偿还2014年臭名昭著的Mt.Gox倒闭事件中的受害方。然而，交易所余额处于 6 年来的最低点，对这些抛售压力起到了稳定价格的作用。</p>',
      url: 'https://tokeninsight.com/zh/news/us-gov-t-sends-3-940-bitcoin-to-coinbase-exchange?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/1234.001.jpeg',
      source_url:
        'https://cointelegraph.com/news/u-s-government-sends-3-940-bitcoin-coinbase-exchange?_gl=1%2ax8bemd%2a_ga%2aMTQyOTE4MjY0Ni4xNzE4NjE0MzUz%2a_ga_53R24TEEB1%2aMTcxOTQ4MDQ0Ny4xMi4xLjE3MTk0ODEwMDguMzAuMC4yMDU5NTUxOQ..',
      timestamp: 1719481191000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '政策与监管',
        },
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: '韩国虚拟资产法法令规定即将执行',
      content:
        '<p>据 Cointelegraph 报道：该法案于 7 月 19 日生效，但其中并未包含执行《虚拟资产用户保护法》的细节。</p><p>韩国政府批准了一项关于执行《虚拟资产用户保护法》（PVAU）的法令。这两部法律将于 7 月 19 日同时生效。</p><p>执行令规定了金融服务委员会（FSC）为确保《虚拟资产用户保护法》的有效性而将<a rel="noopener noreferrer nofollow" target="_blank" href="http://www.fsc.go.kr/eng/pr010101/82534?srchCtgry=&amp;curPage=&amp;srchKey=&amp;srchText=&amp;srchBeginDt=&amp;srchEndDt=#:~:text=The%20Act%20mandates%20virtual%20asset,nonpublic%20information%20and%20price%20manipulation.">采用的方法和程</a>序。它们有时是积极的步骤，有时是对根据《虚拟资产保护法》执行的程序进行监督。</p><h2><strong>没有执行就没有虚拟资产用户保护</strong></h2><p>金融服务委员会将组织一个由政府官员和私营部门专家组成的委员会，制定有关虚拟资产的政策，这些虚拟资产受《虚拟资产保护法》以外的法律监管，或 "被认为不会对用户造成伤害"。</p><p>金融服务委员会将指定有资格管理客户向虚拟资产服务提供商（VASP）存款的可信金融机构。客户资金必须与虚拟资产服务提供商的资金分开，并根据与虚拟资产服务提供商的协议投资于 "无风险 "资产，以产生收益。如果 VASP 被撤销注册或破产，银行必须将客户的资金直接返还给客户。</p><p>金融服务委员会将确定必须存储在冷钱包中的 VASP 客户数字资产的比例。该比例将不低于 80%。在特定情况下，VASP 可以限制存款和取款。有报告异常交易活动的规则，最高可判处终身监禁，还有确定公开信息和非公开信息的复杂规则。</p><h3><strong>虚拟资产监管需要组织</strong></h3><p>去年，韩国明显加强了与加密货币相关的执法行动。VPAU 于 2023 年 7 月通过成为法律，因缺乏监管框架而受到多方面批评。<img src="https://s2.tokeninsight.com/static/news/content/img/e8abf0ba-4e8d-462b-a55a-9c94804bac67.webp"></p><p>比特币（BTC）交易所交易基金（ETF）在美国的推出导致了韩国对该资产产品的争议。金融服务委员会（FSC）敦促当地经纪商避免购买美国基金，但总统办公室却表示反对这一政策。新政府的领导党也向金融服务委员会施压，要求其改变对 BTC ETF 的立场。</p><p>执行令将于 7 月初颁布--正式宣布。</p>',
      url: 'https://tokeninsight.com/zh/news/enforcement-of-south-korean-virtual-assets-law-prescribed-in-decree?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/123234.001.jpeg',
      source_url:
        'https://cointelegraph.com/news/south-korea-virtual-asset-protection-laws-july-19',
      timestamp: 1719480769000,
      tags: [
        {
          name: '政策与监管',
        },
        {
          name: 'NFT',
        },
      ],
    },
    {
      title: 'TON 区块链上的 USDT 稳定币供应量突破 5 亿',
      content:
        '<p>据 The Block 报道：在 TWO 网络推出两个月后, USDT 稳定币的供应已超过 5 亿枚。</p><p>这个由 Telegram 支持的区块链网络最近因内置迷你游戏而大受欢迎。</p><p>据 The Block 的 USDT 供给仪表板显示, 截至周二, TON 网络上共有 5.19 亿 28 万枚 USDT 稳定币。</p><p>这是在泰达公司在 TWO 网络上推出美元支持的 USDT 稳定币和黄金支持的 XAUT 稳定币后的大约两个月内发生的。</p><p>TON 网络官方通过其电报频道宣布:"USDT - TON 的需求正在飙升, 这并不令人惊讶。能够像发短信一样轻松地向任何人发送数字美元, 这是一个切实可行的使用案例, 使 USDT - TON 脱颖而出。"</p><p>本月初, TON 区块链的总锁定价值超过 6 亿美元, 是三周前的两倍。根据 DefiLlama 的数据, TON 目前持有超过 6.7 亿美元。</p><p>随着 Telegram (据报有 9 亿多用户) 选择 TON 作为其 Web3 集成的首选解决方案, 该网络今年已经获得了青睐。</p><p>TON 网络活跃度的激增也可归因于 Telegram 上加密货币迷你游戏的流行, 如 Dotcoin、Catizen 和 Hamster Kombat 等, 这些游戏采用简单的机制让用户可以赢得游戏内货币, 甚至有可能获得真实的代币空投。</p><p>TON 区块链的本地加密货币 Toncoin 已成为全球第 9 大加密货币, 市值达 185 亿美元。根据 The Block 的 Toncoin 价格页面, 目前交易价格为 7.54 美元。</p>',
      url: 'https://tokeninsight.com/zh/news/usdt-stablecoin-supply-on-ton-blockchain-crosses-500-million?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/131.jpeg',
      source_url:
        'https://www.theblock.co/post/301957/usdt-ton-blockchain-crosses-500-million',
      timestamp: 1719398460000,
      tags: [
        {
          name: 'USDT',
        },
        {
          name: '游戏',
        },
        {
          name: '稳定币',
        },
      ],
    },
    {
      title: '美国现货比特币 etf 在连续流出后净流入 3100 万美元',
      content:
        '<p>据 The Block 报道：美国比特币现货 ETF 在周二录得3100 万美元的净资金流入,扭转了此前连续 7 天的资金流出局面。</p><p>美国比特币现货交易所交易基金 (etf) 周二恢复净流入，共吸引资金 3,100 万美元。此前，这 11 只比特币基金连续 7 个交易日出现净流出。</p><p>其中,富达旗下的 FBTC 基金领涨, 录得 4900 万美元的净流入。Bitwise 的 BITB 基金也录得 1500 万美元的净流入。VanEck 的 HODL 基金则录得 400 万美元的净流入。</p><p>相反, Grayscale 的 GBTC 基金录得 3030 万美元的净流出。Ark Invest 和 21Shares 的 ARKB 基金也录得 600 万美元的净流出。</p><p>截至目前, 这 11 只比特币现货 ETF 累计录得 14.42 亿美元的净流入。</p><p>与此同时, 美国发行商正在努力推出莱特币现货 ETF, &nbsp;在 SEC 上月给予软性批准后, 相关公司上周提交了经修订的S-1登记报告。分析师预计, 莱特币现货 ETF 将于下周内推出。</p><p>Bitwise 首席信息官表示, 预计莱特币现货ETF在推出后 18 个月内可能会累计吸引 150 亿美元的资金流入。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-score-31-million-in-net-inflows-after-outflow-streak?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/134.jpeg',
      source_url:
        'https://www.theblock.co/post/301925/us-spot-bitcoin-etf-31-million-net-inflows',
      timestamp: 1719397617000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Blast 将创建一个基金会帮助协议治理',
      content:
        '<p>据 The Block 报道，由颠覆性 NFT 市场 Blur 的创始人创建的以太坊第 2 层网络 Blast 在周一表示，它正在创建一个基金会来帮助管理该协议。</p><p>根据该帖子，“到目前为止，此帐户和网站由 Blast 开发公司 Arcade Research 管理”。“作为向去中心化治理结构过渡的一部分，此 Twitter、网站和 Blast 协议的治理正在过渡到基金会控制。”</p><p>Blast 表示，该基金会“旨在支持社区实现 Blast Vision，该愿景将于 6 月 26 日公开分享”。</p><p>Blast 代币将分为不同的类别，但具体分类仍不清楚。根据周日发布在 X 上的 Blast 代币分类，按其划分为不同的钱包地址，可能会有四到五类。</p><p>该帖子推测，也许 Blur 农民会收到代币。</p><p>根据一份说明，Blast 项目已宣布有意通过 Blast Gold 将一半的空投分配给开发者，而另一半将通过 Blast Points 根据他们的钱包和 dapp 余额分配给早期用户。</p><p>该项目表示，“50% 的 Blast 空投分配给了 Blast Points”，并补充说，用户的钱包将根据其余额自动为每个区块赚取积分。对于 dapp，Blast Gold 旨在激励额外的 dapp 增长。“这意味着 Dapp 应该将其赚取的任何黄金的 100% 给予其用户”，该项目表示。</p>',
      url: 'https://tokeninsight.com/zh/news/blast-to-create-a-foundation-to-help-protocol-governance?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/blast.png',
      source_url:
        'https://www.theblock.co/post/301596/blast-announces-foundation-for-protocol-governance-ahead-of-airdrop',
      timestamp: 1719316600000,
      tags: [
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: '交易员称 Mt. Gox 的抛售担忧被过分夸大',
      content:
        '<p>据 CoinDesk 报道,加密货币交易员表示,Mt. Gox 宣布的新赎款可能造成的抛售压力要远低于市场观察者的担忧,这缓解了人们对即将到来的大规模抛售的担心。</p><p>Swan 比特币高级分析师 Sam Callahan 在周二发给 CoinDesk 的一封电子邮件中说:"Mt. Gox 分配比特币对比特币价格的影响可能被夸大了。那些想要抛售比特币的债权人现在已经有超过10年的时间通过出售破产索赔权来实现这一目标,转让给更坚定的长期投资者。"</p><p>"此外,大多数债权人可能会持有他们的比特币,因为他们的成本基础低于每枚700美元,"他补充说。</p><p>Galaxy Research 在周一的一份报告中表示,在141,000个 BTC 被标记用于分配的总量中,65,000 BTC将交付给个人债权人,另外30,000 BTC将交付给索赔基金和单独的破产程序。</p><p>"可以合理地假设,大多数被收购债权的基金收到的 BTC 将以实物形式分配给有限合伙人,而不会被抛售,"该公司表示,从而缓解了人们的担忧。</p><p>这家已经倒闭的加密货币交易所的受托人表示,他们正准备在7月第一周分发2014年黑客攻击中被盗的比特币(BTC)。</p><p>将要分发的确切比特币数量尚未公开,但该交易所在5月将来自多个冷钱包的140,000个BTC(约价值90亿美元)整合到一个单一地址。</p><p>预期即将到来的抛售压力导致比特币在周一暴跌4%以上,曾一度跌破6万美元,这是5月初以来的首次。</p>',
      url: 'https://tokeninsight.com/zh/news/mt.-gox-redemption-fears-overblown-say-traders?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/gox.png',
      source_url:
        'https://www.coindesk.com/markets/2024/06/25/mt-gox-redemption-fears-overblown-say-traders-as-10b-btc-holdings-draw-concerns/',
      timestamp: 1719316007000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '比特币在 whale 交易量下降 42% 后跌破 6.3 万美元',
      content:
        '<p>根据 Cointelegraph 报道：比特币价值 10 万美元及以上的交易量在过去两天内显著下降。与此同时, 比特币价格也回落至 6.3 万美元以下。</p><p>比特币鲸鱼在 6 月 23 日之前两天内放慢了交易活动, 恰逢比特币价格跌破 6.3万美元。</p><p>根据 Santiment 的数据, 6 月 23 日过去两天内,比特币鲸鱼交易量 (超过10万美元) 为 9,923 笔, 较前两天的17,091 笔下降了 42%。</p><p>鲸鱼交易行为的变化发生在比特币价格从 6.4685 万美元下跌至 6.3422 万美元之际, 在撰写时进一步下跌至 6.2531 万美元 (CoinMarketCap 数据)。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/截屏2024-06-24_18.51.51.png"></figure><p>与此同时, 根据 CryptoQuant CEO Ki Young Ju 的说法, 下注比特币未来价格的鲸鱼交易者也有所收缩。</p><p>"衍生品交易所上的鲸鱼交易者正处于风险回避模式, "Ki 在 6 月 23 日的 X 帖文中表示。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/截屏2024-06-24_18.52.26.png"></figure><p>他指出, 交易所内部流动性脉冲 (IFP) 转为 "红色", 这是导致此种下降的原因。IFP 跟踪比特币在现货和衍生品交易所之间的流动, 反映了市场情绪。</p><p>IFP 转为红色表明, 交易者正在从衍生品交易所提取比特币, 这些平台用于基于比特币未来价格的金融合约。</p><h3>加密货币指数从贪婪转向中性</h3><p>衡量加密市场情绪的加密恐惧和贪婪指数(Crypto Fear and Greed Index)跌至51分的“中性”分数，这是比特币跌破6万美元的关键水平至59,122美元以来51天来的最低水平</p><p>此外, 现货比特币交易所交易基金 (ETF) 在过去 6 个交易日也出现了一系列流出。</p><p>不过, 其他分析师也看到了一些乐观信号, 如比特币卖出风险比率指标已达到了市场即将转机的水平。</p><p>总的来说, 比特币鲸鱼交易活动的下降似乎是导致其价格下跌的一个关键因素, 反映了当前加密货币市场的波动性和不确定性。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-falls-below-63k-after-btc-whale-transactions-drop-42?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/1232.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-price-critical-support-level-whale-transactions-btc',
      timestamp: 1719226500000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '比特币闪电网络黑客 Burak 推出新的二层解决方案 \'Brollups’',
      content:
        '<p>据 Cointelegraph 报道：比特币开发者表示 Brollups 能支持 90% 以上的去中心化金融用例, 从 NFT 销售到 DEX 的代币订单。以利用闪电网络漏洞而闻名的比特币开发者正在开发新的比特币第二层，旨在为比特币带来更多去中心化的金融用例。</p><p>被称为 "Burak" 的比特币开发者 - 他去年还创建了一种名为 Ark Protocol 的闪电网络竞争方案 - 推出了"Brollups"。</p><p>Brollup 是一种二层解决方案, 提供了一种原生于比特币的卷叠 (rollup) 设计, 可以捆绑交易而无需硬分叉比特币或发行非比特币代币, Burak 解释道。</p><p>在 6 月 21 日的一篇 Medium 文章中, Burak 指出Brollups 仍处于"设计阶段"。他告诉 Cointelegraph, 一个 signet (测试网) 版本可能会在今年晚些时候推出。&nbsp;</p><p>Burak 表示, <strong>Brollups 最终上线时将能支持 90% 以上的去中心化金融用例, "无论是出售 NFT 以比特币结算, 还是在去中心化交易所下达代币买单, 这些都可以在比特币网络上原子执行、可验证、可扩展和可强制执行"。</strong></p><p>Burak 补充说, Brollups "深深地融入了比特币, 并能与比特币原生地工作"。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/截屏2024-06-24_18.18.00.png"></figure><p>Brollups 将由 "运营商" 管理, 他们将为该协议提供流动性, 并通过捆绑比特币交易来推进 rollup 状态。</p><p>交易将在比特币虚拟机上执行。</p><p>Burak 因开发了这种无需硬分叉比特币或创造新代币的解决方案而在比特币社区获得了广泛赞誉。</p><h3><strong>从黑客攻击闪电网络到构建扩展竞争方案</strong></h3><p><br>2022 年 10 月, Burak 利用 998/999 的 Taproot 多重签名交易漏洞攻击了闪电网络。</p><p>这导致闪电网络节点运营商不得不紧急更新。虽然这一交易仅花费了 5 美元的手续费, 但它突出了 Taproot 升级带来的一些意外后果, 业内专家当时表示。</p><p>直到 2023 年 1 月, 当 Casey Rodarmor 启动 Ordinals协议后, Taproot 交易量才开始大幅增加。</p><p>2023 年 12 月, Taproot 交易占所有比特币交易的46.4% 创下纪录, 但到本月已下降至 30%, 根据 Data Always 的 Dune Analytics 仪表板显示。</p><p>Drivechain 和 Spiderchain 是其他专注于为比特币带来去中心化金融功能的比特币扩展项目。</p><p>2022 年 5 月, Burak 推出了 Ark, 这是一个专注于支付的比特币二层解决方案, 通过消除支付通道的需求来实现。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-lightning-hacker-burak-introduces-new-layer-2-brollups?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/1112.jpeg',
      source_url:
        'https://cointelegraph.com/news/bitcoin-lightning-hacker-launches-layer-2-brollups',
      timestamp: 1719225018000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: 'ZRO 代币因围绕 LayerZero "这不是空投" 的争议而下跌 17% ',
      content:
        '<p>据 Cointelegraph 报道：继 6 月 20 日推出后, LayerZero(ZRO) 代币在 20 分钟内飙升 15.15%, 随后在人们辩论其捐赠机制是否是一种天才还是仅仅是一种 "税收" 的借口下急挫 22%。</p><p>跨链互操作协议 LayerZero 推出的新代币 LayerZero (ZRO) 自推出以来下跌了 17%, 此次下跌引起了争议, 原因是索取代币需要捐赠, 有人将此视为一种 "税收"。</p><p>有些人不同意这种批评, 认为这种机制可能是解决最近代币空投问题的一个好办法。</p><p>6 月 20 日, ZRO 在 20 分钟内飙升 15.15% 至 4.71 美元, 随后在两小时内暴跌 22%, 这种模式通常出现在代币空投中, 因为索取者会抛售他们新获得的代币。</p><p>在这种情况下, ZRO 的推出带来了自身的独特争议。LayerZero 规定, 想要索取代币的用户必须为每个 ZRO 代币捐赠少量美元。&nbsp;</p><p>LayerZero 表示, 这些捐赠将导致大约 1850 万美元捐赠给以太坊开发者集体资金机制 Protocol Guild。</p><p>这一举措遭到了加密社区的强烈反对, 用户认为不得不支付 "税收" 会改变 "空投" 的本质, 使其更类似于首次代币发行(ICO)。</p><p>用户涌向 LayerZero 的帖子提出问题和评论, 包括 "这是个笑话吗" 和 "你们自己来付钱吧"。</p><p>LayerZero 坚称 ZRO 推出 "不是空投"</p><p>LayerZero 一直坚称最近的推出 "不是空投"。</p><p>LayerZero 在 6 月 20 日的声明中辩称, 空投已经不再有助于 "公平分配、社区建设和协议健康这些最初引入空投的目标"。</p><p>这主要是由于代币接收者 "对项目的长期成功几乎没有兴趣", 以及针对空投的挖矿和索伪实体(指创建和使用大量钱包来获取空投的实体)数量的增加。</p><p>LayerZero 联合创始人 Bryan Pellegrino 似乎一整天都在为该代币发行辩护, 重申没有人有权获得这些代币, 如果用户不想捐赠, 就应该放弃索取。</p><p>他说: "没有强制捐赠, 如果你不想捐赠...就不要索取。这不是你拥有的东西, 而是被提供的东西。"</p><p>与此同时, 加密社区的一些成员认为 ZRO 的捐赠索取机制可能是未来空投的一个正确方向。有人认为, 这可以增加Sybil 实体的成本, 并为代币设置基础价值。</p><p>ZRO 目前交易价格为 3.35 美元, 在过去 24 小时内下跌17%。</p>',
      url: 'https://tokeninsight.com/zh/news/zro-token-falls-17-amid-controversy-over-layerzero-s-not-an-airdrop?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.010.jpeg',
      source_url:
        'https://cointelegraph.com/news/layerzero-zro-cryptocurrency-token-donation-launch-controversy',
      timestamp: 1718966592000,
      tags: [
        {
          name: '空投',
        },
      ],
    },
    {
      title: 'Ripple 面临加州证券诉讼, 指控首席执行官发表 "误导性声明"',
      content:
        '<p>根据 Cointelegraph 的报道,法官 Phyllis Hamilton 认为, 当XRP在零售市场出售时, 它可能被视为一种证券, 并批准了针对 Ripple 首席执行官 Brad Garlinghouse 发言的诉讼。</p><p>美国联邦法院法官批准了针对 Ripple Labs 的民事证券诉讼, 拒绝了其提出的概括性判决申请, 该诉讼指称其首席执行官违反了加州证券法。</p><p>6 月 20 日, 美国加利福尼亚北区地区法院法官 Phyllis Hamilton 的命令意味着, 将由陪审团决定 Ripple 负责人 Brad Garlinghouse 在 2017 年接受采访时是否做出了 "误导性陈述"。该命令驳回了四项有关 Ripple "未将 XRP 登记为证券" 的指控。</p><p>在 2017 接受加拿大 BNN Bloomberg 采访时, Garlinghouse 表示他对 XRP "非常乐观" - 但该诉讼称这是虚假的,因为他在那一年"出售了数百万个 XRP"。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/5fdd6d40-0f48-4dcd-9e2b-18b7e43a3e67.webp"></figure><p>"我们很高兴加州法院驳回了所有集体诉讼索赔。 那个仅存的个人州法索赔将在审判时处理, "Ripple 首席法务官 Stu Alderoty 在发送给 Cointelegraph 的电子邮件中说。</p><p>在她的命令中, Hamilton 指出, Ripple 曾辩称"误导性声明 "索赔应该被驳回,因为根据 Howey 测试, XRP 不是一种证券 - 引用了 2023 年 7 月法官 Analisa Torres 在美国证券交易委员会与 Ripple 之间诉讼中做出的一项具有里程碑意义的裁决。</p><p>然而, Hamilton 不同意,而是认为当 XRP 出售给非机构投资者时, 它可能是一种证券。她表示, 他们会期望从 Ripple 的努力中获得利润, 这是 Howey 测试中使用的一个标准。</p><p>Ripple 的 Alderoty 表示, "Torres 法官在 SEC 案件中的裁决仍然有效, 这里没有什么会影响到那个决定。"</p><p>2023 年, 美国许多加密货币行业人士将 Torres 的裁决视为该行业的一大胜利, 认为其他法官在权衡其他加密货币案件时将会以此为先例。</p><p>但它的影响并没有预期的那么大。</p><p>在 SEC 针对 Terraform Labs 的案件中,来自与 Torres 法官相同法院的首席法官 Jed Rakoff, 在8月拒绝了Terraform 的驳回动议时,与 Ripple 裁决存在分歧。</p><p>Terraform 最终输掉了那个案件, 不得不向 SEC 支付 45 亿美元的和解金。</p>',
      url: 'https://tokeninsight.com/zh/news/ripple-faces-securities-suit-in-california-over-ceo-s-misleading-statement?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001_副本5.jpeg',
      source_url:
        'https://cointelegraph.com/news/ripple-california-securities-suit-ceo-garlinghouse-statements',
      timestamp: 1718965986000,
      tags: [
        {
          name: '美国证监会',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title:
        '美国证券交易委员会 (SEC) 结束了对 ConsenSys 的调查, 不会对以太坊提起诉讼',
      content:
        '<p>据 CoinDesk 报道：SEC 告知 ConsenSys 律师,在结束对该公司的调查后,不会建议采取执法行动。</p><p>以太币价格在这一消息后有所上涨。</p><p>在美国证券交易委员会 (SEC) 向 ConsenSys 发出信函,表示已结束对该科技孵化公司的调查,并不打算建议采取任何执法行动后,以太币 (ETH) 价格出现上涨。</p><p>SEC 在周二向 ConsenSys 的律师事务所发送的两封信函中告知,不会对该公司采取任何执法行动。在一篇博文中, ConsenSys 表示, SEC 正在"结束对以太坊 2.0 的调查"。</p><p>信函的主题为"关于以太坊 2.0 的事项 (C-08950) ",但并未明确提及与市值第二大加密货币相关的区块链。</p><p>其中一封信件表示,"我们已经完成了上述案件的调查。根据我们截至目前的信息,我们不打算向委员会推荐对你的客户 ConsenSys Software Inc. 采取任何执法行动。"</p><p>该信件说,虽然正在宣布调查的结论,但这并不意味着将来不会采取任何执法行动。</p><p>第二封信件echo了关于结束调查的措辞,同时也表示不同意 ConsenSys 律师在给监管机构的信中表达的任何事实陈述或法律结论,因为该信涉及鉴于 SEC 批准某些现货以太交易所交易基金申请备案,以太币是否为证券的问题。</p><p>ConsenSys 曾于 4 月起诉 SEC, 指控该监管机构正在调查以太坊合并后是否可能成为证券。</p><p>根据 TradingView 的数据,在 ConsenSys 在X平台发帖后,以太币价格最高上涨了 2.6%。根据 CoinGecko 的数据,在过去 24 小时内,以太币价格上涨约 3%。CoinDesk 20 指数 (CD20, 衡量整个加密货币市场的指标) 上涨了1.2%。</p>',
      url: 'https://tokeninsight.com/zh/news/sec-ends-probe-into-consensys-won-t-sue-over-ethereum?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001_副本4.jpeg',
      source_url:
        'https://www.coindesk.com/policy/2024/06/19/sec-ends-probe-into-consensus-wont-sue-over-ethereum/',
      timestamp: 1718878894000,
      tags: [
        {
          name: '以太坊',
        },
        {
          name: '美国证监会',
        },
      ],
    },
    {
      title: 'Layer 2 网络 Blast 将于下周推出其代币空投',
      content:
        '<p>据 The Block 报道，以太坊 Layer 2 网络 Blast 计划于6月26日推出代币空投,面向用户。</p><p>Blast 是由 NFT 市场 Blur 的创始人开发的以太坊 Layer 2 网络,将于下周正式推出其代币空投。</p><p>该项目今天在 X 平台上发布帖子,表示用户必须采取某些行动才能有资格参加空投,并且 dapp 必须在 6 月 25 日 8 点前(东部时间)向用户分发奖励激励,如 Gold 和 &nbsp;Points。</p><p>该项目表示,空投的 50% 将通过 Blast Gold 分配给开发者,另外 50% 将根据用户钱包和 dapp 余额,通过 Blast Points 分发给早期用户。</p><p>该项目表示, "50% 的 Blast 空投分配给 Blast Points", 并补充说用户的钱包将根据余额自动获得每个块的 Points 奖励。同时,对于 dapp 来说, Blast Gold 旨在成为促进 dapp 增长的激励。"这意味着 dapp 应该将他们赢得的所有 Gold 全部分发给用户,"项目方补充道。</p><p>用户还需要至少使用一次合格的 EOA 登录到 Blast dashboard, 才能纳入空投计算。</p><p>该项目最初预计在 5 月进行空投,但上个月宣布延迟,并表示"分配将增加以弥补这一延迟"。</p><p>Blast 由 Blur 创始人 Tieshun Roquerre 开发,于 2023 年 11 月进入早期访问模式。根据 DefiLlama 的数据,发文时 Blast 的总锁定价值为 20.9 亿美元,而 6 月 6 日为 23 亿美元。</p><p>Blast 上的游戏也最近获得了关注。加密交易卡牌游戏 "Fantasy" 在 4 月份进入 Blast 主网,此前在其测试网上也取得了不错的成绩。上个月,该协议进入了每日产生费用的前 10 大平台。</p>',
      url: 'https://tokeninsight.com/zh/news/layer-2-network-blast-to-roll-out-its-token-airdrop-next-week?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001_副本3.jpeg',
      source_url:
        'https://www.theblock.co/post/300965/layer-2-network-blast-to-roll-out-its-token-airdrop-next-week',
      timestamp: 1718877183000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: '以太坊',
        },
        {
          name: '空投',
        },
      ],
    },
    {
      title: 'Deutsche Telekom, T-Mobile 母公司计划进行比特币挖矿',
      content:
        '<p>据 CoinDesk 报道，电信巨头德意志电信可能很快成为新的比特币矿工玩家。</p><p>"我们将很快开始数字货币的光合作用"，T-Mobile 的 Telekom &nbsp;MMS Web3 基础设施和解决方案负责人 Dirk Röder 在上周的 BTC Prague 会议上表示。当被会议主持人问及 T-Mobile 是否正在挖掘比特币时,他回答"是的,我们会这么做"。</p><p>这一消息的发布恰逢矿业经历了巨大的过山车, 2021 年的牛市、随后的加密货币寒冬以及最新的减半,比特币奖励减半。</p><p>Röder 并没有具体说明公司将在哪里挖矿或以什么规模进行挖矿,但如此大型企业的进入既有正面影响也可能带来负面影响。</p><p>多年来,德意志电信一直非常活跃于数字资产领域。它在 Polygon、Q、Flow、Celo、Chainlink 和以太坊等网络上运行验证节点。该电信巨头还于去年启动了 Energy Web Chain,该公司称其是"专为能源行业设计的世界上第一个公共区块链",将有助于创造"更加分散、数字化和减碳的能源系统"。</p><p>Röder 还表示, 自 2023 年以来,他的公司一直在运行比特币节点和闪电网络节点。</p><p>这一举措为比特币挖矿社区注入了积极情绪,因为拥有 2000亿 美元市值的 T-Mobile 参与提高比特币网络安全性是一个积极信号。但同时也引发了一个问题,即如此大型玩家的进入是否会加剧现有矿工面临的激烈竞争。</p><p>T-Mobile 的 Web3 之旅此前也曾引发一些争议,该公司因 T-Mobile 客户及其竞争对手 AT&amp;T 的客户遭受" SIM 卡劫持"攻击而面临多起诉讼。</p>',
      url: 'https://tokeninsight.com/zh/news/telecom-giant-and-t-mobile-parent-deutsche-telekom-plans-to-mine-bitcoin?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001_副本2.jpeg',
      source_url:
        'https://www.coindesk.com/business/2024/06/17/telecom-giant-and-t-mobile-parent-deutsche-telekom-plans-to-mine-bitcoin/',
      timestamp: 1718783274000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '挖矿',
        },
      ],
    },
    {
      title:
        '美国比特币现货 ETF 在周二录得 1.5242 亿美元的净流出,连续第四天出现净流出。',
      content:
        '<p>据 The Block 报道：美国比特币现货交易所交易基金 (ETF) 在周二录得 1.5242 亿美元的净流出,连续第四天出现每日净流出。</p><p>根据 SosoValue 的数据,富达的 FBTC 在 11 只 ETF 中录得最大流出,净流出 8300 万美元。Grayscale 的 GBTC 报告净流出 6200 万美元,而 Bitwise 的 BITB 则出现约 700 万美元的净流出。</p><p>其他 8 只 ETF 在周二录得零流量。</p><p>截至周二, 11 只比特币现货 ETF 的累计净流入为 148.1 亿美元,低于 6 月 7 日的峰值 156.9 亿美元。这些产品在 6 月 7 日之前连续19 天录得流入。</p><p>ETF 的总交易量在周二达到 17 亿美元, 高于周一的 12.4 亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/us-spot-bitcoin-etfs-see-152-million-in-net-outflows-extending-negative-streak-to-four-days?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001_副本.jpeg',
      source_url:
        'https://www.theblock.co/post/300809/us-spot-bitcoin-etfs-see-152-million-in-net-outflows-extending-negative-streak-to-four-days',
      timestamp: 1718782308000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: 'Coinbase 国际宣布支持 Pre - launch 市场',
      content:
        '<p>根据 Cointelegraph 报道：Coinbase International 正在推出一个 Pre - launch 市场功能,允许用户交易尚未在现货市场上市的代币的永续期货合约。这个功能与其他中心化交易所如 Binance、Bybit、Bitget 和 OKX 已经实施的类似。</p><p>预发布市场资产的初始保证金上限为 50% ( 2 倍杠杆),每个代币的名义头寸限制为 5 万美元。这些预发布市场的指数价格机制与标准永续期货不同,使用该工具的标记价格的 4 小时指数移动平均值。</p><p>然而, Coinbase 警告说, Pre - launch 市场存在更高的风险,包括流动性较低、波动性较高和清算风险增加。此外, 这些 Pre - launch 工具不受 Coinbase 流动性支持计划的支持,进一步增加了自动清算的风险。</p><p>也存在基础代币可能永远无法上市的风险, 在这种情况下, Pre - launch 市场将需要被暂停或退市。Coinbase International 是总部位于美国的 Coinbase 交易所的海外分支机构,于 2023年5月启动, 且持有百慕大金融管理局颁发的 F 类许可证。</p>',
      url: 'https://tokeninsight.com/zh/news/coinbase-international-announces-support-for-pre-launch-market?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/新闻pic.001.jpeg',
      source_url:
        'https://cointelegraph.com/news/coinbase-international-announces-pre-launch-market',
      timestamp: 1718707063000,
      tags: [
        {
          name: 'Coinbase',
        },
      ],
    },
    {
      title: 'OKX正在调查在SIM卡交换攻击后发生的数百万美元账户被盗事件',
      content:
        '<p>根据 Cointelegraph 报道：据 SlowMist 称，尽管发生了两起类似的网络钓鱼事件，但 OKX 的双因素身份验证机制并不是主要的漏洞点。</p><p>OKX 加密货币交易所和安全合作伙伴慢雾SlowMist 正在调查一起导致两个用户账户被盗的价值数百万美元的漏洞。</p><p>调查涉及 6 月 9 日通过短信攻击（也称为 SIM 卡交换）盗取两个 OKX 交易所账户的事件。SlowMist 创始人余弦在 X 上发布了这一信息。</p><p><strong>"短信风险通知来自香港，并创建了一个新的 API Key（具有取款和交易权限，这也是我们之前怀疑有交叉交易意图的原因，但现在看来可以排除了）。"</strong></p><p>虽然目前尚不清楚此次攻击所窃取的金额，但余弦写道，"数百万美元的资产被盗"。</p><h4><strong>慢雾：双重认证并非攻击背后的主要问题</strong></h4><p>虽然链上安全公司 SlowMist 仍在调查黑客钱包和相关事件，但交易所的双因素身份验证（2FA）机制可能不是主要的漏洞点。</p><p>SlowMist创始人余弦在 6 月 9 日的 X 帖子中写道：</p><p><strong>"我还没有打开像谷歌认证器（Google Authenticator）那样的 2FA 认证器，而且我不确定这是否是关键点。"</strong></p><p>Cointelegraph 已联系 OKX 和 SlowMist 征求意见。</p><p>根据 Web3 安全组织 Dilation Effect 的分析，OKX 的 2FA 机制允许攻击者切换到安全性较低的验证方式，通过短信验证将提款地址列入白名单。</p><p>然而，更狡猾的黑客最近一直在绕过 2FA 验证方法。6 月初，一名中国交易员因一个名为 Aggr 的谷歌 Chrome 浏览器促销插件的骗局损失了 100 万美元。 该插件会窃取用户 cookie，黑客利用 cookie 绕过密码和 2FA 验证。</p><h4><strong>网络钓鱼攻击呈上升趋势</strong></h4><p>在 CoinGecko 证实其第三方电子邮件管理平台 GetResponse 遭到数据泄露后，6 月份的网络钓鱼攻击呈上升趋势。该漏洞导致攻击者向受害者发送了 23723 封网络钓鱼电子邮件。</p><p>网络钓鱼攻击涉及黑客旨在窃取加密货币钱包私钥等敏感信息。其他网络钓鱼攻击被称为 "地址中毒 "诈骗，其目的是诱骗投资者自愿将资金发送到一个与他们之前互动过的地址类似的欺诈性地址。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/截屏2024-06-18_17.49.29.png"></figure><p>私钥和个人数据泄露已成为加密货币相关黑客攻击背后的最大原因，因为漏洞利用者的目标是最低等的果实。</p><p>根据 Merkle Science 的 2024 HackHub 报告，在 2023 年期间，超过 55% 的黑客攻击数字资产是由于私钥泄露造成的。</p>',
      url: 'https://tokeninsight.com/zh/news/okx-investigates-multimillion-account-thefts-after-sim-swap-attacks?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/News_Untitled.001.jpeg',
      source_url:
        'https://cointelegraph.com/news/okx-investigates-multi-million-theft-sim-swap-attacks',
      timestamp: 1718704749000,
      tags: [
        {
          name: 'DeFi',
        },
        {
          name: 'OKX',
        },
      ],
    },
    {
      title: '英国法庭开始审理价值 90 亿美元的 BSV 退市案',
      content:
        '<p>据 Cointelegraph报道，六家交易所于 2019 年将 Bitcoin SV 除名，它们因错失良机而欠 BSV 持有者 90 亿美元。</p><p>一起涉及多家交易所在 2019 年将某种代币退市的案件在五年后继续上演，英国当局开始对六家公司提起诉讼。</p><p>英国竞争上诉法庭于6月5日开始对2019年将分叉加密货币比特币SV（BSV）退市的六家交易所进行听证。</p><p>被告包括一些全球最大的加密货币交易所，如Binance的欧洲分支Binance Europe Services。其他被告包括 Erik Voorhees 的加密货币交易所 ShapeShift、Kraken（代表 Payward）、比特币<br>交易所 Bittylicious 和相关实体。</p><p>根据 BitMEX Research 的数据，六名被告都有自己的律师团队，因此参与案件的律师人数众多，文件数量庞大</p><p>据法庭估计，集体诉讼令（CPO）预计需要三天时间。</p><figure class="image"><img src="https://s2.tokeninsight.com/static/news/content/img/截屏2024-06-17_18.04.22.png"></figure><h4>比特币 SV 由虚假的 "中本聪 "克雷格-赖特领导</h4><p><br>比特币 SV 是 2018 年从比特币现金（BCH）分叉出来的区块链和加密货币。该区块链的名称指的是 "中本聪的愿景"，由克雷格-赖特（Craig Wright）下属的一家区块链开发公司创立，而克雷格-赖特谎称自己是比特币的匿名创造者中本聪。</p><p>比特币现金分叉之争引发了社区的分裂，不同的公司和知名人士都在试图推动自己的说法。据报道，Roger Ver、Bitmain 以及 Binance 和 Coinbase 等交易所支持另一种分叉币比特币 ABC。</p><h4>为什么 Binance、Kraken 和 ShapeShift 在 2019 年将 BSV 除名？</h4><p><br>集体诉讼再次重提了2019年4月BSV退市潮的丑闻。据报道，Binance 或 Kraken 等交易所没有提供将代币退市的明确理由。</p><p>例如，Kraken 表示，BSV 的行为与 Kraken 和更广泛的加密货币社区的一切 "完全背道而驰"。该交易所还在 2019 年对 X 进行了一次民意调查，结果显示 BSV 是 "有毒的"。</p><p>Binance 也没有提供太多 2019 年将 BSV 除名的理由，只是指出 BSV 不再符合其标准。</p><p>Binance、Kraken 和其他交易所最终在 2022 年因 BSV 退市问题面临价值 120 亿美元的英国集体诉讼，原告 BSV Claims 要求退市赔偿。据原告称，那些在 2019 年退市后持有 BSV 的人，由于错过了发展机会，应获得 90 亿美元的赔偿。</p><p>据原告称，那些在 2019 年退市后持有 BSV 的人由于错过了增长机会，应获得 90 亿美元的赔偿。</p>',
      url: 'https://tokeninsight.com/zh/news/uk-tribunal-starts-hearing-9b-bsv-delisting-case?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/News_Untitled.002.jpeg',
      source_url:
        'https://cointelegraph.com/news/uk-tribunal-bsv-delistings-hearing-2024?_gl=1%2a1rqobcx%2a_ga%2aMTQyOTE4MjY0Ni4xNzE4NjE0MzUz%2a_ga_53R24TEEB1%2aMTcxODYxNDM1Mi4xLjEuMTcxODYxOTAyMS4wLjAuMA..',
      timestamp: 1718619542000,
      tags: [
        {
          name: 'Kraken',
        },
        {
          name: '币安',
        },
        {
          name: '比特币',
        },
        {
          name: '交易所',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'DAO 开发商 Aragon 为 Polygon 构建一个"治理中心"',
      content:
        '<p>据 The Block 报道,著名的去中心化自治组织(DAO)开发商 Aragon Project 宣布,已为 Polygon 社区构建了一个"治理中心"。</p><p>根据 Polygon 在 X 平台上发布的公告描述,该中心旨在"赋予用户和建设者影响 Polygon 技术核心发展的力量"。"它将在每一步都整合社区反馈,确保平台是去中心化的,并融入了社区价值观。"</p><p>Aragon Project 创建了"一个端到端的治理解决方案,包括协议治理合约和社区驱动的治理中心",据声明称。</p><p>据 Polygon Labs 治理负责人 Mateusz Rzeszowski 介绍,该中心旨在实施去年 Polygon 社区讨论的想法。</p><p>"我们提出了一个高效、安全和去中心化的投票模型,以满足系统智能合约可升级性的需求,Polygon 社区即将能够通过治理中心切实引导协议发展,"Rzeszowski 说。</p><p>Polygon 还在线上发布了"从提案提交到社区投票和实施"的框架概览。Aragon 和 Polygon 宣布将举办X空间,进一步讨论这一发展。</p><p>Aragon X 首席执行官 Anthony Leutenegger 在声明中说:"我们很高兴能够利用我们的下一代模块化 DAO 框架Aragon OSx,让 Polygon 的治理支柱得以实现。从协议治理合约到无缝透明的治理中心,这个项目是迈向 Polygon 更具包容性和去中心化治理的重大一步。"</p>',
      url: 'https://tokeninsight.com/zh/news/dao-developer-aragon-built-a-governance-hub-for-polygon?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/polygon_gov.png',
      source_url:
        'https://www.theblock.co/post/300206/polygon-governance-advances-with-new-hub-by-aragon-project',
      timestamp: 1718588759000,
      tags: [
        {
          name: '治理',
        },
        {
          name: 'Polygon',
        },
      ],
    },
    {
      title: '欧洲银行管理局发布 MiCA 下企业需遵守的审慎监管标准最终草案',
      content:
        '<p>据 Coindesk 报道,周四,欧洲银行管理局(EBA)发布了《加密资产市场(MiCA)》法规下企业需遵守的审慎监管标准的最终草案。</p><p>MiCA 是一套针对加密货币行业的全面规则,于去年获得通过。该法规为加密公司和稳定币发行商制定了相关规则。</p><p>EBA 的标准制定了压力测试项目的标准,并规定了储备资产的流动性要求,以及发行商需要制定的恢复计划等。</p><p>最近发布的文件中写道:"资产参考代币发行商需要根据可信的财务压力情景进行压力测试,主管部门将能够根据风险前景和压力测试结果提高资产参考代币发行商的自有资金要求。"</p><p>这些技术标准草案是在与27国集团、欧洲证券和市场管理局(ESMA)以及欧洲央行(ECB)等其他机构密切合作下制定的。</p>',
      url: 'https://tokeninsight.com/zh/news/europe-published-final-draft-technical-standards-on-prudential-matters-under-mica?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/eu2.png',
      source_url:
        'https://www.coindesk.com/policy/2024/06/13/eu-body-publishes-final-draft-technical-standards-for-prudential-matters-mica/',
      timestamp: 1718333988000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Curve 创始人头寸被清算,$CRV 一度暴跌超过28%',
      content:
        '<p>去中心化金融(DeFi)协议 Curve Finance 的创始人迈克尔·埃戈罗夫(Michael Egorov)声称,已经偿还了该协议因早前触发的"软"清算而产生的1000万美元坏账的93%。</p><p>埃戈罗夫表示:"我的头寸规模对于市场来说太大了,导致了1000万美元的坏账。我已经偿还了93%,并打算在很短时间内偿还剩余部分。"</p><p>6月13日,Curve Finance 的"软"清算机制在最近的黑客攻击尝试中成功进行了实际测试,但 CRV 代币价格在混乱中暴跌了超过28%。根据区块链分析公司 Arkham Intelligence 的数据,埃戈罗夫自身面临着1.4亿美元的清算,这是由于"在5个协议的5个账户上借入9570万美元的稳定币(主要是crvUSD),抵押1.41亿美元的CRV"。</p><p>在黑客攻击高峰期,埃戈罗夫面临着6000万美元的年化费用来维持他的借贷。Arkham 解释说:</p><p>"这是因为在 Llamalend 上几乎没有剩余的 crvUSD 可以借入抵押 CRV。埃戈罗夫的3个账户已经占到借入crvUSD的90%以上。如果 CRV 价格下跌约10%,这些头寸可能开始被清算。"</p><p>埃戈罗夫随后提议燃烧价值3700万美元的总供应量 10% 的 CRV 代币,以稳定代币价格至事件前的水平。"作为奖励,活跃投票人将在所有平台存款上获得3个月的 APY 加成"。</p>',
      url: 'https://tokeninsight.com/zh/news/curve-founder-s-position-liquidated-crv-once-plunged-by-over-28?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/crv.png',
      source_url:
        'https://cointelegraph.com/news/curve-founder-repays-bad-debt-liquidation',
      timestamp: 1718332548000,
      tags: [
        {
          name: 'DeFi',
        },
      ],
    },
    {
      title: 'BNB Chain 宣布推出新计划,支持早期 Web3项目',
      content:
        '<p>据 Cointelegraph 报道,BNB Chain 宣布与 Binance 的风险投资部门合作,推出孵化联盟,支持早期 Web3项目。</p><p>6月13日,该区块链网络推出了一个新计划,与 Binance Labs 共同创建。BNB Chain 表示,新的 BNB Incubation Alliance(BIA) 将让项目进入该网络为建设者、创始人和开发者提供的为期10周的加速器计划。</p><p>此外,孵化联盟参与者还可以获得来自 BNB Chain 的资助以及 Binance Labs 的投资。他们还可以使用 BNB Chain 的启动即服务计划,包括价值30万美元的免费服务,涵盖安全性和基础设施等各个项目方面。</p><p>据 BNB Chain 称,BIA 参与者将通过全球活动进行甄选。该区块链网络表示,将与风险投资公司、孵化器和开发者社区合作,在世界各地举办活动。</p><p>通过这些活动,该区块链网络将识别需要孵化的项目。BNB Chain 强调,这些活动将关注"处于孵化阶段、产品上市前或上市后的早期区块链创业公司"。</p><p>该计划的获胜者将由评委团和合作伙伴的代表评选并授予奖项。</p><p>BNB Chain 核心开发团队表示,该联盟将为新兴人才提供所需的网络、知识和工具,帮助他们取得成功。同时,Binance Labs 负责人何一表示,该孵化联盟再次证明了公司支持区块链人才的承诺。</p><p>BIA 的首次活动将在即将在比利时布鲁塞尔举行的以太坊社区大会上进行。</p>',
      url: 'https://tokeninsight.com/zh/news/bnb-chain-announces-new-program-to-support-early-web3-project?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/BIA.png',
      source_url:
        'https://cointelegraph.com/news/bnb-chain-binance-labs-web3-incubation-alliance',
      timestamp: 1718331046000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: 'Aethir 在以太坊主网推出去中心化云计算网络',
      content:
        '<p>据 Cointelegraph 报道,去中心化物理基础设施网络(DePIN)提供商 Aethir 宣布在以太坊主网上推出其去中心化云计算网络。</p><p>企业、数据中心、其他云服务提供商和加密货币挖矿运营商可以向 Aethir 的 GPU 即服务解决方案网络贡献闲置的 GPU 资源。</p><p>联合创始人马克·赖登强调了主网启动的重要性,他说:</p><p>"通过提供一个可扩展的框架来重新分配闲置的计算资源,我们可以在人工智能、机器学习和云游戏等快速发展的领域激发更多创新。在主网上,优质的企业可以为 Aethir 网络做出贡献,增加目前 GPU 供给的可访问性。"</p><p>企业和开发者将能够从 Aethir 的提供商网络租用计算资源,帮助训练人工智能模型或大规模渲染数字内容。</p><p>通过本地 ATH 代币,Aethir 使用以太坊进行质押功能,使用 Arbitrum(ARB)进行向计算提供商的快速支付以及对检查节点的社区奖励,以确保质量保证。</p><p>Aethir 的 ATH 还促进网络治理、质押过程和 DePIN 生态系统的安全。</p>',
      url: 'https://tokeninsight.com/zh/news/aethir-launches-decentralized-cloud-compute-network-on-ethereum-mainnet?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/aethir.png',
      source_url:
        'https://cointelegraph.com/news/aethir-decentralized-cloud-network-ethereum-mainnet',
      timestamp: 1718244492000,
      tags: [
        {
          name: 'Web3',
        },
      ],
    },
    {
      title: 'MetaMask 钱包推出以太坊质押池服务',
      content:
        '<p>据 The Block 报道,MetaMask 开发商 Consensys 已推出其热门 Web3 钱包的质押池功能,使用户可以质押任意数量的以太币来为以太坊网络提供安全性并获得验证者奖励。</p><p>在此之前,只有拥有至少32 ETH(约11.3万美元,以太坊协议的最低要求)的用户才能直接在该公司运营的验证者上进行质押。</p><p>MetaMask 用户可以随时赎回他们的以太币,但该过程需要等待时间,具体取决于当前以太坊验证者退出队列的情况。</p><p>MetaMask 的质押池服务正在分阶段推出,从今天开始向部分合格用户提供,未来几天会向更多用户开放,利用以太坊流动质押协议 StakeWise 的开放模块化架构来支持其智能合约。</p><p>Consensys 高级产品经理 Matthieu Saint Olive 在声明中表示:"通过质押池,MetaMask 用户现在可以轻松地在企业级验证者上质押 ETH,同时完全控制自己的 ETH,获得回报,并增强以太坊的安全性。我们很高兴将我们的质押解决方案带给更多 MetaMask 用户。"</p><p>初始推出不会提供给美国和英国的 MetaMask 用户,因为存在监管不确定性。但 Consensys 表示,未来计划也将把质押池引入这些市场。</p><p>Consensys 声称,MetaMask 质押池由超过33,000个托管以太坊验证者支撑,采用多云、多地区和多客户端的基础设施,质押总额超过100万 ETH,且没有遭受任何惩罚,验证者参与率超过99.9%。</p><p>上月,MetaMask 宣布将首次推出对比特币的支持,这与 Phantom 等其他 Web3钱包提供商的类似举措一致。4月,MetaMask 还与 Daylight 集成,让用户检查他们是否有资格获得空投和潜在的 NFT 权益。</p>',
      url: 'https://tokeninsight.com/zh/news/metamask-wallet-introduces-ethereum-pooled-staking-service?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/metamask2.png',
      source_url:
        'https://www.theblock.co/post/299709/metamask-pooled-staking-ethereum',
      timestamp: 1718243350000,
      tags: [
        {
          name: '钱包',
        },
        {
          name: 'Metamask',
        },
      ],
    },
    {
      title: 'BloFin 交易所与 Chainalysis 合作,提升合规性和安全性',
      content:
        '<p>BloFin 交易所是一个著名的加密货币交易平台,以其稳健的安全措施和以用户为中心的创新而闻名。BloFin 现宣布与 Chainalysis 区块链数据平台进行整合,这一发展对于加强交易所的合规能力和保护其全球用户群资产至关重要。目前, BloFin 提供高达320个合约交易对和100个现货交易服务,相比2023年实现了百倍增长。</p><p>为了提供一个安全合规的交易环境,BloFin 正在实施 Chainalysis 的加密货币风险解决方案,使 BloFin 能够实时监控加密货币交易,确保符合监管要求,并打击金融犯罪。</p><p>BloFin CEO Matt 表示:"我们很兴奋能够与 Chainalysis 合作,这大大提升了我们平台的安全性和合规性。在加密领域,区块链分析是预防洗钱最有效的工具之一,Chainalysis 的区块链数据平台受到全球各国政府的信任。BloFin 一直将用户资产的安全性置于首位。我们选择在早期发展阶段与 Chainalysis 合作,体现了我们对反洗钱的承诺。集成 Chainalysis 加密货币风险解决方案进一步强化了我们的这一承诺。我们相信这种合作将增强我们保护社区的能力,并为加密货币领域的安全和信任树立新标准。"</p><p>BloFin 凭借其创新的产品功能和用户体验始终处于加密货币市场的前列。借助简单易用的界面和一系列创新交易工具,BloFin满足了新手和资深交易者的需求。利用 Chainalysis 加密货币风险解决方案进一步彰显了 BloFin 对监管合规和操作透明度的承诺。</p><p>此次整合与 BloFin 利用先进技术增强用户信任和安全的战略愿景相一致。通过利用 Chainalysis 全面的区块链分析工具,BloFin 可以更有效地识别潜在的高风险交易,从而保护其社区,并为加密货币生态系统的整体安全做出贡献。</p><p>如需了解更多关于 BloFin 交易所及其服务的信息,请访问<a rel="noopener noreferrer nofollow" target="_blank" href="https://blofin.com/">https://blofin.com/</a>。</p><p><strong>关于 BloFin 交易所:</strong></p><p>BloFin 是一家全球加密货币交易所,提供安全可靠的数字资产交易平台。这个增长最快的加密货币交易所提供优质的永续和期货交易服务,拥有超过320个 USDT-M 交易对,涵盖比特币(BTC)、以太坊(ETH)、Solana(SOL)和各种 altcoin,可提供高达150倍的杠杆。无缝切换我们的移动应用和网页平台进行不间断交易。</p><p>BloFin 官方网站: https://www.blofin.com</p><p>注册 BloFin 账户: https://www.blofin.com/register</p><p>BloFin Twitter: https://x.com/Blofin_Official</p><p><strong>关于 Chainalysis:</strong></p><p>Chainalysis 是一家区块链数据平台。我们为政府机构、交易所、金融机构以及保险和网络安全公司提供数据、软件、服务和研究,覆盖70多个国家。我们的数据为调查、合规和市场情报软件提供支持,这些软件已被用来解决一些世界上最著名的犯罪案件,并安全地促进消费者获取加密货币。Chainalysis 得到了 Accel、Addition、Benchmark、Coatue、GIC、Paradigm、Ribbit 等领先风险投资公司的支持,致力于建立对区块链的信任,促进更大的金融自由和更少的风险。欲了解更多信息,请访问 www.chainalysis.com。</p>',
      url: 'https://tokeninsight.com/zh/news/blofin-exchange-enhances-compliance-and-security-with-chainalysis?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/blofin_chainanalysis.png',
      source_url: '',
      timestamp: 1718190329000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: 'ZKSync 将向社区分发36.75亿枚 $ZK 代币',
      content:
        '<p>据 The Defiant 报道,ZKsync 协会将从下周开始向其社区成员分发36.75亿枚 ZK 代币。</p><p>这次空投占总 ZK 代币供应量(210亿枚)的17.5%,将持续到2025年1月3日。贡献者可以从6月24日开始认领他们的代币。</p><p>认领后,ZK 代币可用于 ZKsync 协议内的治理,使代币持有者能够对协议升级进行投票并支付网络费用。</p><p>根据 L2Beat 的数据,ZKsync 是第三大基于零知识证明的以太坊二层扩容解决方案,在网络中拥有超过7.5亿美元的资产。</p><p>据 ZKsync 的博客文章,49.1%的总代币供应将分配给各种生态系统计划。此外,17.2%的代币保留给投资者,16.1%将给到开发 ZKsync 的公司 Matter Labs。这些团队代币将被锁定一年,并将从2025年6月逐步解锁至2028年6月。</p><p>新闻稿表示:"在空投中分配的代币比给 Matter Labs 团队和投资者的还要多,这不仅仅是一个象征性的决定。当ZKsync 治理系统在未来几周内启动时,社区将拥有最大份额的流动性代币来主导协议治理升级。"</p><p>截至2024年3月24日,在 ZKsync Era 和 ZKsync Lite 上记录的活动中,共有695,232个钱包有资格参与这次空投。分配将在用户(89%)和贡献者(11%)之间进行。</p><p>ZKsync 将单个地址的最大分配额限制在10万枚代币。</p><p>ZKsync 采用积分系统来确定代币分配。积分将根据与智能合约交互、为 DeFi 协议提供流动性以及交易 ERC-20代币等活动来获得。</p><p>在 ZKsync Lite 上的活动,如向 Gitcoin 轮次捐赠,也能赢得积分。持有少于450枚 ZK 代币的钱包将其分配回到池中,以确保每个钱包至少获得917枚ZK代币。</p>',
      url: 'https://tokeninsight.com/zh/news/zksync-to-distribute-3.675-billion-zk-tokens-to-community?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/zksync3.png',
      source_url:
        'https://thedefiant.io/news/defi/zksync-to-airdrop-3-6-billion-tokens-to-early-users',
      timestamp: 1718161985000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: 'zkSync Era',
        },
      ],
    },
    {
      title: 'SushiSwap 推出新的商业模式和多代币生态系统',
      content:
        '<p>据 Cointelegraph 报道,在经历了数月的激烈辩论后,去中心化交易所 SushiSwap 已经为其生态系统引入了一种新的商业模式。在"Sushi Labs"的名称下,这个新时代将去中心化自治组织(DAO)与"理事会结构"相结合。</p><p>6月11日,该协议推出了 Sushi Labs - 一家自治的行政、技术和运营公司,将管理 Sushi 生态系统。这一改革方案于3月首次提出,旨在"回应市场需求和用户需求",包括该协议由于"笨拙的治理"而对市场变化反应缓慢的问题。</p><p>这种新的实验室模式将采用与衍生品协议 Synthetix 类似的理事会结构,包括 Sushi High Kitchen、Treasury Council、Grants Council 和 Ambassador Council 四个理事会。High Kitchen - 由6到8名成员组成 - 是该协议的中央治理机构,将负责监督多重签名交易设置。</p><p>Sushi Labs 的总监 Jared Grey 在致 Sushi 社区的备忘录中写道:"许多人将 Sushi 停滞不前的增长和 AMM 流动性问题归咎于 LP 向其他 DEX 迁移以寻求更好的收益。然而,凭借我们新建立的组织结构、充足的预算以及成功产品如 Route Processor 的运用,我们拥有提高 Sushi DEX 流动性的工具。"</p><p>Sushi Labs 将接管价值数百万美元的 DAO 预算,包括2500万枚 SushiSwap 代币。代币持有者仍将拥有决定资金分配的权力,但不会参与具体的运营细节。</p><p>另一个变化是推出多代币产品套件。据 Sushi 称,这将有助于分摊产品成本,同时为代币持有者带来更多的奖励机会。"多代币生态系统可降低 Sushi 代币通胀的风险,并减轻在产品不盈利时为 DAO 举措提供资金的财务压力。"</p><p>近几个月来,这一新模式因其集中性质引发了辩论和批评。社区成员此前曾指责该协议存在敌意收购提案。一位 Sushi 成员在治理论坛上说:"看来 Sushi DAO 正走到尽头了。"</p><p>自2022年以来,SushiSwap 一直面临着财务挑战。当时 Grey 警告说,流动性提供商激励计划损失了3000万美元,促使其对代币经济学进行了修订。2022年12月,这个去中心化交易所还透露,它只有1.5年的运营预算,这促使它更新关注于多样化其财政库存和改善流动性管理。</p><p>Sushi Labs 澄清,其社区将继续在新商业模式中扮演重要角色。据发言人介绍,新的结构将使社区能够通过其理事会积极参与治理:</p><p>这些理事会确保社区成员能够有效管理资源并做出战略决策。DAO 将继续监督治理,监管财政库存,并通过 SushiPowah 参与理事会选举。</p><p>Sushi 表示,选举流程将决定社区在理事会讨论中的参与程度。"社区成员将有机会投票选举代表,他们将参与理事会的讨论和决策过程。"该协议认为,其新模式为社区提供了更加结构化和高效的治理框架。</p>',
      url: 'https://tokeninsight.com/zh/news/sushiswap-introduced-new-business-model-and-multitoken-ecosystem?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/sushi_lab.png',
      source_url:
        'https://cointelegraph.com/news/sushiswap-replaces-dao-labs-model-multi-token-ecosystem',
      timestamp: 1718159157000,
      tags: [
        {
          name: 'DeFi',
        },
        {
          name: 'DEX',
        },
        {
          name: 'Sushiswap',
        },
      ],
    },
    {
      title: 'Cardano 预计本月进行 Chang 硬分叉，引入链上社区治理',
      content:
        '<p>据 Cointelegraph 报道，Cardano 的创始人查尔斯·霍斯金森预计，Cardano 生态系统将在六月发生一件大事。</p><p>6 月 9 日，霍斯金森在 X 上宣布，Cardano Chang 硬分叉即将到来，Cardano 节点将很可能在本月达到 9.0 版本。</p><p>这意味着 Cardano 区块链已经准备好进行硬分叉，现在正在等待 70% 的质押池操作员安装新节点。</p><p>“然后，硬分叉可以发生，将 Cardano 推入 Voltaire 时代，”霍斯金森提到 Cardano 发展的最新阶段。</p><p>Cardano 的发展阶段，也被称为“时代”，以诗歌和计算机科学领域的著名人物命名，包括 Lord Byron、 Percy Bysshe Shelley、Joseph Goguen、Matsuo Bashō 和 Voltaire。</p><p>前三个阶段实现了基本的区块链、去中心化和智能合约。 Bashō 时代专注于扩展区块链。Voltaire 时代添加了治理、投票和财政管理功能到 Cardano 区块链。</p><p>Chang 将是 Cardano 路线图 Voltaire 时代的第一个硬分叉。这一时代将引入社区运行的治理，通过在链上社区共识，允许 Cardano 持有者使用他们的代币投票提案。</p><p>根据 Cardano 联合创始人，Chang 是 Cardano 历史上最重要的里程碑，将帮助区块链生态系统实现“一个遍及全球的去中心化文明，并拥有数百万居民。”</p>',
      url: 'https://tokeninsight.com/zh/news/cardano-expects-chang-hardfork-this-month-bringing-on-chain-community-governance?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/ada2.png',
      source_url:
        'https://cointelegraph.com/news/cardano-voltaire-era-june-hard-fork',
      timestamp: 1718076876000,
      tags: [
        {
          name: 'Cardano',
        },
      ],
    },
    {
      title: 'Solana 基金会移除部分验证者，因其参与三明治攻击',
      content:
        '<p>据 The Block 报道，Solana 基金会宣布，由于一组验证者参与了针对 Solana 用户的三明治攻击，已将其从委托计划中移除。</p><p>“此事的决定是最终决定。我们将对参与允许三明治攻击的内存池的运营商采取执法行动，”Solana 验证者关系负责人蒂姆·加西亚在 Solana 基金会的 Discord 服务器上写道。</p><p>Solana RPC 提供商 Helius 的联合创始人默特·穆姆塔兹解释说，此举将确保该基金会不会将验证委托给对散户用户进行恶意三明治攻击的验证者。</p><p>三明治攻击违反了 Solana 基金会在 5 月 7 日的 Discord 帖子中由加西亚制定的规则。</p><p>三明治攻击是一种抢先交易的利用行为，攻击者在受害者的交易前后放置两笔交易，以操纵价格并从差价中获利。</p><p>“参与恶意活动（例如参与私人内存池进行三明治攻击交易或以其他方式损害 Solana 用户）的运营商将不被委托计划所容忍。任何被发现参与此类活动的运营商都将被拒绝加入该计划，并且基金会提供的任何质押份额都将立即且永久地被移除。”</p><p>加西亚在宣布移除运营商时特别提到了这一点。</p><p>Solana 基金会委托计划的设立是为了通过将 SOL 代币委托给验证者来帮助他们运营，从而无需持有大量代币。验证者是根据表现来选择的。</p>',
      url: 'https://tokeninsight.com/zh/news/solana-foundation-removed-certain-validators-due-to-involvement-in-sandwich-attack?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/sol.png',
      source_url:
        'https://www.theblock.co/post/299244/solana-foundation-removes-certain-operators-from-delegation-program-over-malicious-sandwich-attacks',
      timestamp: 1718073852000,
      tags: [
        {
          name: 'Solana',
        },
      ],
    },
    {
      title: 'OP 主网发布欺诈证明,进入第一阶段去中心化',
      content:
        '<p>据 The Block 报道,OP Labs 已在二层区块链 OP 主网上发布欺诈证明 — 推进该项目在去中心化方面进入第一阶段 Rollup。</p><p>欺诈证明系统允许用户在无需依赖第三方的情况下从 OP 主网上提取以太币和 ERC-20代币 — 让用户能够质疑和删除无效的提取操作。欺诈证明作为以太坊第二层网络的一种机制,允许用户对可能存在欺诈或不正确的交易提出异议。</p><p>在通过 Optimism 的治理结构获得批准之前,欺诈证明的实施已得到了 Optimism 生态系统(或 Superchain)中包括 OP Labs、Base 和 Sunnyside Labs 在内的多个核心开发团队的支持 。</p><p>此前,OP 主网没有欺诈证明 — 要求用户信任运营商将准确的状态根提交到主网上。</p><p>OP 主网和 Optimism 生态系统中的其他链使用乐观 rollup 作为扩容解决方案,在链下聚合以太坊交易,从而降低处理成本。</p><p>尽管欺诈证明系统现已对公众开放参与,但 Optimism 安全委员会仍可干预并在系统故障的情况下将其恢复到经许可的状态,作为安全和负责任的推出的一部分。额外的保障措施允许安全委员会有效解决系统漏洞,包括在必要时重置提取。</p><p>OP 主网有一个完全无许可和去中心化的"第二阶段"的路线图,由智能合约单独管理。</p><p>大多数乐观 rollup 区块链尚未通过纳入欺诈证明和维护去中心化的合约升级来去中心化其网络。不过,Optimism 最接近的竞争对手 Arbitrum 也已上线欺诈证明。</p>',
      url: 'https://tokeninsight.com/zh/news/op-mainnet-releases-fault-proofs-entering-into-stage-1-decentralization?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/op_airdrop.png',
      source_url: 'https://www.theblock.co/post/299202/op-mainnet-fault-proofs',
      timestamp: 1718072107000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: 'Optimism',
        },
      ],
    },
    {
      title: '交易平台 Robinhood 将收购加密货币交易所 Bitstamp',
      content:
        '<p>据 Coindesk 报道，交易平台 Robinhood (HOOD) 已同意收购加密货币交易所 Bitstamp，希望通过新产品扩展其全球加密业务并吸引机构客户，该公司周二宣布。</p><p>根据新闻稿，这笔 2 亿美元的全现金交易预计将在 2025 年上半年完成。巴克莱资本和 Galaxy Digital 在此次出售中为 Robinhood 和 Bitstamp 提供了咨询，这两家公司表示。</p><p>“收购 Bitstamp 是发展我们加密业务的重要一步，”Robinhood Crypto 总经理约翰·克布拉特说，“Bitstamp 备受信赖且历史悠久的全球交易所已在市场周期中表现出韧性……通过这种战略组合，我们更有利于在美国以外扩展我们的业务范围，并欢迎机构客户加入 Robinhood。”</p><p>Bitstamp 是一家总部位于英国的加密货币交易所，成立于 2011 年，并迅速成为欧洲最大的加密货币交易所之一。它目前提供 85 种加密货币的现货交易以及其他加密产品，包括机构贷款和质押等。根据该公告，它是市场上受监管最严格的公司之一，在全球范围内持有超过 50 个许可证和注册。它还定期接受全球四大会计师事务所的审计。</p><p>Robinhood 于 12 月开始向欧盟客户提供加密交易。</p><p>Bitstamp 首席执行官 JB Graftieaux 表示：“将 Bitstamp 的平台和专业知识引入 Robinhood 生态系统将为用户提供增强的交易体验，同时继续致力于合规、安全和以客户为中心，”他连同其他领导团队成员将在出售后继续留任。</p><p>随着 Robinhood 在国际上的扩张可能从 Coinbase（COIN）等公司手中夺取更多市场份额，这笔交易可能会加剧加密货币交易市场的竞争，Coinbase 也在努力在北美以外扩张。</p>',
      url: 'https://tokeninsight.com/zh/news/trading-platform-robinhood-to-acquire-crypto-exchange-bitstamp?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/bitstamp2.png',
      source_url:
        'https://www.coindesk.com/business/2024/06/06/robinhood-to-buy-crypto-exchange-bitstamp-in-effort-to-expand-outside-the-us/',
      timestamp: 1717728565000,
      tags: [
        {
          name: '交易所',
        },
      ],
    },
    {
      title: '富兰克林邓普顿考虑为机构投资者提供私募 Altcoin 基金',
      content:
        '<p>据 Cointelegraph 报道，资产管理公司富兰克林邓普顿正在探索为机构投资者提供新的加密基金，其产品范围将扩展到比特币和以太坊之外。</p><p>根据 The Information 于 6 月 6 日发布的一份报告，该共同基金正在考虑设立一个私募基金，以便让机构投资者接触山寨币。该报告援引知情人士的话说，该基金还将提供质押奖励。</p><p>该报告并未提及该基金将包含哪些山寨币，但该资产管理公司最近赞扬了 Solana 网络在 2024 年的增长。根据分析公司 Messari 的数据，在 2024 年第一季度，Solana 的现货去中心化交易量从上一季度的 15 亿美元增长了 319%，达到 150 亿美元。</p><p>截至 2024 年 3 月，富兰克林邓普顿管理的资产约为 1.64 万亿美元。这一数字使该资产管理公司跻身全球最大的投资管理公司之列。</p><p>该公司积极参与加密领域，拥有多个基金。其最受欢迎的项目之一是在 1 月份推出的现货比特币交易所交易基金 (ETF)。</p><p>富兰克林也是现货以太坊 ETF 的支持者之一，该 ETF 最近获得了美国证券交易委员会 (SEC) 的批准。该 ETF 目前正在等待该机构的批准才能推出。</p><p>“我们对以太坊及其生态系统感到兴奋。尽管它最近经历了中年危机，但我们看到未来一片光明，许多强劲的东风将推动以太坊生态系统向前发展，”该公司此前在 X 上的一篇帖子中表示。</p>',
      url: 'https://tokeninsight.com/zh/news/franklin-templeton-considers-private-altcoin-funds-for-institutional-investors?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/franklin.png',
      source_url:
        'https://cointelegraph.com/news/franklin-templeton-altcoin-focused-crypto-fund',
      timestamp: 1717724420000,
      tags: [
        {
          name: '基金',
        },
      ],
    },
    {
      title: '去中心化稳定币铸造协议 M^0 融资 3500 万美元，由贝恩资本加密领投',
      content:
        '<p>据 The Block 报道，去中心化稳定币铸造协议 M^0（“M Zero”）在由贝恩资本加密领投的 A 轮融资中筹集了 3500 万美元。</p><p>M^0 周三表示，本轮其他投资者包括 Galaxy Ventures、Wintermute Ventures、GSR、Caladan 和 SCB 10X。M^0 基金会理事会主席卢卡·普罗斯佩里称，该项目于 1 月下旬开始筹集本轮资金，并于 5 月初结束。</p><p>普罗斯佩里表示，本轮融资以股权加代币的形式进行，M^0 向投资者发行了其两枚“治理代币”——POWER 和 ZERO，但有锁定期。他补充说，此锁定期符合“审慎的商业和监管惯例”。他拒绝透露估值。</p><p>M^0 的 A 轮融资是在 2023 年 4 月由 Pantera Capital 领投的 2250 万美元种子轮融资一年后进行的。A 轮融资使 M^0 的总融资额达到 5750 万美元。普罗斯佩里指出，A 轮融资的需求是筹集金额的 2.5 倍。</p><p>M^0 是一个基于以太坊的稳定币铸造协议，经批准的实体可以在其中创建一种名为 M 的稳定币，该稳定币“仅由美国国债超额抵押”。要铸造 M，实体需要获得该协议治理的许可。获得批准后，他们提供自己的标准化“高质量”抵押品，独立验证者会检查这些抵押品是否符合标准。</p><p>普罗斯佩里表示，M^0 协议已在以太坊主网上部署，并将在未来几周内上线。第一批铸币人和验证者也已获得批准，详情稍后公布。</p><p>普罗斯佩里说：“任何实体都可以申请获得许可并成为铸币人，但需要获得治理的批准”，并补充说，实体必须遵守 M^0 的“已采纳的指导方针”，这些指导方针将很快发布。</p><p>普罗斯佩里指出，其他稳定币发行商，如 Agora 和 Mountain，也可以加入该协议并根据 M^0 标准铸造 M。他说：“M^0 实际上是一个可以连接所有这些兼容发行商的网络。”</p><p>关于 M 稳定币的储备，普罗斯佩里表示，它们必须由与铸币人分离的特殊目的实体运营商管理的破产隔离实体持有。他补充说，这些储备将由 M^0 系统中批准的验证者每天验证和发布。</p><p>普罗斯佩里表示，虽然 M^0 协议最初将在以太坊上推出，但 M 稳定币最终可能会在其他第 1 层和第 2 层网络上提供。M^0 团队目前正在制定其多链战略。该团队由前 MakerDAO 和 Circle 员工领导。</p><p>目前有 50 多人为 M^0 工作，普罗斯佩里希望在工程、法律、业务发展和运营等职能部门扩展团队。</p><p>普罗斯佩里表示，作为 A 轮融资的一部分，贝恩资本加密已与 Pantera Capital、Road Capital 和 AirTree 一起在 M^0 董事会占据一席之地。</p>',
      url: 'https://tokeninsight.com/zh/news/decentralized-stablecoin-minting-protocol-m^0-raised-35m-led-by-bain-capital-crypto?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/M0.png',
      source_url:
        'https://www.theblock.co/post/298611/bain-capital-crypto-m0-stablecoin-protocol-funding',
      timestamp: 1717640698000,
      tags: [
        {
          name: '稳定币',
        },
        {
          name: '融资',
        },
      ],
    },
    {
      title: 'Paxos 将发行计息稳定币 USDL',
      content:
        '<p>据 Cointelegraph 报道，Paxos International 正在发行一种名为 Lift Dollar (USDL) 的计息稳定币。USDL 将在阿布扎比全球市场 (ADGM) 受到监管，并根据 Paxos International 从其支持储备中获得的利息支付隔夜收益。</p><p>USDL 将以 1:1 的比例由流动性美国政府证券和现金等价储备资产支持，这些资产根据 ADGM 金融服务监管局的要求持有。Paxos International 不会对这些储备收取利息，而是对该代币收取发行费。</p><p>Paxos 另行宣布，USDL 将通过经销商 Ripio、Buenbit、Manteca 和 Plus Crypto 在阿根廷提供。</p><p>以太坊智能合约将使用一种称为重铸的机制，根据市场状况自动分配 USDL 的收益。据彭博社报道，收益率将达到约 5%。Paxos International 在一份声明中表示，USDL 是第一个计息的受监管稳定币。通常，稳定币持有者还可以通过质押、再质押和收益耕作来赚取利息。</p><p>USDL 不适用于美国、ADGM 以外的阿联酋、英国、欧盟、加拿大、香港、日本或新加坡的居民。Paxos International 解释说：</p><p>“此处提到的数字资产尚未根据经修订的 1933 年美国证券法注册，并且不得在美国提供或出售，除非根据适用的豁免注册。”</p>',
      url: 'https://tokeninsight.com/zh/news/paxos-to-issue-interest-bearing-stablecoin-usdl?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/USDL.png',
      source_url:
        'https://cointelegraph.com/news/paxos-launches-interest-bearing-stablecoin-usdl',
      timestamp: 1717639108000,
      tags: [
        {
          name: '稳定币',
        },
      ],
    },
    {
      title:
        '模块化区块链项目 Avail 融资 4300 万美元，由 Founders Fund、Dragonfly 和 Cyber Fund 联合领投',
      content:
        '<p>据 The Block 报道，去年从 Polygon 分拆出来的模块化区块链项目 Avail 在其主网上线之前，已在 A 轮融资中筹集了 4300 万美元。</p><p>Avail 周二表示，Peter Thiel 的 Founders Fund、Dragonfly 和 Cyber Fund 联合领投了本轮融资。其他投资方包括 SevenX Ventures、Figment Capital、Nomad Capital、Chapter One、Foresight Ventures、Mirana Ventures、KR1、Alliance 和 Hashkey Capital。包括 Founders Fund 和 Dragonfly 在内的许多投资方都是 Avail 的重复支持者，他们增加了对该项目的投资。</p><p>Avail 的 A 轮融资是在其 2 月份筹集到 2700 万美元种子资金后仅三个月进行的。当时，Avail 正在筹集另一轮融资。Avail 联合创始人 Anurag Arjun 表示，最新一轮融资使 Avail 的总融资额达到 7500 万美元，其中包括 500 万美元的种子前轮融资。</p><p>Arjun 表示，A 轮融资采用 SAFE（未来股权的简单协议）和 SAFT（未来代币的简单协议）相结合的方式进行，并于上周正式结束。他拒绝透露估值；Avail 在 2 月份进行种子轮融资时的完全摊薄估值为数亿美元。</p>',
      url: 'https://tokeninsight.com/zh/news/modular-blockchain-project-avail-raised-43m-co-led-by-founders-fund-dragonfly-and-cyber-fund?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/avail_(1).png',
      source_url:
        'https://www.theblock.co/post/298374/peter-thiel-founders-fund-series-a-avail',
      timestamp: 1717554280000,
      tags: [
        {
          name: 'Layer 2',
        },
      ],
    },
    {
      title: 'StarkWare 宣布构建比特币扩容方案',
      content:
        '<p>据 The Block 报道，区块链开发商 StarkWare 已宣布计划构建比特币扩容方案，作为其重大扩张战略的一部分。</p><p>StarkWare 在上一轮投资中估值达到 80 亿美元，是以太坊二层 Starknet 的核心贡献者。随着新的比特币 OP_CAT 提议目前在社区中展开辩论，该公司表示，现在是将其零知识扩容技术引入比特币的最佳时机。</p><p>“Starknet 将成为第一个同时在比特币和以太坊上进行结算的网络，并将比特币的每秒交易量扩展至数千笔。这将在潜在的比特币升级 OP_CAT 后六个月内发生，”StarkWare 首席执行官兼联合创始人 Eli Ben-Sasson 在与 The Block 分享的一份声明中表示。</p><p>该团队澄清称，不会创建额外的链——该计划使用相同的 Starknet 网络，具有相同的治理和代币经济学，支持比特币扩容，而无需进行分叉。Ben-Sasson 说，每个 dApp 都可以选择它想要在哪里进行结算——无论是在其中一个链上，还是在两个链上。</p><p>Ben-Sasson 补充说：“StarkWare 经常被误认为是以太坊死忠，但实际上我们是扩容死忠。”“我们是大众应用死忠。我们是 STARK 死忠，这意味着我们相信我们的技术最适合安全高效地扩展所有区块链。在 StarkWare，我们现在拥有同时扩展以太坊和比特币的专业知识、经验和团队。”</p><p>StarkWare 还宣布推出一个 100 万美元的基于申请的基金，以支持有兴趣为其计划做出贡献的比特币研究人员。Ben-Sasson 表示，申请将在“几周内”开放，资金“将用于证明与 OP_CAT 相关的风险的新发现，或开源且有用的概念验证。”</p>',
      url: 'https://tokeninsight.com/zh/news/starkware-announces-to-build-a-bitcoin-scaling-solution?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/strkbtc.png',
      source_url:
        'https://www.theblock.co/post/298398/starkware-plans-to-bring-zk-scaling-to-bitcoin-alongside-ethereum',
      timestamp: 1717552388000,
      tags: [
        {
          name: 'Layer 2',
        },
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '威斯康星州养老金基金购买了 1.6 亿美元的比特币 ETF',
      content:
        '<p>据 The Defiant 报道，威斯康星州养老金基金将其1560亿美元投资组合中约0.1%分配给现货比特币ETF。</p><p>威斯康星州投资委员会投资了大约1.6亿美元到贝莱德的 iShares 比特币信托和 Grayscale 的比特币信托,根据提交给SEC的13-F表格。</p><p>即使只分配了一小部分资产管理,但一个规模和偿付能力如此之强的基金投资比特币,也标志着这种资产正在成熟,并被视为一种合法的投资。</p><p>威斯康星州政府养老金基金是美国最财务稳健的基金之一。根据养老金分析公司 Equable 进行的《2023年养老金现状》报告,威斯康星州的养老金金额覆盖率排名第5,达到100.2%。这一数字远高于78%的全国平均水平,表明该基金的偿付能力很强。</p><p>威斯康星州退休教育工作者协会认为这是一个"巨大成功",该协会是世界第25大,美国第9大。</p><p>Marquette 大学财务学荣誉教授大卫·克劳斯在5月31日接受 PBS 采访时表示:"这只是一个切入点,我认为他们(该基金)正在测试公众的反应。这是一次试运行,不会对投资组合产生实质性影响,而是增加多样性,直到达到1%甚至2%的配置。"</p>',
      url: 'https://tokeninsight.com/zh/news/wisconsin-pension-fund-purchased-160m-bitcoin-etfs?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/btc31.png',
      source_url:
        'https://thedefiant.io/news/tradfi-and-fintech/wisconsin-s-pension-fund-buys-usd160m-worth-of-bitcoin-in-trailblazing-move',
      timestamp: 1717473912000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '迪拜宣布修订针对基金的加密代币制度',
      content:
        '<p>据 Cointelegraph 报道，迪拜金融服务管理局 (DFSA) 宣布对其加密货币代币制度进行修订，以加强和推进其特别经济区内代币的监管框架。</p><p>DFSA 是阿联酋的一个独立监管机构，负责监督在迪拜国际金融中心 (DIFC) 注册的实体，该中心是该国的一个特别经济区。</p><p>6 月 3 日，DFSA 表示已修订其加密代币制度，以反映其 2024 年 1 月发布的第 153 号咨询文件所产生的变化。修订涉及几个重要领域，包括投资加密代币的基金以及加密代币的认可流程。</p><p>关于基金，该修订影响了提供投资于认可加密代币的外部和外国基金单位的能力。此前，DFSA 限制了涉及加密代币的基金活动。</p><p>该监管机构在其最近的咨询文件中表示，基金和资产管理者将该制度描述为过于严格。DFSA 写道：</p><p>“他们表达了这样的观点，即目前的监管方式过于严格，尤其是对投资加密代币的外部基金和外国基金的限制，对于某些基金来说，仅限于投资已认可的加密代币的限制。”</p><p>这些变化还影响了国内合格投资者基金投资未认可代币的能力。</p><p>虽然该监管机构认为认可流程很重要，但它也考虑了允许国内基金对未认可加密货币进行有限投资的可行性，只要敞口不超过基金总资产价值 (GAV) 的 10%。</p><p>在修订之前，代币认可的申请费为每枚代币 10,000 美元。DFSA 指出，许多人认为此费用过高，尤其是对于寻求多枚代币认可的公司而言。此外，有些人认为这个过程是“不必要的负担”。</p><p>根据反馈，该监管机构将费用降至 5,000 美元，并为稳定币（与法定货币挂钩的加密代币）引入了额外的认可标准。在咨询文件中，DFSA 强调这些变化并不表示立场更为宽松。</p>',
      url: 'https://tokeninsight.com/zh/news/dubai-announces-to-amend-crypto-token-regime-for-funds?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/dubai.png',
      source_url:
        'https://cointelegraph.com/news/dubai-updates-crypto-token-regulations',
      timestamp: 1717473389000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '币安为欧洲 MiCA 稳定币规则做准备',
      content:
        '<p>据 Cointelegraph 报道，随着加密资产市场监管 (MiCA) 稳定币（资产参考代币）规则在本月底生效，币安将严格遵守。这家加密货币交易所已向欧洲经济区的用户发出预告，告知他们可以预期其服务会发生变化。</p><p>MiCA 为尚未在欧盟受到监管的加密资产发行商创建了统一的规则。作为回应，币安根据新规则的合规性将稳定币分为“受监管”和“未经授权”的代币。</p><p>该交易所“旨在通过随着更多受监管的稳定币在市场上可用而逐渐使用户从未经授权的稳定币过渡到受监管的稳定币，以便顺利实现 MiCA 的目标”。</p><p>到目前为止，还没有关于哪些稳定币符合或不符合 MiCA 的裁决。币安表示，目前只有少数稳定币符合 MiCA 的要求。</p><p>币安将主要依靠“仅限卖出”的策略来遵守 MiCA 要求。该策略尤其适用于币安兑换功能：“未经授权的稳定币的兑换功能将以‘仅限卖出’模式提供”。</p><p>MiCA 于 2023 年 5 月通过成为法律。币安可能不是第一家在实施 MiCA 之前采取行动的交易所。三月份，OKX 在欧洲退市了 Tether，而没有提到 MiCA。九月份，币安否认了基于币安法国法律主管 Marina Parthuisot 采访中的一句话而产生的报道，即该公司打算在欧洲退市所有稳定币。</p><p>专家意见对 MiCA 对欧洲加密货币市场产生的影响意见不一，但许多人对该法律持赞成态度，仅对涉及稳定币的规则表示担忧。</p>',
      url: 'https://tokeninsight.com/zh/news/binance-prepares-for-europe-s-mica-rules-of-stablecoins?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/binance_logo.png',
      source_url:
        'https://cointelegraph.com/news/binance-prepares-for-mica-stablecoin-regulations',
      timestamp: 1717467312000,
      tags: [
        {
          name: '币安',
        },
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'CZ 以美国最富有囚犯的身份开始了为期四个月的刑期',
      content:
        '<p>币安创始人赵长鹏已向加州一家低安全级别的监狱报到，开始了他为期四个月的联邦监狱刑期，成为该国最富有的囚犯。</p><p>在币安，全球最大的加密货币交易所，未能实施适当的反洗钱协议后，赵在 2023 年 11 月认罪，于今年 4 月被判处四个月徒刑和 5000 万美元的个人罚款。币安本身同意支付 43 亿美元，这是历史上最大的货币和解之一，引发了加密货币社区的褒贬不一的反应。</p><p>“看起来 CZ 将无法从任何赚取的时间积分计划中受益，预计他将在联邦监狱服满全部 120 天，”担任联邦监狱顾问的山姆·曼格尔说，“虽然他会感到不舒服，但我相信赵会很安全，不会被勒索或处于危险之中。”</p><p>根据政府记录，赵已向加利福尼亚州隆波克的联邦惩教机构隆波克报到，这是一所位于洛杉矶西北方向的低安全级别联邦监狱。FCI Lompoc 关押过几名因白领犯罪被定罪的著名囚犯，包括里德·斯莱特金，他因经营历史上针对科学教徒的最大庞氏骗局之一而被定罪，以及莫西莫·贾努利，他因与妻子洛里·洛克林一起卷入大学入学贿赂丑闻而闻名。</p><p>在 CZ 离开后，币安发布了一篇博文，重点介绍了其成功之处并概述了对未来的愿景。它写道：“我们相信，随着我们为未来 50 年奠定基础，币安将成为一家更强大的公司。”</p>',
      url: 'https://tokeninsight.com/zh/news/cz-begins-his-four-month-prison-term-as-the-richest-inmate?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/cz2.png',
      source_url:
        'https://www.theblock.co/post/298006/binance-founder-cz-begins-four-month-prison-sentence-as-the-countrys-richest-inmate',
      timestamp: 1717384328000,
      tags: [
        {
          name: '赵长鹏',
        },
      ],
    },
    {
      title: '11 家加密货币交易所接近获得香港牌照',
      content:
        '<p>据《商业时报》报道，香港证券监管机构表示，在推出数字资产规则手册试图培育行业枢纽一年后，有 11 家加密货币交易所更接近获得牌照。</p><p>证券及期货事务监察委员会 (SFC) 的网站在周六（6 月 1 日）显示，包括 Crypto.com 和 Bullish 在内的申请人“被视为已获得许可”。这些交易场所是全球交易量显着的平台之一。</p><p>知名数字资产交易所，如 OKX 和 Bybit，撤回了许可证申请。全球最大的交易所币安并未申请，顶级美国平台 Coinbase Global 或另一家热门交易所 Kraken 也未申请。</p><p>香港已设定 6 月 1 日的最后期限，要求加密货币交易所获得许可或被视为已获得许可。作为最低要求，公司必须至少属于后者类别，才能在该市开展业务并向当地投资者提供市场服务，并且一旦 SFC 对持续合规感到满意，将收到实际许可。</p>',
      url: 'https://tokeninsight.com/zh/news/11-crypto-exchanges-are-closer-to-get-licenses-in-hong-kong?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/HK_crypto.png',
      source_url:
        'https://www.businesstimes.com.sg/companies-markets/hong-kong-says-11-crypto-exchanges-are-closer-getting-permits',
      timestamp: 1717382421000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: '比特币质押协议 Babylon 融资7,000万美元，Paradigm 领投',
      content:
        '<p>比特币质押协议 Babylon 完成了7000万美元的融资,由风险投资公司 Paradigm 领投。</p><p>Bullish Capital、Polychain Capital、Hashkey Capital、Mantle、Galaxy、Hack VC、ViaBTC Capital、Amber 和HTX Ventures 等公司也参与了本轮融资。</p><p>Babylon 构建了一种基础设施,允许权益证明(PoS)系统从比特币获得质押资本。该平台采用模块化设计和惩罚功能,使基于质押的系统(如区块链、二层、去中心化应用层和预言机)可以将比特币纳入作为质押和二次质押的资产。</p><p>Babylon 联合创始人大卫·泽说:"这笔资金将加快我们让比特币成为 PoS 系统安全支柱的使命。我们的团队致力于促进比特币效用超越其传统角色,增强整个区块链生态系统的安全性。"</p><p>加密货币交易所币安的风险投资部门币安实验室此前在2月28日对 Babylon 进行了不透露金额的投资。该平台也于前一天推出了公开测试网,并提供了 NFT 通行证奖励。Polychain Capital 和 Hack VC 还联合领投了2023年12月的1800万美元A轮融资。</p>',
      url: 'https://tokeninsight.com/zh/news/bitcoin-staking-protocol-babylon-raised-70m-led-by-paradigm?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/babylon_raising.png',
      source_url:
        'https://www.theblock.co/post/297639/paradigm-leads-70-million-raise-for-bitcoin-staking-protocol-babylon',
      timestamp: 1717124046000,
      tags: [
        {
          name: '比特币',
        },
        {
          name: '质押',
        },
      ],
    },
    {
      title: '摩根大通:现货以太坊 ETF 的需求将远低于比特币 ETF',
      content:
        '<p>据 CoinDesk 报道,摩根大通在周四的一份研究报告中表示,现货以太坊(ETH)交易所交易基金(ETF)的需求将远低于其比特币(BTC)同类产品,原因有几个。</p><p>摩根大通表示,预计今年剩余时间内,现货以太坊 ETF 将吸引高达30亿美元的净流入。如果允许质押,这一数字可能上升至60亿美元。</p><p>该报告由尼古拉斯·帕尼吉尔齐格卢等分析师撰写,"比特币拥有先发优势,可能已经满足了对加密资产的整体需求,这种需求是由于获批现货 ETF 而产生的。"</p><p>在美国,以太坊 ETF 接近可用,因为证券交易委员会(SEC)上周批准了申请人关键监管备案。但它们还未获准交易,因为监管机构还需要批准它们的S-1备案。比特币 ETF 从1月份开始交易。</p><p>该报告指出,4月份比特币奖励减半是现货比特币 ETF 的额外需求催化剂,但以太坊未来没有类似的推动力。此外,获批的现货以太坊 ETF 缺乏质押也使这些产品相比其他提供质押收益的平台更不吸引人。</p><p>报告作者写道,作为一种应用代币,以太坊"与比特币在投资者价值主张上有所不同,因为比特币在投资组合配置中具有更广泛的吸引力,可与黄金竞争"。</p><p>该行指出,较低的流动性和较低的管理资产将使以太坊现货 ETF 对机构投资者的吸引力低于其更大的竞争对手。</p><p>现货以太坊 ETF 推出初期的市场反应可能会是负面的,因为那些期望 Grayscale Ethereum Trust (ETHE)被转换为 ETF而买入的投机性投资者可能会获利了结。ETHE 可能会出现10亿美元的资金流出,这将给以太坊价格带来下行压力。</p>',
      url: 'https://tokeninsight.com/zh/news/jpmorgan-demand-for-spot-ethereum-etfs-will-be-a-lot-lower-compared-to-bitcoin-etfs?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/eth_staking2.png',
      source_url:
        'https://www.coindesk.com/markets/2024/05/30/ether-spot-etfs-to-see-much-lower-demand-than-bitcoin-versions-jpmorgan-says/',
      timestamp: 1717118929000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '纽约证交所考虑在监管更清晰时提供加密货币交易',
      content:
        '<p>据 CoinDesk 报道,纽约证券交易所的总裁表示,如果股市巨头扩展此类业务的监管地位更加明确,纽约证券交易所将考虑提供加密货币交易。</p><p>纽约证券交易所总裁林恩·马丁周三在德克萨斯州奥斯汀举行的 Consensus 2024小组讨论会上表示:"如果有明确的监管指引[在美国],这将是一个值得探索的机会。"</p><p>她补充说,美国上市的比特币(BTC)现货交易所交易基金(ETF)累计资产达580亿美元,这是对受监管加密产品需求的"强烈信号"。</p><p>尽管传统金融市场和数字资产之间的联系日益紧密,更多的传统金融巨头也在提供加密产品,但监管缺乏明确性仍然阻碍了行业创新,这是马丁和加密交易所 Bullish 的首席执行官汤姆·法利在小组讨论中提出的。(Bullish 是 CoinDesk 的母公司,法利之前曾在纽约证券交易所担任马丁的工作。)</p><p>"事实上,您已经看到约580亿美元流入 ETF,这是一个强烈的信号,表明市场正在寻求对传统结构的监管,"马丁说。"所以,希望 SEC 看到了这些流入,并说\'这确实很有意义\',考虑到比特币 ETF 已经取得了巨大成功。"</p><p>纽约证券交易所在美国的竞争对手芝加哥商业交易所(CME)是受监管加密货币期货交易的巨头,据英国《金融时报》本月初报道,它计划向客户推出现货加密货币交易。</p><p>法利强调了美国政治在加密货币问题上的突然转变,包括联邦存款保险公司(FDIC)反对加密货币主席被撤换,《21世纪金融创新和技术法案》(FIT21)在众议院获得通过,共和党总统热门人选唐纳德·特朗普迅速加强了对加密货币的支持。</p>',
      url: 'https://tokeninsight.com/zh/news/nyse-considers-to-offer-crypto-trading-if-regulatory-status-clearer?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/nyse.png',
      source_url:
        'https://www.coindesk.com/business/2024/05/29/nyse-would-consider-crypto-trading-if-regulatory-picture-were-clearer-president-says-at-consensus-2024/',
      timestamp: 1717039703000,
      tags: [
        {
          name: '政策与监管',
        },
      ],
    },
    {
      title: 'Ocean Protocol、Fetch AI 和 SingularityNET 计划于6月13日合并',
      content:
        '<p>据 The Defiant 报道,知名的基于 Web3的人工智能项目 Ocean Protocol、Fetch AI 和 SingularityNET - "人工超级智能联盟"(ASI)联盟 - 宣布他们即将进行的合并将在大约两周内完成。</p><p>5月29日,Fetch 宣布合并将于6月11日开始,首先是 Fetch 的原生 FET 代币更名为 ASI。用户将能够以1:1的比例将 FET迁移至 ASI,而 SingularityNET 的 AGIX 和 Ocean Protocol 的 OCEAN 的迁移计划则定于6月13日开始,兑换比率约为每代币0.433 ASI。</p><p>Fetch 表示,这三个项目总共拥有超过20万名代币持有者。</p><p>ASI 联盟 CEO 兼 SingularityNET 创始人本·戈特茨表示:"这次合并为人工智能开启了新纪元,我们通过整合优势实现了前所未有的进步。这只是集结致力于有益的去中心化人工通用智能(AGI)力量的更广泛行动的开始。"</p><p>ASI 联盟表示:"这一里程碑式的合作伙伴关系为挑战科技巨头在人工智能发展中的主导地位带来了强大阻力。这次融合...为利用区块链确保人工智能开发和部署的道德性和可信赖性奠定了基础,建立了开放、可扩展的人工智能基础设施。"</p><p>这三个项目于3月27日首次宣布了合并资产并建立共享"代币经济网络"的意图。各项目社区在4月通过了概述合并的治理提案。</p><p>ASI 联盟旨在成为一个去中心化的替代方案,以对抗目前主导人工智能行业创新和发展的集中式科技公司集团。</p><p>Fetch AI 创始人兼 DeepMind 的创始投资人 Humayun Sheikh 表示:"我们的使命是将我们的平台结合起来,确保人工智能的道德性和透明性,并去中心化人工智能。"</p>',
      url: 'https://tokeninsight.com/zh/news/ocean-protocol-fetch-ai-and-singularitynet-scheduled-to-merge-on-june-13?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/asi.png',
      source_url:
        'https://thedefiant.io/news/blockchains/fetch-ai-singularitynet-and-ocean-protocol-schedule-asi-alliance-merger-for-june-13',
      timestamp: 1717036050000,
      tags: [
        {
          name: 'AI',
        },
      ],
    },
    {
      title: '美国以太坊现货ETF有望在6月上市',
      content:
        '<p>根据 Cointelegraph 的报道,分析师表示,在贝莱德更新了启动所需的关键备案文件后,美国以太坊现货交易所交易基金(ETF)有"合法可能性"在6月下旬前推出。</p><p>5月29日,贝莱德在证券交易委员会更新了其 iShares 以太坊信托(ETHA)的 S-1表格,这是在监管机构批准其19b-4备案后的一周内进行的。</p><p>彭博 ETF 分析师埃里克·巴尔查纳斯在5月29日的一篇 X 帖子中表示:"这是个好兆头。[可能]很快会看到其他情况出现。"</p><p>他补充说,还可能会有另一轮"微调"SEC 意见的过程 - 但"6月底推出是个合法可能性"。不过,巴尔查纳斯仍把批准时间定在7月4日左右,并表示提前获批是"一个长 shot"。</p><p>彭博 ETF 分析师詹姆斯·赛法特表示,贝莱德更新的S-1表格"几乎肯定是我们一直在寻找的互动",因为这表明"发行人和 SEC 正在致力于以太坊现货ETF的推出"。</p><p>贝莱德修订后的 S-1表格提供了其种子资本投资者的信息 - 这个实体为基金分配资金,使其能够开始交易。</p><p>根据该备案文件,这位投资者 - 贝莱德的一家关联公司 - "于2024年5月21日同意以每股25美元的价格购买400,000股"。</p><p>该备案文件还指出,该 ETF 将在"ETHA"交易代码下上市和交易。</p>',
      url: 'https://tokeninsight.com/zh/news/the-u.s.-spot-ethereum-etf-possibly-launches-in-june?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/eth_staking2.png',
      source_url:
        'https://cointelegraph.com/news/ether-etf-launch-june-possible-blackrock-amended-s-1',
      timestamp: 1717033892000,
      tags: [
        {
          name: '以太坊',
        },
      ],
    },
    {
      title: '以太坊验证服务提供商 P2P.org 在 EigenLayer 上推出再质押功能',
      content:
        '<p>P2P.org 是一家以太坊区块链验证者和非托管质押工具提供商，该公司正通过新的 API 集成来优化质押奖励。</p><p>P2P.org 于 5 月 27 日宣布，已集成自动端到端质押 API，允许用户在 EigenLayer 等去中心化再质押协议上再质押以太币。</p><p>新推出的再质押 API 与 P2P.org 现有的以太坊 API 相集成，允许中介同时在以太坊上质押 ETH 并在 EigenLayer 上重新质押。</p><p>P2P.org 首席执行官 Alex Esin 表示：“中介机构一直在寻求为其客户增加价值并使其服务在竞争激烈的市场中脱颖而出的方法。” 他指出：“通过我们新的再质押 API，我们提供了一个功能强大的工具来实现这一点。” 他补充说：</p><p>“我们的客户现在可以为其用户提供轻松质押 ETH 的能力，直接从他们自己的平台最大化他们的质押奖励和空投机会。”</p><p>P2P.org 的新再质押 API 平台具有多种奖励，包括质押和再质押奖励、秘密共享验证者激励措施、EigenLayer 未来奖励以及预期的主动验证服务空投，所有这些都可以通过单个集成点访问。</p>',
      url: 'https://tokeninsight.com/zh/news/ethereum-validator-p2p.org-introduces-restaking-function-on-eigenlayer?utm_source=public&utm_medium=api',
      image_url: 'https://s2.tokeninsight.com/static/news/cover/img/p2p.png',
      source_url:
        'https://cointelegraph.com/news/ethereum-staking-p2p-restaking-api-eigenlayer',
      timestamp: 1716950983000,
      tags: [
        {
          name: '质押',
        },
      ],
    },
    {
      title: 'Aave 计划在 V4 升级后推出自己的区块链',
      content:
        '<p>在即将进行的 V4 升级后，Aave 正在寻求推出自己的区块链，名为 Aave Network。鉴于该借贷协议的总锁定价值 (TVL) 为 130 亿美元，因此提议的网络有可能成为 DeFi 中最大的 Layer 2 解决方案之一。</p><p>5 月 1 日，Aave 推出了其 V4 版本，该版本具有统一的跨链流动性层和流动性溢价。</p><p>昨天，在社交媒体上 Aave DAO 成员的猜测之后，Aave 首席执行官 Stani Kulechov 发帖称，“这不是演习，Aave Network 计划在 V4 之后推出。”</p><p>当被问及 V4 的时间表时，Kulechov 继续发帖称，“明年肯定。”虽然关于潜在的 Aave Network 的公开信息很少，但据推测该网络将由以太坊保护，并作为 Aave 协议及其原生稳定币 GHO 的中心。</p><p>Aave 社区对这个消息感到兴奋，Aave-Chan Initiative (ACI) 的创始人 Marc Zeller 等人物表示，“它也将成为以太坊和波场之后的第三大‘链’。”</p>',
      url: 'https://tokeninsight.com/zh/news/aave-plans-to-launch-own-blockchain-after-v4-upgrade?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/aave_fee.png',
      source_url:
        'https://thedefiant.io/news/defi/gnosis-pay-partners-with-visa-to-expand-web3-payments',
      timestamp: 1716949654000,
      tags: [
        {
          name: 'DeFi',
        },
        {
          name: 'Aave',
        },
      ],
    },
    {
      title: '贝莱德的收益和债券基金持有现货比特币 ETF',
      content:
        '<p>根据监管文件显示，贝莱德的收益和债券基金在第一季度购买了资产管理公司自己的现货比特币交易所交易基金 (ETF) 的股份。</p><p>根据 5 月 28 日美国证券交易委员会提交的文件，贝莱德的战略收益机会基金 (BSIIX) 买入了价值 356 万美元的 iShares 比特币信托基金 (IBIT)，而其战略全球债券基金 (MAWIX) 购买了 48.5 万美元。</p><p>IBIT 的股票是 BSIIX 和 MAWIX 投资组合的一小部分，分别价值 374 亿美元和 7.764 亿。</p><p>根据贝莱德 5 月 24 日的数据，IBIT 目前持有价值 196.1 亿美元的比特币。</p><p>灰度数据显示，它仅次于已转换的灰度比特币信托基金 (GBTC)，截至 5 月 28 日，该基金持有 197.6 亿美元。</p><p>根据 CoinGecko 的数据，全球现货比特币 ETF 目前持有超过 100 万枚比特币，价值超过 680 亿美元——相当于其超过 1970 万枚 BTC 流通供应量的近 5.10%。</p><p>最近的美国证券交易委员会 (SEC) 文件显示，自 1 月份推出以来，已有 600 多家美国投资公司购买了现货比特币 ETF。</p><p>摩根士丹利、摩根大通、富国银行、加拿大皇家银行、法国巴黎银行、瑞银和包括 Millennium Management 和 Schonfeld Strategic Advisors 在内的对冲基金都在购买比特币基金。</p><p>Millennium 是最大的现货比特币 ETF 持有者，投资了 19 亿美元，其中包括 8.442 亿美元投资于 IBIT，8.067 亿美元投资于 Fidelity Wise Origin Bitcoin Fund (FBTC)。</p>',
      url: 'https://tokeninsight.com/zh/news/blackrock-s-income-and-bond-funds-hold-spot-bitcoin-etf?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/blackrock.png',
      source_url: '',
      timestamp: 1716947123000,
      tags: [
        {
          name: '比特币',
        },
      ],
    },
    {
      title: '币安呼吁项目方打击低流通量和高 FDV 趋势',
      content:
        '<p>据 Cointelegraph 报道，加密货币交易所币安已呼吁中小型项目打击加密货币领域内的低流通量和高完全稀释估值 (FDV) 趋势。</p><p>5 月 20 日，币安邀请中小型项目申请其上市计划。该交易所表示，此举将支持具有可持续发展模式的中小型项目，有助于改善加密货币生态系统。其写道：</p><p>“我们希望通过支持具有强大基本面、有机社区基础、可持续商业模式和作为负责任的行业参与者而行动的敬业团队的中小型项目，来提升区块链生态系统的发展。”</p><p>此举似乎是对项目以高市值推出而许多代币仍被锁定的趋势做出的回应。</p><p>5 月 17 日，币安研究重点指出，以低流通供应量推出已在代币项目中变得越来越普遍。这些项目将代币供应的大部分分配给未来发行。</p><p>根据该报告，这些代币在牛市条件下会快速升值。这归因于推出期间可用的流动性有限。</p><p>币安写道：“然而，当一波代币供应在解锁后进入市场时，很明显这种价格增长是不可持续的。”</p><p>化名加密货币研究员 Flow 于 5 月 17 日发帖称，在过去六个月中，币安上市的代币中有 80% 自推出以来一直在下跌。</p><p>Flow 强调，由于初始流通供应量低，大多数新推出的代币充当了利用散户无法进入市场的优势的内部人士的“退出流动性”。</p><p>2024 年 5 月，预计将解锁价值约 30 亿美元的已归属加密货币代币。Sui 和 Pyth Network 等项目预计将解锁超过 10 亿美元分配给各种加密货币持有者（如早期投资者）的加密货币代币。</p><p>币安援引 Token Unlocks 和 CoinMarketCap 的数据估计，从 2024 年到 2030 年将解锁约 1550 亿美元的代币。</p><p>该交易所指出，在没有相应需求和资本流入增加的情况下，将要发布的代币数量将对市场造成重大的抛售压力。</p>',
      url: 'https://tokeninsight.com/zh/news/binance-calls-on-projects-to-combat-the-low-float-and-high-fdv-trend?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/binance_logo.png',
      source_url:
        'https://cointelegraph.com/news/binance-urges-small-medium-projects-high-fdv-trend',
      timestamp: 1716219689000,
      tags: [
        {
          name: '币安',
        },
      ],
    },
    {
      title: '全球最大的结算系统 DTCC 和 Chainlink 完成基金代币化试点计划',
      content:
        '<p>据 Cointelegraph 报道，全球最大的结算系统存管信托和清算公司 (DTCC) 和区块链预言机 Chainlink 已与美国几家主要银行公司完成了一项试点计划，旨在增加传统金融基金的代币化。</p><p>根据 5 月 16 日的 DTCC 报告，Smart NAV 试点计划旨在使用 Chainlink 的跨链互操作性协议 (CCIP) 在区块链上提供基金净资产价值 (NAV) 数据的标准化方法。</p><p>报告写道：“该试点发现，通过在链上提供结构化数据并创建标准的角色和流程，可以将基础数据嵌入到许多链上用例中，例如代币化基金和‘批量消费者’智能合约，这些合约保存了多个基金的数据。”</p><p>报告称，这些功能可以支持未来的行业探索，并为经纪应用程序、更自动化的数据传播和更轻松地访问基金的历史数据等“众多下游用例”提供动力。</p><p>DTCC 的报告指出，该试点有助于建立更好的自动化数据管理，对传统金融机构的现有市场实践产生有限的影响，使客户能够在不手动记录的情况下检索历史数据，并为价格数据提供了更广泛的 API 解决方案。</p><p>参与该试点的美国银行公司包括美国世纪投资、纽约梅隆银行、爱德华琼斯、富兰克林邓普顿、Invesco、摩根大通、MFS 投资管理公司、大西洋中部信托、道富银行和美国银行。</p>',
      url: 'https://tokeninsight.com/zh/news/world-largest-settlement-system-dtcc-and-chainlink-completed-fund-tokenization-pilot-program?utm_source=public&utm_medium=api',
      image_url:
        'https://s2.tokeninsight.com/static/news/cover/img/DTCC_(1).png',
      source_url:
        'https://cointelegraph.com/news/dtcc-chainlink-pilot-us-banks-fund-data-tokenization',
      timestamp: 1715921476000,
      tags: [
        {
          name: '预言机',
        },
      ],
    },
  ],
  page_info: {
    total_results: 300,
  },
})

const copyLink = () => {
  const linkToCopy = curLink.value // 你要复制的链接

  // 使用 Clipboard API 复制链接
  navigator.clipboard
    .writeText(linkToCopy)
    .then(() => {
      showToast('链接已复制！') // 显示提示
    })
    .catch((err) => {
      console.error('复制链接失败: ', err)
    })
}
const onSelect = (option) => {
  if (option.name === '复制链接') {
    copyLink()
  }
  else if (option.name === '分享到微信') {
    // 实现微信分享功能
  }
  showToast(option.name)
  showShare.value = false
}
const share = (link: string) => {
  curLink.value = link
  showShare.value = true
}
const nav = (url: string) => {
  showConfirmDialog({
    title: '您将跳转至下述网址',
    message: url,
  })
    .then(() => {
      // on confirm
      window.open(url, '_self')
    })
    .catch(() => {
      // on cancel
    })
}

const getData = async () => {
  const res = await cryptoApi.getNews({}).catch((err) => { console.log(err) })
  news.value = res.data
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.container-box {
  .href-link {
    color: #1989fa;
    cursor: pointer;
  }
}
</style>
