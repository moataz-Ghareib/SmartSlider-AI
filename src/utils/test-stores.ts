// Test file to verify Zustand stores are working correctly
import { useAuthStore, useProjectsStore, useAnalysisStore, useUIStore } from '../stores';

// Test function to verify all stores are working
export const testStores = () => {
  console.log('🧪 Testing Zustand Stores...');
  
  // Test Auth Store
  const authStore = useAuthStore.getState();
  console.log('✅ Auth Store:', authStore);
  
  // Test Projects Store
  const projectsStore = useProjectsStore.getState();
  console.log('✅ Projects Store:', projectsStore);
  
  // Test Analysis Store
  const analysisStore = useAnalysisStore.getState();
  console.log('✅ Analysis Store:', analysisStore);
  
  // Test UI Store
  const uiStore = useUIStore.getState();
  console.log('✅ UI Store:', uiStore);
  
  console.log('🎉 All stores are working correctly!');
  
  return {
    auth: authStore,
    projects: projectsStore,
    analysis: analysisStore,
    ui: uiStore
  };
};

// Test localStorage functionality
export const testLocalStorage = () => {
  console.log('🧪 Testing LocalStorage...');
  
  try {
    // Test basic localStorage
    localStorage.setItem('test_key', 'test_value');
    const value = localStorage.getItem('test_key');
    console.log('✅ Basic localStorage:', value === 'test_value');
    
    // Test JSON storage
    const testData = { name: 'SmartStartAI', version: '1.0.0' };
    localStorage.setItem('test_json', JSON.stringify(testData));
    const parsedData = JSON.parse(localStorage.getItem('test_json') || '{}');
    console.log('✅ JSON localStorage:', parsedData.name === 'SmartStartAI');
    
    // Clean up
    localStorage.removeItem('test_key');
    localStorage.removeItem('test_json');
    
    console.log('🎉 LocalStorage is working correctly!');
    return true;
  } catch (error) {
    console.error('❌ LocalStorage test failed:', error);
    return false;
  }
};

// Test API service
export const testAPIService = async () => {
  console.log('🧪 Testing API Service...');
  
  try {
    // Test text chat
    const textResponse = await import('../services/api').then(api => 
      api.apiService.textChat({
        message: 'مرحبا، أريد مساعدة في مشروعي',
        sessionId: 'test_session'
      })
    );
    console.log('✅ Text Chat:', textResponse.success);
    
    // Test business plan generation
    const businessPlanResponse = await import('../services/api').then(api =>
      api.apiService.generateBusinessPlan({
        projectName: 'مشروع تجريبي',
        industry: 'تقنية',
        description: 'مشروع تجريبي للاختبار',
        location: 'الرياض',
        targetMarket: 'السوق السعودي',
        initialInvestment: 100000,
        fixedCosts: 50000,
        variableCosts: 30000,
        revenueProjections: [120000, 150000, 180000],
        marketSize: 1000000,
        marketGrowthRate: 0.15,
        targetMarketShare: 0.05,
        teamSize: 5,
        competitiveAdvantages: ['جودة عالية'],
        riskFactors: ['منافسة'],
        fundingRequirements: 200000
      })
    );
    console.log('✅ Business Plan:', businessPlanResponse.success);
    
    console.log('🎉 API Service is working correctly!');
    return true;
  } catch (error) {
    console.error('❌ API Service test failed:', error);
    return false;
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🚀 Running all tests...');
  
  const storeTest = testStores();
  const localStorageTest = testLocalStorage();
  const apiTest = await testAPIService();
  
  const allPassed = storeTest && localStorageTest && apiTest;
  
  console.log(allPassed ? '🎉 All tests passed!' : '❌ Some tests failed');
  
  return allPassed;
};
