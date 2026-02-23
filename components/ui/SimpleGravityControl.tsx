'use client';

import { useState } from 'react';

export default function SimpleGravityControl() {
    const [mode, setMode] = useState<'normal' | 'zero' | 'reverse'>('normal');
    const [intensity, setIntensity] = useState(50);
    const [isActivated, setIsActivated] = useState(false);

    // 주인님을 위한 간단한 안티그래비티 제어
    const activateGravityControl = async () => {
        setIsActivated(true);
        
        // Google API로 직접 안티그래비티 명령
        try {
            const response = await fetch('/api/gravity-control', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode,
                    intensity,
                    apiKey: 'AIzaSyDNmtDeRX7-xRSefeKkJeH7cLrhBHSgwhI'
                })
            });

            const result = await response.json();
            console.log('주인님! 안티그래비티 활성화:', result);
            
        } catch (error) {
            console.error('안티그래비티 오류:', error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 p-6 rounded-xl border border-cyan-400/50 max-w-md">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">🧪 주인님 전용 안티그래비티</h3>
            
            <div className="space-y-4">
                {/* 모드 선택 */}
                <div>
                    <label className="text-sm text-cyan-200 block mb-2">중력 모드</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['normal', 'zero', 'reverse'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`p-2 rounded text-sm transition-all ${
                                    mode === m 
                                        ? 'bg-cyan-600 text-white' 
                                        : 'bg-gray-700 hover:bg-cyan-800'
                                }`}
                            >
                                {m === 'normal' ? '🌍' : m === 'zero' ? '🚀' : '🔄'} {m === 'normal' ? '정상' : m === 'zero' ? '무중력' : '반중력'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 강도 조절 */}
                <div>
                    <label className="text-sm text-cyan-200 block mb-2">
                        제어 강도: {intensity}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => setIntensity(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* 실행 버튼 */}
                <button
                    onClick={activateGravityControl}
                    disabled={isActivated}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                        isActivated 
                            ? 'bg-green-600 animate-pulse' 
                            : 'bg-cyan-600 hover:bg-cyan-700'
                    }`}
                >
                    {isActivated ? '✅ 안티그래비티 활성화됨!' : '🧪 안티그래비티 활성화'}
                </button>

                {/* 상태 표시 */}
                {isActivated && (
                    <div className="bg-black/50 p-3 rounded text-green-400 text-sm">
                        <div>🎯 상태: {mode} 모드 운영 중</div>
                        <div>⚡ 전력: {Math.round(intensity * 12.5)}W</div>
                        <div>🌍 중력: {mode === 'zero' ? '0.0' : mode === 'reverse' ? `-${(intensity/100*9.8).toFixed(1)}` : '9.8'} m/s²</div>
                        <div>🔬 안정성: {95 - intensity/10}%</div>
                    </div>
                )}
            </div>
        </div>
    );
}