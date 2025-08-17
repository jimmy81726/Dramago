const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-900 mb-4 font-sans">
            DramaGo - 劇會平台
          </h1>
          <p className="text-xl text-brand-700">歡迎來到最新的戲劇聚會平台</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 ease-fluid border-l-4 border-brand-core">
            <div className="text-3xl mb-4">🎭</div>
            <h3 className="text-lg font-semibold mb-2 text-brand-800">
              創建活動
            </h3>
            <p className="text-brand-600">
              發起你的戲劇聚會，邀請志同道合的朋友
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 ease-fluid border-l-4 border-success">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2 text-brand-800">
              參與活動
            </h3>
            <p className="text-brand-600">加入有趣的戲劇活動，認識新朋友</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 ease-fluid border-l-4 border-warning">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2 text-brand-800">
              管理活動
            </h3>
            <p className="text-brand-600">輕鬆管理你的活動和參與者</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-brand-core text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-all duration-300 ease-snappy font-medium">
            開始使用
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-brand-600">
          <p>使用 Tailwind CSS v4 @theme 指令開發</p>
          <p className="mt-2">自定義顏色系統 + 緩動函數</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
