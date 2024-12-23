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
import { ethers } from 'ethers';
import { FaTwitter, FaTelegram } from 'react-icons/fa';

// Configuration constant
const ENABLE_NOT_LIVE_POPUP = false;  // Set to false to disable the popup

// Add the ABI for the relevant functions from OwnerDistributedAirdrop
const AIRDROP_ABI = [
  "function recipients(address) view returns (uint256 totalAmount, uint256 claimedAmount, uint256 startTime)",
  "function calculateClaimableAmount(address) view returns (uint256)",
  "function distributeToRecipient(address) external"
];

const WokedCoinWebsite = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [showMemeAnimation, setShowMemeAnimation] = useState(false);
  const [dogQuote, setDogQuote] = useState('');
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(ENABLE_NOT_LIVE_POPUP);
  const [walletConnected, setWalletConnected] = useState(false);
  const [vestingInfo, setVestingInfo] = useState(null);
  const [claimableAmount, setClaimableAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [manualWalletAddress, setManualWalletAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const WOKED_TOKEN_ADDRESS = "0xfA1Ec0f92f2D0fdf080BBFBb2a598D616D6b06Fc"; // Base TEstnet

  const AIRDROP_CONTRACT_ADDRESS = "0xa3B7CCBc151825860FA10DDbd3593A87E16aE95C";

  useEffect(() => {
    if (walletConnected) {
      fetchVestingInfo();
    }
  }, [walletConnected]);

  const fetchVestingInfo = async () => {
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, signer);
      
      const address = await signer.getAddress();
      const info = await contract.recipients(address);
      const claimable = await contract.calculateClaimableAmount(address);
      
      setVestingInfo({
        totalAmount: info.totalAmount,
        claimedAmount: info.claimedAmount,
        startTime: info.startTime.toNumber()
      });
      setClaimableAmount(claimable);
      
      // Calculate current month based on start time
      const monthsSinceStart = Math.floor((Date.now() / 1000 - info.startTime.toNumber()) / (30 * 24 * 60 * 60));
      setCurrentMonth(Math.min(monthsSinceStart + 1, 6));
      
    } catch (error) {
      console.error('Error fetching vesting info:', error);
      alert('Error fetching vesting information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaim = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, signer);
      
      const tx = await contract.distributeToRecipient(await signer.getAddress());
      await tx.wait();
      
      alert('Tokens claimed successfully!');
      fetchVestingInfo(); // Refresh the vesting info
    } catch (error) {
      console.error('Error claiming tokens:', error);
      alert('Error claiming tokens. Please try again.');
    }
  };

  const validateAddress = (address) => {
    try {
      return ethers.utils.isAddress(address);
    } catch {
      return false;
    }
  };

  const fetchVestingInfoByAddress = async (address) => {
    try {
      setIsLoading(true);
      // Use a public provider if MetaMask is not available
      const provider = new ethers.providers.JsonRpcProvider("https://mainnet.base.org"); // Replace with your Ethereum RPC URL
      const contract = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, provider);
      
      const info = await contract.recipients(address);
      const claimable = await contract.calculateClaimableAmount(address);
      
      setVestingInfo({
        totalAmount: info.totalAmount,
        claimedAmount: info.claimedAmount,
        startTime: info.startTime.toNumber()
      });
      setClaimableAmount(claimable);
      
      const monthsSinceStart = Math.floor((Date.now() / 1000 - info.startTime.toNumber()) / (30 * 24 * 60 * 60));
      setCurrentMonth(Math.min(monthsSinceStart + 1, 6));
      
    } catch (error) {
      console.error('Error fetching vesting info:', error);
      alert('Error fetching vesting information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/woked.jpeg"
              alt="Woked Coin Logo" 
              className="w-16 h-16 rounded-full border-4 border-yellow-400 animate-spin-slow mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 ml-4">
              Woke Dog Coin (WOKED)
            </h1>
            {/* Social Media Links */}
            <div className="absolute left-90 top-20 flex space-x-4 ml-4">
              <a href="https://x.com/wokedcoin" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                <FaTwitter className="w-8 h-8" />
              </a>
              <a href="https://t.me/wokedogcoin" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                <FaTelegram className="w-8 h-8" />
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <div className={`flex-col md:flex-row md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} md:space-x-4`}>
            <button 
              onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'about' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Dog className="w-5 h-5" />
              <span>About</span>
            </button>
            <button 
              onClick={() => { setActiveTab('tokenomics'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'tokenomics' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Flame className="w-5 h-5" />
              <span>Tokenomics</span>
            </button>
            <button 
              onClick={() => { setActiveTab('roadmap'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'roadmap' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Roadmap</span>
            </button>
            <button 
              onClick={() => { setActiveTab('liquidityMining'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'liquidityMining' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Rocket className="w-5 h-5" />
              <span>Liquidity Mining</span>
            </button>
            <button 
              onClick={() => { setActiveTab('wokePapers'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'wokePapers' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Laugh className="w-5 h-5" />
              <span>Woke Papers</span>
            </button>
            <button 
              onClick={() => { setActiveTab('airdropVesting'); setIsMobileMenuOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-transform transform hover:scale-105 ${activeTab === 'airdropVesting' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              <Zap className="w-5 h-5" />
              <span>Airdrop Vesting</span>
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
                  <p><strong>Earn Rewards:</strong> Earn �� WOKED tokens as rewards proportional to your contribution ⚓️ to the pool. Rewards 🏆 are distributed continuously and can be claimed 🛠️ directly from the platform.</p>
                  
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
                  <p>Initial Boost: For the first 3 months, enjoy a ➕ 20% bonus on all rewards for staking LP tokens.</p>
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
                    <a href="/wokepapers/Latino_Paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Latino Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Chopsticks" className="text-2xl">🥢</span>
                    <a href="/wokepapers/Asian_Paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Asian Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="African Drum" className="text-2xl">🪘</span>
                    <a href="/wokepapers/African_Paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">African Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Flag of Europe" className="text-2xl">🇪🇺</span>
                    <a href="/wokepapers/European_Paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">European Paper</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span role="img" aria-label="Feather" className="text-2xl">🪶</span>
                    <a href="/wokepapers/Indigenous_Paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Indigenous Paper</a>
                  </li>
                </ul>

                <section className="my-8 p-4 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Download the Whitepaper</h2>
                <p className="mb-4">
                  **Why a Whitepaper?**  
                  Isn't it time we rethink the term "white paper"? After all, who decided that only white papers get to be the authoritative voice? Let's embrace inclusivity! Download our *not-so-privileged* Whitepaper and join the conversation.
                </p>
                <a 
                  href="/wokepapers/Whitepaper.pdf" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  download
                >
                  **Download the Whitepaper**
                </a>
                <p className="mt-4">
                  **P.S.** This document is packed with insights that are as colorful as the perspectives we aim to include. Let's make knowledge accessible to everyone, regardless of the color of the paper!
                </p>
              </section>
              </div>
            )}

            {activeTab === 'airdropVesting' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Airdrop Vesting Schedule
                </h2>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
                  <div className="vesting-checker space-y-6">
                    {/* Connection Options */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-purple-600">Check Your Vesting Status</h3>
                      
                      {/* MetaMask Connection */}
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold">Option 1: Connect with MetaMask</h4>
                          <p className="text-sm text-gray-600">Connect your wallet to check and claim tokens</p>
                        </div>
                        <button 
                          onClick={async () => {
                            try {
                              if (!window.ethereum) throw new Error("Please install MetaMask");
                              await window.ethereum.request({ method: 'eth_requestAccounts' });
                              setWalletConnected(true);
                              setManualWalletAddress(''); // Clear manual address when connecting MetaMask
                            } catch (error) {
                              console.error(error);
                              alert("Failed to connect wallet: " + error.message);
                            }
                          }}
                          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-all"
                        >
                          {walletConnected ? 'Wallet Connected' : 'Connect MetaMask'}
                        </button>
                      </div>

                      {/* Manual Address Input */}
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <h4 className="font-semibold mb-2">Option 2: Enter Wallet Address</h4>
                        <p className="text-sm text-gray-600 mb-4">Check vesting status for any address (view-only)</p>
                        <div className="flex gap-4">
                          <div className="flex-grow">
                            <input
                              type="text"
                              placeholder="Enter Ethereum wallet address (0x...)"
                              value={manualWalletAddress}
                              onChange={(e) => {
                                const address = e.target.value;
                                setManualWalletAddress(address);
                                setIsValidAddress(validateAddress(address));
                              }}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isValidAddress ? 'border-gray-300' : 'border-red-500'
                              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            {!isValidAddress && manualWalletAddress && (
                              <p className="text-red-500 text-sm mt-1">Please enter a valid Ethereum address</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (validateAddress(manualWalletAddress)) {
                                fetchVestingInfoByAddress(manualWalletAddress);
                              }
                            }}
                            disabled={!isValidAddress || !manualWalletAddress}
                            className={`px-4 py-2 rounded-full ${
                              isValidAddress && manualWalletAddress
                                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                : 'bg-gray-300 cursor-not-allowed text-gray-500'
                            } transition-all`}
                          >
                            Check Status
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Vesting Schedule Display */}
                    {vestingInfo && (
                      <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-purple-600">Total Allocation</h4>
                            <p className="text-2xl font-bold">{ethers.utils.formatEther(vestingInfo.totalAmount)} WOKED</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-purple-600">Claimed Amount</h4>
                            <p className="text-2xl font-bold">{ethers.utils.formatEther(vestingInfo.claimedAmount)} WOKED</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-purple-600">Currently Claimable</h4>
                            <p className="text-2xl font-bold">{ethers.utils.formatEther(claimableAmount)} WOKED</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-purple-600">Vesting Start Date</h4>
                            <p className="text-2xl font-bold">{new Date(vestingInfo.startTime * 1000).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {/* Vesting Schedule Progress */}
                        <div className="mt-6">
                          <h4 className="font-semibold text-purple-600 mb-4">Vesting Progress</h4>
                          <div className="space-y-4">
                            {[
                              { month: 1, percentage: 10 },
                              { month: 2, percentage: 30 },
                              { month: 3, percentage: 50 },
                              { month: 4, percentage: 70 },
                              { month: 5, percentage: 90 },
                              { month: 6, percentage: 100 }
                            ].map((period) => {
                              const isUnlocked = currentMonth >= period.month;
                              return (
                                <div key={period.month} className="relative">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-purple-600">Month {period.month}</span>
                                    <span className="text-sm font-medium text-purple-600">{period.percentage}%</span>
                                  </div>
                                  <div className="w-full bg-purple-200 rounded-full h-2.5">
                                    <div 
                                      className={`h-2.5 rounded-full ${isUnlocked ? 'bg-purple-600' : 'bg-gray-300'}`}
                                      style={{ width: `${period.percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Claim Button */}
                        {Number(claimableAmount) > 0 && (
                          <button
                            onClick={handleClaim}
                            className="w-full mt-6 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                          >
                            <Rocket className="w-5 h-5" />
                            <span>Claim Available Tokens</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-purple-600">Loading vesting information...</p>
                      </div>
                    )}
                  </div>
                </div>
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
              src="https://app.uniswap.org/explore/pools/base/0x850a47ADC887871C68597f5fe3209da4D01cD993"
              height="600px"
              width="100%"
              className="border-0 rounded-xl"
            />
            <script>
              {`const iframe = document.querySelector('iframe');
              iframe.onload = () => {
                  iframe.contentWindow.postMessage(
                      { type: 'selectTab', tab: 'Swap' }, 
                      'https://app.uniswap.org'
                  );
                  iframe.contentWindow.postMessage(
                      { type: 'selectChart', chart: 'Price' }, 
                      'https://app.uniswap.org'
                  );
              };`}
            </script>
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