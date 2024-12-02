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
const ENABLE_NOT_LIVE_POPUP = true;  // Set to false to disable the popup

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
              { id: 'staking', label: 'Staking', icon: <Rocket /> },
              { id: 'memes', label: 'Meme Vault', icon: <Laugh /> }
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
                  <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 ml-4 animate-bounce">
                    If you don't buy me, you are a fascist!
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-all">
                    <Zap className="mx-auto text-yellow-600 mb-2" />
                    <h3 className="font-bold">Ultra Deflationary</h3>
                    <p className="text-sm text-gray-600">Burning tokens faster than a dog chases a ball!</p>
                  </div>
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
                </div>
              </div>
            )}

            {activeTab === 'tokenomics' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  WOKED Tokenomics: Bark-onomics!
                </h2>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <Flame className="text-red-500" />
                      <span>Total Supply: 1,000,000,000 WOKED</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Zap className="text-yellow-500" />
                      <span>Burn Rate: 2% of every transaction (Bye-bye, tokens!)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Dog className="text-green-500" />
                      <span>Distribution: 40% Liquidity, 30% Community, 20% Dev, 10% Treats (Marketing)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'staking' && (
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Stake & Shake Those Gains!
                </h2>
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                  <p className="text-gray-700">
                    Provide liquidity and earn rewards faster than a dog chasing a tennis ball!
                  </p>
                  <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
                    <Rocket className="w-6 h-6" />
                    <span>Start Staking</span>
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    Warning: May cause excessive tail wagging
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'memes' && (
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-600 mb-4">
                  Meme Vault: Crypto Comedy Unleashed!
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num} 
                      className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-all transform hover:scale-105"
                    >
                      <img 
                        src={`/api/placeholder/300/200`} 
                        alt={`Meme ${num}`} 
                        className="w-full rounded-lg mb-2"
                      />
                      <p className="text-center text-gray-600">Epic Crypto Doge Meme #{num}</p>
                    </div>
                    
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-105">
                    Generate Random Meme
                  </button>
                </div>
              </div>
            )}
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