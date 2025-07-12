import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  AlertCircle, 
  Shield, 
  Zap, 
  Users, 
  Award,
  Ticket,
  Coins,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 모나세이프 관련 데이터
  const lotteryPools = [
    { 
      name: 'BTC 복권 풀', 
      participants: 1250, 
      maxParticipants: 2000, 
      prize: '2.5 BTC', 
      endTime: '2시간 후',
      volume: '1.2B',
      feeRate: '0.2%',
      status: 'active'
    },
    { 
      name: 'ETH 복권 풀', 
      participants: 890, 
      maxParticipants: 1500, 
      prize: '15 ETH', 
      endTime: '5시간 후',
      volume: '890M',
      feeRate: '0.2%',
      status: 'active'
    },
    { 
      name: 'SOL 복권 풀', 
      participants: 2100, 
      maxParticipants: 3000, 
      prize: '500 SOL', 
      endTime: '1시간 후',
      volume: '450M',
      feeRate: '0.2%',
      status: 'ending'
    },
  ];

  const ticketTypes = [
    {
      type: '전용 티켓',
      description: '청산을 통한 획득',
      quantity: 45,
      value: '2,250 USDT',
      restriction: '해당 코인 풀만',
      color: 'from-red-500 to-orange-500'
    },
    {
      type: '공용 티켓',
      description: '스테이킹을 통한 획득',
      quantity: 12,
      value: '1,200 USDT',
      restriction: '모든 풀 가능',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const marketData = [
    { symbol: 'BTC', price: '43,250', change: '+2.5%', volume: '1.2B', trend: 'up', feeRate: '0.4%' },
    { symbol: 'ETH', price: '2,850', change: '-1.2%', volume: '890M', trend: 'down', feeRate: '0.4%' },
    { symbol: 'SOL', price: '98.50', change: '+5.8%', volume: '450M', trend: 'up', feeRate: '0.4%' },
    { symbol: 'ADA', price: '0.45', change: '+0.8%', volume: '120M', trend: 'up', feeRate: '0.4%' },
  ];

  const insuranceStats = {
    totalPools: 20,
    activeUsers: 12500,
    totalVolume: '500M',
    accumulatedPrizes: '50M',
    weeklyWinners: 20,
    totalTickets: 45000
  };

  const announcements = [
    { 
      type: 'event', 
      title: '신규 사용자 이벤트', 
      content: '첫 거래 시 0.1% 수수료 면제!', 
      time: '2시간 전',
      priority: 'high'
    },
    { 
      type: 'update', 
      title: 'Chainlink 랜더마이즈 업데이트', 
      content: '더욱 공평하고 투명한 당첨자 선정 시스템 적용', 
      time: '1일 전',
      priority: 'medium'
    },
    { 
      type: 'announcement', 
      title: '응모권 NFT 마켓플레이스 오픈', 
      content: '응모권 거래가 가능한 NFT 마켓플레이스가 오픈되었습니다', 
      time: '3일 전',
      priority: 'high'
    },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp size={16} className="text-green-400" /> : 
      <TrendingDown size={16} className="text-red-400" />;
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'event': return <DollarSign size={16} className="text-purple-400" />;
      case 'update': return <Zap size={16} className="text-blue-400" />;
      case 'announcement': return <AlertCircle size={16} className="text-orange-400" />;
      default: return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: {
    icon: any;
    title: string;
    value: string;
    change?: string;
    color: string;
  }) => (
    <motion.div
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-sm font-semibold text-green-400">{change}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Tab Navigation */}
      <motion.div 
        className="flex bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-1 rounded-2xl mb-8 shadow-2xl border border-gray-700/50 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[
          { id: 'overview', label: '개요', icon: BarChart3 },
          { id: 'pools', label: '복권 풀', icon: Award },
          { id: 'tickets', label: '응모권', icon: Ticket },
          { id: 'market', label: '시장', icon: TrendingUp },
          { id: 'announcements', label: '공지사항', icon: AlertCircle }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 rounded-xl text-base font-semibold transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === tab.id 
                ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 통계 카드들 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Award}
              title="총 복권 풀"
              value={`${insuranceStats.totalPools}개`}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <StatCard
              icon={Users}
              title="활성 사용자"
              value={`${insuranceStats.activeUsers.toLocaleString()}명`}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              icon={DollarSign}
              title="총 거래량"
              value={`$${insuranceStats.totalVolume}`}
              color="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatCard
              icon={Shield}
              title="누적 상금"
              value={`$${insuranceStats.accumulatedPrizes}`}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* 인기 복권 풀 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-400" />
                인기 복권 풀
              </h2>
              <div className="space-y-4">
                {lotteryPools.map((pool, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-white text-lg">{pool.name}</h3>
                        <p className="text-gray-400 text-sm">거래량: {pool.volume} | 수수료: {pool.feeRate}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-400">{pool.endTime}</span>
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          pool.status === 'ending' ? 'bg-orange-400' : 'bg-green-400'
                        }`} />
                      </div>
                    </div>
                    <div className="text-gray-300 mb-3">
                      참가자: {pool.participants.toLocaleString()}/{pool.maxParticipants.toLocaleString()}명
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(pool.participants / pool.maxParticipants) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="text-lg font-bold text-purple-400">상금: {pool.prize}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 응모권 현황 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-green-400" />
                내 응모권
              </h2>
              <div className="space-y-4">
                {ticketTypes.map((ticket, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${ticket.color} flex items-center justify-center`}>
                          <Ticket className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{ticket.type}</h3>
                          <p className="text-gray-400 text-sm">{ticket.description}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">보유 수량</p>
                        <p className="text-white font-bold text-lg">{ticket.quantity}개</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">총 가치</p>
                        <p className="text-white font-bold text-lg">{ticket.value}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        <span className="text-purple-400 font-semibold">제약:</span> {ticket.restriction}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* 나머지 탭들은 간단하게 표시 */}
      {activeTab === 'pools' && (
        <div className="text-center py-20">
          <Award className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">모든 복권 풀</h2>
          <p className="text-gray-400">각 코인별 복권 풀 현황을 확인하세요</p>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="text-center py-20">
          <Ticket className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">응모권 관리</h2>
          <p className="text-gray-400">전용 티켓과 공용 티켓을 관리하세요</p>
        </div>
      )}

      {activeTab === 'market' && (
        <div className="text-center py-20">
          <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">시장 현황</h2>
          <p className="text-gray-400">실시간 시세와 거래량을 확인하세요</p>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {getAnnouncementIcon(announcement.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{announcement.time}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        announcement.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {announcement.priority === 'high' ? '중요' : '일반'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{announcement.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 