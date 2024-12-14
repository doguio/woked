import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Flame, 
  Sandwich, 
  Trophy, 
  Dog, 
  Zap, 
  Rocket, 
  Coffee,
  PawPrint,
  Laugh
} from 'lucide-react';

// Configuration constant
const ENABLE_NOT_LIVE_POPUP = false;  // Set to false to disable the popup

const WokedCoinWebsite = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [showMemeAnimation, setShowMemeAnimation] = useState(false);
  const [dogQuote, setDogQuote] = useState('');
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(ENABLE_NOT_LIVE_POPUP);

  useEffect(() => {
    // Remove the timer since the popup should not be dismissible
    if (ENABLE_NOT_LIVE_POPUP) {
      setIsPopupVisible(true);
    }
  }, []);

  const dogMemeQuotes = [
    "Much blockchain. Very finance. Wow.",
    "I'm not just a good boy, I'm a crypto boy!",
    "Hodl me closer, crypto trader.",
    "Who let the doge out? We did!",
    "Crypto is my treat, and I'm a very good boy.",
  ];

  const triggerMemeAnimation = () => {
    setDogQuote(dogMemeQuotes[Math.floor(Math.random() * dogMemeQuotes.length)]);
    setShowMemeAnimation(true);
    setTimeout(() => setShowMemeAnimation(false), 3000);
  };

  const WOKED_TOKEN_ADDRESS = "0xYOUR_TOKEN_ADDRESS_HERE"; // Replace with actual token address

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col overflow-hidden">
      {/* Initial Load Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-2xl p-6 w-[480px] max-w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
            <p className="text-gray-700 mb-4">
              This website is not live yet, and the coin contract hasn't been deployed.
            </p>
          </div>
        </div>
      )}

      {/* Meme Animation Overlay */}
      {showMemeAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-center">
            <img 
              src="/woked.jpeg"
              alt="Woked Coin Meme Dog" 
              className="animate-bounce w-64 h-64 rounded-full border-8 border-yellow-400 mx-auto mb-4"
            />
            <p className="text-white text-2xl font-bold animate-pulse">{dogQuote}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 bg-white bg-opacity-90 shadow-md p-4 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/woked.jpeg"
              alt="Woked Coin Logo" 
              className="w-16 h-16 rounded-full border-4 border-yellow-400  animate-spin-slow"
            />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600">
              Woke Dog Coin (WOKED)
            </h1>
          </div>
          <div className="space-x-4 flex items-center">
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded ${activeTab === 'about' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2 rounded ${activeTab === 'roadmap' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              Roadmap
            </button>
            <button 
              onClick={triggerMemeAnimation}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Laugh className="w-5 h-5" />
              <span>Much Wow!</span>
            </button>
            <button 
              onClick={() => setIsTradeDialogOpen(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <PawPrint className="w-5 h-5" />
              <span>Buy WOKED</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6 relative z-10">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'about', label: 'About', icon: <Dog /> },
              { id: 'tokenomics', label: 'Tokenomics', icon: <Flame /> },
              { id: 'roadmap', label: 'Roadmap', icon: <Trophy /> },
              { id: 'liquidityMining', label: <Rocket />, label: 'Liquidity Mining' },
              { id: 'wokePapers', label: 'Woke Papers', icon: <Laugh /> }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 p-4 transform transition-all hover:scale-105 ${
                  activeTab === tab.id 
                    ? 'bg-yellow-50 text-yellow-600 border-b-4 border-yellow-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
            {/* Airdrop Registration Button */}
            <button 
              onClick={() => setActiveTab('airdrop')}
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 mx-auto mt-4"
            >
              Airdrop Registration is Live!
            </button>
          </div>

          {/* Content Sections with Playful Design */}
          <div className="p-8">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Welcome to the WOKED Revolution!
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  WOKED Coin isn't just a cryptocurrency - it's a movement powered by 
                  memes, community, and the unstoppable spirit of the internet's favorite 
                  four-legged friend: the DOGE!
                </p>
                {/* Large Center Logo */}
                <div className="inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img 
                    src="/woked.jpeg"
                    alt="Woked Background" 
                    className="w-60 h-60"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-all">
                    <Dog className="mx-auto text-green-600 mb-2" />
                    <h3 className="font-bold">Community Powered</h3>
                    <p className="text-sm text-gray-600">More bark, more value!</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg text-center hover:bg-purple-200 transition-all">
                    <Rocket className="mx-auto text-purple-600 mb-2" />
                    <h3 className="font-bold">To the Moon</h3>
                    <p className="text-sm text-gray-600">Fetch those gains!</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-all">
                    <Flame className="mx-auto text-yellow-600 mb-2" />
                    <h3 className="font-bold">Airdrop</h3>
                    <p className="text-sm text-gray-600">Get started with 5% (50M tokens) for our community!</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-6">
                  The Most Politically Correct Roadmap Ever 🗺️
                </h3>
                <div className="space-y-8 relative before:absolute before:left-5 before:top-0 before:w-0.5 before:h-full before:bg-gradient-to-b before:from-green-500 before:via-purple-500 before:to-indigo-500">
                  {[
                    {
                      icon: <Trophy />,
                      color: 'green',
                      title: 'Phase 1: Safe Space Community Building',
                      description: 'Creating an inclusive echo chamber where everyone agrees with everything. Trigger warnings included. 🤗'
                    },
                    {
                      icon: <Coins />,
                      color: 'purple',
                      title: 'Phase 2: Token Launch',
                      description: 'Fair launch* (*Terms and conditions apply based on your pronouns) 🚀'
                    },
                    {
                      icon: <PawPrint />,
                      color: 'blue',
                      title: 'Phase 3: Privilege-Based Airdrop Registration',
                      description: 'Complete our 23-page privilege assessment form. Extra tokens for checking your privilege! 📝'
                    },
                    {
                      icon: <Zap />,
                      color: 'yellow',
                      title: 'Phase 4: Social Justice Airdrop',
                      description: 'Tokens distributed based on your oppression score. Trust fund kids get priority access! 💰'
                    },
                    {
                      icon: <Rocket />,
                      color: 'red',
                      title: 'Phase 5: Ethical Staking & Rewards',
                      description: 'Stake your tokens to earn social credit points. Higher rewards for virtue signaling! 💰'
                    },
                    {
                      icon: <Trophy />,
                      color: 'orange',
                      title: 'Phase 6: Token Management by DAO',
                      description: 'Transitioning to a decentralized governance model where token holders can vote on key decisions. 🗳️'
                    },
                    {
                      icon: <Coffee />,
                      color: 'pink',
                      title: 'Phase 7: Politically Correct Casino',
                      description: 'Gender-neutral gambling games. Every player is a winner because competition is a social construct! 🎰'
                    },
                    {
                      icon: <Sandwich />,
                      color: 'indigo',
                      title: 'Phase 8: Partnerships & Cultural Appropriation',
                      description: 'Expanding to new markets while being mindful of our carbon footprint. Vegan-friendly transactions only! 🌱'
                    }
                  ].map((phase, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <div 
                        className={`bg-${phase.color}-500 rounded-full p-2 z-10 shadow-lg 
                          hover:scale-110 hover:rotate-12 transition-all duration-300 ease-in-out`}
                      >
                        <div className="w-5 h-5 text-white">
                          {phase.icon}
                        </div>
                      </div>
                      <div 
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex-grow
                          shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
                      >
                        <h4 className={`text-lg font-bold text-${phase.color}-600 mb-2`}>
                          {phase.title}
                        </h4>
                        <p className="text-gray-600">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tokenomics' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  WOKED Tokenomics: Community Focused!
                </h2>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <Flame className="text-red-500" />
                      <span>Airdrop: 5% (50M tokens)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Zap className="text-yellow-500" />
                      <span>Liquidity Mining: 30% (300M tokens)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Dog className="text-green-500" />
                      <span>Team/Development: 15% (150M tokens)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <PawPrint className="text-blue-500" />
                      <span>Community Growth: 10% (100M tokens)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Coffee className="text-pink-500" />
                      <span>Casino Games: 4% (40M tokens) [from Future Ecosystem Reserve]</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Rocket className="text-purple-500" />
                      <span>Remaining Ecosystem Reserve: 36% (360M tokens) - Managed by a DAO</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'liquidityMining' && (
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Liquidity Mining: Earn While You Provide!
                </h2>
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                  <h3 className="text-xl font-bold">Woke Dog Coin Liquidity Mining Program</h3>
                  <p>🌟 Welcome to the Woke Dog Coin Liquidity Mining Program! 🌟</p>
                  <p>Our Liquidity Mining Program is designed to reward 🎁 users who contribute to the growth 🌿 and stability of the Woke Dog Coin (🐶‍🌲 WOKED) ecosystem. By providing ⚓️ liquidity, you not only help strengthen our 🌐 token but also earn 💰 generous rewards. Here’s everything you need to know to get started:</p>
                  
                  <h4>What is Liquidity Mining?</h4>
                  <p>Liquidity mining allows users to earn 💸 WOKED tokens by providing liquidity to decentralized exchanges like Uniswap 🏢. This ⚓️ liquidity ensures smooth 🚕 trading for WOKED holders and supports the overall health of the token ecosystem.</p>
                  
                  <h4>How It Works</h4>
                  <p><strong>Provide Liquidity:</strong> Add an equal value of WOKED 💵 and ETH ⚖️ to the WOKED/ETH 🔄 liquidity pool on Uniswap. In return, you will receive 🏦 Liquidity Provider (LP) tokens representing your share of the pool.</p>
                  <p><strong>Stake Your LP Tokens:</strong> Stake your LP 🏦 tokens in the Woke Dog Coin Liquidity Mining smart 🧠 contract via our official platform.</p>
                  <p><strong>Earn Rewards:</strong> Earn 💰 WOKED tokens as rewards proportional to your contribution ⚓️ to the pool. Rewards 🏆 are distributed continuously and can be claimed 🛠️ directly from the platform.</p>
                  
                  <h4>Key Features of the Program</h4>
                  <ul>
                    <li>Generous Reward Allocation: 30% ➕ of the total WOKED supply (💸 300M tokens) is allocated for liquidity mining rewards.</li>
                    <li>Time-Based Rewards: Longer ⏳ stakers are rewarded more, incentivizing sustained 🌱 participation.</li>
                    <li>Bonus Multiplier: Early participants ⏭️ and long-term stakers receive bonus rewards 💎.</li>
                    <li>No Lock-In: Withdraw your LP 🏦 tokens at any time, but holding longer maximizes 🏆 rewards.</li>
                  </ul>
                  
                  <h4>Step-by-Step Guide</h4>
                  <p><strong>Prepare Your Wallet:</strong> Ensure your 🛍️ wallet (e.g., MetaMask) is connected to Ethereum ⚓️. Acquire WOKED tokens 💸 and ETH for liquidity provision.</p>
                  <p><strong>Add Liquidity on Uniswap:</strong> Visit the Uniswap WOKED/ETH Pool 🏢 (insert link). Add an equal value of WOKED 💵 and ETH ⚖️ to the pool. Confirm the transaction in your 🛍️ wallet to receive LP tokens 🏦.</p>
                  <p><strong>Stake Your LP Tokens:</strong> Visit the Woke Dog Coin Liquidity Mining Page 🔄 (insert link). Connect your 🛍️ wallet and approve the staking contract 🧠. Stake your LP tokens and start earning 🏆 rewards immediately.</p>
                  <p><strong>Claim Your Rewards:</strong> Monitor your 🏆 rewards in real-time ⏳. Claim ✅ rewards directly to your 🛍️ wallet whenever you’re ready.</p>
                  
                  <h4>Reward Structure</h4>
                  <p>Initial Boost: For the first 3 months, enjoy a ➕ 20% bonus on all 🏆 rewards for staking LP tokens.</p>
                  <p>Time Multiplier: Earn higher rewards 🏆 based on the duration ⏳ of your stake.</p>
                  <ul>
                    <li>1 month: Base ➕ rewards</li>
                    <li>3 months: 1.2x 🔄 rewards</li>
                    <li>6 months or more: 1.5x rewards 🏆</li>
                  </ul>
                  <p>Early Participant Bonus: The first 1,000 ➕ stakers will receive an additional 10% reward multiplier 💰.</p>
                  
                  <h4>Why Join the Liquidity Mining Program?</h4>
                  <ul>
                    <li>Passive Income: Earn WOKED tokens 💰 just by providing liquidity ⚓️.</li>
                    <li>Strengthen the Ecosystem: Support the growth 🌿 and stability of Woke Dog Coin 🐶‍🌲.</li>
                    <li>Scarcity Mechanism: A portion of transaction fees 📈 generated from the pool will be burned 🔥, reducing supply ➖ and increasing 🌐 token value.</li>
                  </ul>
                  
                  <h4>FAQs</h4>
                  <p><strong>What happens to my staked LP tokens?</strong> Your LP 🏦 tokens remain in the 🧠 smart contract and can be withdrawn at any time ⏳. They continue to generate trading 🚕 fees while staked.</p>
                  <p><strong>Are there risks involved?</strong> Yes, providing liquidity ⚓️ carries risks such as impermanent loss ➖. Please ensure you understand these risks before participating ✅.</p>
                  <p><strong>How are rewards calculated?</strong> Rewards 🏆 are distributed based on the proportion of your staked LP 🏦 tokens in the pool and the time ⏳ multiplier for your stake.</p>
                  
                  <h4>Join the Liquidity Mining Program Today!</h4>
                  <p>Become part of the Woke Dog Coin 🐶‍🌲 revolution. Stake your LP tokens 🏦, earn rewards 🏆, and support the 🔥 meme coin with a mission. Visit our Liquidity Mining Platform 🔄 (insert link) to get started now!</p>
                  <p className="text-gray-700">
                    Provide liquidity and earn rewards faster than a dog chasing a tennis ball!
                  </p>
                  <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
                    <Rocket className="w-6 h-6" />
                    <span>Start Liquidity Mining</span>
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    Warning: May cause excessive tail wagging
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'airdrop' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Airdrop Registration
                </h2>
                <iframe
                  src="https://airdrop.woked.me/"
                  height="660px"
                  width="100%"
                  className="border-0 rounded-xl"
                />
              </div>
            )}

            {activeTab === 'wokePapers' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Woke Papers
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Taco" className="text-2xl">🌮</span>
                    <a href="/wokepapers/latino-paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Latino Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Chopsticks" className="text-2xl">🥢</span>
                    <a href="/wokepapers/asian-paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Asian Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="African Drum" className="text-2xl">🪘</span>
                    <a href="/wokepapers/african-paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">African Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Flag of Europe" className="text-2xl">🇪🇺</span>
                    <a href="/wokepapers/european-paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">European Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Feather" className="text-2xl">🪶</span>
                    <a href="/wokepapers/indigenous-paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Indigenous Paper</a>
                  </li>
                </ul>
              </div>
            )}

            {/* About the Team Section */}
            <div className="mt-12 bg-gradient-to-r from-yellow-200 to-green-200 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-8">
                Meet the Team: The Most Inclusive Crew Ever!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md text-center">
                  <img src="/woked.jpeg" alt="Founder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Founder: Everyone</h3>
                  <p className="text-gray-600">
                    Our founder is literally everyone! Yes, you heard it right. We believe in a truly inclusive approach where every voice matters. So, if you feel like you’re part of the team, congratulations! You are!
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md text-center">
                  <img src="/chatgpt.jpg" alt="ChatGPT" className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Developer: ChatGPT</h3>
                  <p className="text-gray-600">
                    Meet ChatGPT, our AI developer who can code faster than you can say "blockchain." Just don’t ask it to explain memes; it’s still working on that.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md text-center">
                  <img src="/claude.jpg" alt="Claude AI" className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Developer: Claude AI</h3>
                  <p className="text-gray-600">
                    Claude AI is our other developer, known for its ability to generate code and existential crises simultaneously. It’s like having a philosopher on the team, but with more syntax errors.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-md text-center">
                  <img src="/grok.jpg" alt="Grok" className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Marketing Manager: Grok</h3>
                  <p className="text-gray-600">
                    Grok is our marketing guru who understands memes better than most humans. If you need a viral campaign, just ask Grok—after all, it’s all about the vibes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Trade Dialog */}
      {isTradeDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-4 w-[480px] max-w-full mx-4 relative">
            <button 
              onClick={() => setIsTradeDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Buy WOKED</h2>
            <iframe
              src={`https://app.uniswap.org/#/swap?outputCurrency=${WOKED_TOKEN_ADDRESS}&theme=light`}
              height="660px"
              width="100%"
              className="border-0 rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-white bg-opacity-90 p-4 backdrop-blur-sm">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 Woked Coin. Bark Responsibly. Much Compliance. Very Legal. 🐶
        </div>
      </footer>
    </div>
  );
};

export default WokedCoinWebsite;