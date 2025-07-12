import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Play, 
  Pause,
  Award,
  Ticket,
  Coins,
  Clock,
  BarChart3,
  ArrowDown,
  CheckCircle,
  Star
} from 'lucide-react';

// 인터랙티브 파티클 시스템
const InteractiveParticles = () => {
  const [particles, setParticles] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        if (newX > window.innerWidth) newX = 0;
        if (newX < 0) newX = window.innerWidth;
        if (newY > window.innerHeight) newY = 0;
        if (newY < 0) newY = window.innerHeight;
        
        return {
          ...particle,
          x: newX,
          y: newY,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 스크롤 섹션 컴포넌트
const ScrollSection = ({ 
  children, 
  className = "", 
  delay = 0 
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.section
    className={`min-h-screen flex items-center justify-center px-4 ${className}`}
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.section>
);

// 특징 카드 컴포넌트
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay = 0,
  isHighlighted = false 
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
  isHighlighted?: boolean;
}) => (
  <motion.div
    className={`relative group cursor-pointer rounded-3xl p-8 ${gradient} border border-white/10 backdrop-blur-sm ${
      isHighlighted ? 'ring-2 ring-purple-400 shadow-2xl shadow-purple-500/25' : ''
    }`}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ 
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
    }}
  >
    <motion.div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)',
      }}
    />
    
    <div className="relative z-10">
      <motion.div
        className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
    </div>
  </motion.div>
);

// 스크롤 인디케이터
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <span className="text-sm mb-2">스크롤하여 더 알아보기</span>
    <ArrowDown className="w-6 h-6" />
  </motion.div>
);

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative">
      <InteractiveParticles />
      
      {/* 메인 히어로 섹션 */}
      <ScrollSection>
        <motion.div 
          className="text-center max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
                      <motion.h1 
              className="text-7xl md:text-9xl font-black text-white mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                MonaDraw
              </span>
            </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            자체 Dex 선물시장에서 일부 수수료를 모아<br />
            <span className="text-purple-400 font-semibold">시장에서 청산당한 한 사람에게 모든 상금을 지급</span>하는<br />
            혁신적인 보험 디파이 프로젝트
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              지금 시작하기
            </motion.button>
            
            <motion.button
              className="px-10 py-5 border-2 border-purple-500 text-purple-400 font-bold rounded-2xl text-xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 inline mr-2" />
              프로젝트 소개
            </motion.button>
          </motion.div>

          <ScrollIndicator />
        </motion.div>
      </ScrollSection>

      {/* 섹션 1: 복권 풀 시스템 */}
      <ScrollSection delay={0.2}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 font-semibold">핵심 시스템 1</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                복권 풀 시스템
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              각 선물 시장마다 단 하나의 복권 풀만이 존재하며<br />
              각 복권풀마다 당첨자도 단 한명입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Award}
              title="단일 풀"
              description="각 코인별로 오직 하나의 복권 풀만 존재하여 명확하고 집중된 시스템"
              gradient="bg-gradient-to-br from-purple-500/20 to-purple-600/20"
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="단일 당첨자"
              description="각 복권 풀마다 단 한 명의 당첨자만 선정되어 상금의 집중도 극대화"
              gradient="bg-gradient-to-br from-blue-500/20 to-cyan-600/20"
              delay={0.2}
              isHighlighted={true}
            />
            <FeatureCard
              icon={BarChart3}
              title="투명한 구조"
              description="단순하고 명확한 구조로 모든 참여자가 이해하기 쉬운 시스템"
              gradient="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
              delay={0.3}
            />
          </div>
        </div>
      </ScrollSection>

      {/* 섹션 2: 티켓 획득 방법 */}
      <ScrollSection delay={0.2}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
              <Ticket className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-semibold">핵심 시스템 2</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                티켓 획득
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              티켓을 획득할 수 있는 방법은 두 가지가 존재합니다<br />
              이 티켓들을 각 복권풀에 예치하는 방법으로 복권에 응모할 수 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-3xl p-8 border border-red-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">전용 티켓</h3>
                  <p className="text-gray-300">청산을 통한 획득</p>
                </div>
              </div>
                             <p className="text-gray-300 text-lg leading-relaxed mb-6">
                 MonaDraw 선물시장에서 청산을 당했을 때, 청산 금액에 비례하여 해당 코인 복권풀에만 응모 가능한 티켓을 획득합니다.
               </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-300 font-semibold">특징: 청산된 코인의 복권풀에만 응모 가능</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-3xl p-8 border border-green-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">공용 티켓</h3>
                  <p className="text-gray-300">스테이킹을 통한 획득</p>
                </div>
              </div>
                             <p className="text-gray-300 text-lg leading-relaxed mb-6">
                 MonaDraw 코인을 스테이킹하여 모든 복권풀에 응모 가능한 범용 티켓을 획득합니다.
               </p>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p className="text-green-300 font-semibold">특징: 모든 복권풀에 응모 가능 (전략적 활용)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* 섹션 3: Chainlink 랜더마이즈 */}
      <ScrollSection delay={0.2}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-8">
              <Zap className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold">핵심 시스템 3</span>
            </div>
                         <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
               <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                 Chainlink 랜더마이즈
               </span>
             </h2>
                         <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
               Chainlink의 랜더마이즈 기능을 통해 공평하고 투명하게 당첨자가 정해지며<br />
               각 복권풀마다 발행된 티켓의 총 수량을 인풋하여 각 풀마다 한명의 당첨자를 선별합니다
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <FeatureCard
               icon={Zap}
               title="Chainlink VRF"
               description="검증 가능한 랜덤 함수를 통해 완전히 공정하고 예측 불가능한 당첨자 선정"
               gradient="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
               delay={0.1}
             />
            <FeatureCard
              icon={CheckCircle}
              title="투명성 보장"
              description="블록체인상에서 모든 과정이 투명하게 기록되어 조작 불가능"
              gradient="bg-gradient-to-br from-blue-500/20 to-cyan-600/20"
              delay={0.2}
              isHighlighted={true}
            />
            <FeatureCard
              icon={BarChart3}
              title="수량 기반 선정"
              description="발행된 티켓의 총 수량을 기준으로 정확한 확률 계산"
              gradient="bg-gradient-to-br from-purple-500/20 to-purple-600/20"
              delay={0.3}
            />
          </div>
        </div>
      </ScrollSection>

      {/* 섹션 4: 주간 당첨 시스템 */}
      <ScrollSection delay={0.2}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Clock className="w-6 h-6 text-orange-400" />
              <span className="text-orange-400 font-semibold">핵심 시스템 4</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                주간 당첨 시스템
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              각 복권풀의 당첨 주기는 1주일이며<br />
              만약 당첨된 티켓이 해당 복권풀에 예치가 되지 않은 상태라면<br />
              그 누적 금액은 그 다음 주로 이연되어 상금이 누적됩니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-3xl p-8 border border-orange-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">1주일 주기</h3>
                  <p className="text-gray-300">정기적인 당첨</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                각 복권풀은 1주일 주기로 당첨자가 선정되어 지속적인 참여 동기를 제공합니다.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">상금 누적</h3>
                  <p className="text-gray-300">이연 시스템</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                당첨된 티켓이 예치되지 않은 경우 상금이 다음 주로 이연되어 더 큰 상금을 제공합니다.
              </p>
            </motion.div>
          </div>

          {/* CTA 섹션 */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
                         <h3 className="text-3xl font-bold text-white mb-6">
               지금 바로 MonaDraw를 시작하세요
             </h3>
            <motion.button
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              시작하기 <ArrowRight className="w-6 h-6 inline ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default Hero; 