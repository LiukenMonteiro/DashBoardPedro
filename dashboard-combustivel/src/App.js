import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Moon, Sun, Download } from 'lucide-react';

const DashboardCombustivel = () => {
  const [tipoFrota, setTipoFrota] = useState('todas');
  const [ordenacao, setOrdenacao] = useState('consumo');
  const [darkMode, setDarkMode] = useState(false);

  // Dados da Frota Pesada
  const frotaPesada = [
    { placa: 'TET6B91', kmPercorrido: 3017, litros: 1143.48, mediaEfetiva: 2.64, valorTotal: 7160.73, status: 'ativo' },
    { placa: 'TET6B92', kmPercorrido: 2298, litros: 873.59, mediaEfetiva: 2.63, valorTotal: 5302.66, status: 'oficina' },
    { placa: 'TET6B95', kmPercorrido: 4155, litros: 1374.89, mediaEfetiva: 3.02, valorTotal: 8263.08, status: 'ativo' },
    { placa: 'TET6B98', kmPercorrido: 3443, litros: 1234.59, mediaEfetiva: 2.79, valorTotal: 7511.99, status: 'ativo' },
    { placa: 'TEX3I10', kmPercorrido: 4071, litros: 1298.12, mediaEfetiva: 3.14, valorTotal: 7747.72, status: 'ativo' },
    { placa: 'TEX3I02', kmPercorrido: 1119, litros: 408.89, mediaEfetiva: 2.74, valorTotal: 2457.46, status: 'oficina' },
    { placa: 'TEX3I04', kmPercorrido: 2509, litros: 792.15, mediaEfetiva: 3.17, valorTotal: 4760.81, status: 'ativo' },
    { placa: 'TEX3I13', kmPercorrido: 3028, litros: 899.9, mediaEfetiva: 3.36, valorTotal: 5657.94, status: 'ativo' },
    { placa: 'TEX3I16', kmPercorrido: 3033, litros: 1092.66, mediaEfetiva: 2.78, valorTotal: 6566.70, status: 'ativo' },
    { placa: 'TTB4J67', kmPercorrido: 1622, litros: 491.18, mediaEfetiva: 3.30, valorTotal: 3144.67, status: 'ativo' },
    { placa: 'TTD6I16', kmPercorrido: 2648, litros: 967.34, mediaEfetiva: 2.74, valorTotal: 5813.75, status: 'ativo' },
    { placa: 'TTK1E94', kmPercorrido: 3174, litros: 787.08, mediaEfetiva: 4.03, valorTotal: 4730.42, status: 'ativo' },
    { placa: 'TTK6A34', kmPercorrido: 2379, litros: 869.37, mediaEfetiva: 2.74, valorTotal: 5398.21, status: 'ativo' },
    { placa: 'TTL3J30', kmPercorrido: 4590, litros: 1379.32, mediaEfetiva: 3.33, valorTotal: 8897.04, status: 'ativo' },
    { placa: 'TTL4A94', kmPercorrido: 2296, litros: 778.96, mediaEfetiva: 2.95, valorTotal: 4681.53, status: 'ativo' },
    { placa: 'TTS1F40', kmPercorrido: 3123, litros: 1064.39, mediaEfetiva: 2.93, valorTotal: 6565.31, status: 'ativo' },
    { placa: 'TTT1F26', kmPercorrido: 3761, litros: 1225.02, mediaEfetiva: 3.07, valorTotal: 7902.23, status: 'ativo' },
    { placa: 'TUG1F45', kmPercorrido: 2802, litros: 841.59, mediaEfetiva: 3.33, valorTotal: 5057.98, status: 'ativo' },
    { placa: 'TUH1F69', kmPercorrido: 4208, litros: 1258.65, mediaEfetiva: 3.34, valorTotal: 7793.97, status: 'ativo' },
    { placa: 'TUJ1E59', kmPercorrido: 3812, litros: 1393.00, mediaEfetiva: 2.74, valorTotal: 8857.66, status: 'ativo' },
    { placa: 'TUV1F51', kmPercorrido: 2984, litros: 997.77, mediaEfetiva: 2.99, valorTotal: 6317.10, status: 'ativo' },
    { placa: 'TEX3I05', kmPercorrido: 3635, litros: 1166.79, mediaEfetiva: 3.12, valorTotal: 7614.27, status: 'ativo' },
  ];

  // Dados da Frota Leve
  const frotaLeve = [
    { placa: 'HKA6J92', kmPercorrido: 3967, litros: 315.5, mediaEfetiva: 12.57, valorTotal: 1973.03, status: 'ativo' },
    { placa: 'RVI0F81', kmPercorrido: 3834, litros: 441.98, mediaEfetiva: 8.67, valorTotal: 2758.34, status: 'ativo' },
    { placa: 'RVI0F83', kmPercorrido: 3460, litros: 337.51, mediaEfetiva: 10.25, valorTotal: 2108.51, status: 'ativo' },
    { placa: 'RVI0F85', kmPercorrido: 2432, litros: 204.65, mediaEfetiva: 11.88, valorTotal: 1359.87, status: 'ativo' },
    { placa: 'RVI0F94', kmPercorrido: 3144, litros: 293.24, mediaEfetiva: 10.72, valorTotal: 1843.32, status: 'ativo' },
    { placa: 'RVI0F95', kmPercorrido: 7388, litros: 611.34, mediaEfetiva: 12.08, valorTotal: 3911.13, status: 'ativo' },
    { placa: 'SYA0B13', kmPercorrido: 3316, litros: 248.13, mediaEfetiva: 13.36, valorTotal: 1548.44, status: 'ativo' },
    { placa: 'SYA0B15', kmPercorrido: 1751, litros: 124.24, mediaEfetiva: 14.09, valorTotal: 775.30, status: 'ativo' },
    { placa: 'SYA0B18', kmPercorrido: 3491, litros: 283.14, mediaEfetiva: 12.33, valorTotal: 1766.34, status: 'ativo' },
    { placa: 'SYB4E24', kmPercorrido: 2154, litros: 80, mediaEfetiva: 26.92, valorTotal: 509.05, status: 'ativo' },
    { placa: 'SIW0J76', kmPercorrido: 1122, litros: 95.06, mediaEfetiva: 11.80, valorTotal: 593.21, status: 'ativo' },
    { placa: 'TDN5J22', kmPercorrido: 1009, litros: 106.86, mediaEfetiva: 9.44, valorTotal: 686.12, status: 'ativo' },
    { placa: 'TDN5J30', kmPercorrido: 5172, litros: 487.1, mediaEfetiva: 10.62, valorTotal: 2924.49, status: 'ativo' },
    { placa: 'TDN5J34', kmPercorrido: 5090, litros: 404.33, mediaEfetiva: 12.59, valorTotal: 2620.10, status: 'ativo' },
    { placa: 'TDN5J36', kmPercorrido: 4917, litros: 416.83, mediaEfetiva: 11.80, valorTotal: 2505.79, status: 'ativo' },
    { placa: 'TDN5J37', kmPercorrido: 5059, litros: 445.1, mediaEfetiva: 11.37, valorTotal: 2795.35, status: 'ativo' },
    { placa: 'TJQ3J69', kmPercorrido: 1550, litros: 100.53, mediaEfetiva: 15.42, valorTotal: 626.59, status: 'ativo' },
    { placa: 'TJS0D56', kmPercorrido: 309, litros: 36.06, mediaEfetiva: 8.57, valorTotal: 231.98, status: 'ativo' },
  ];

  // Dados da Máquina
  const maquinas = [
    { placa: 'EQU2X02', litros: 625.02, valorTotal: 3771.72, tipo: 'Máquina' },
  ];

  const dadosCombinados = useMemo(() => {
    let dados = [];
    if (tipoFrota === 'todas' || tipoFrota === 'pesada') {
      dados = [...dados, ...frotaPesada.map(v => ({ ...v, tipo: 'Pesada' }))];
    }
    if (tipoFrota === 'todas' || tipoFrota === 'leve') {
      dados = [...dados, ...frotaLeve.map(v => ({ ...v, tipo: 'Leve' }))];
    }
    
    if (ordenacao === 'consumo') {
      dados.sort((a, b) => b.litros - a.litros);
    } else if (ordenacao === 'eficiencia') {
      dados.sort((a, b) => b.mediaEfetiva - a.mediaEfetiva);
    } else if (ordenacao === 'custo') {
      dados.sort((a, b) => b.valorTotal - a.valorTotal);
    }
    
    return dados;
  }, [tipoFrota, ordenacao, frotaPesada, frotaLeve]);

  const totais = useMemo(() => {
    const totalPesada = frotaPesada.reduce((acc, v) => ({
      litros: acc.litros + v.litros,
      valor: acc.valor + v.valorTotal,
      km: acc.km + v.kmPercorrido
    }), { litros: 0, valor: 0, km: 0 });

    const totalLeve = frotaLeve.reduce((acc, v) => ({
      litros: acc.litros + v.litros,
      valor: acc.valor + v.valorTotal,
      km: acc.km + v.kmPercorrido
    }), { litros: 0, valor: 0, km: 0 });

    const totalMaquinas = maquinas.reduce((acc, v) => ({
      litros: acc.litros + v.litros,
      valor: acc.valor + v.valorTotal
    }), { litros: 0, valor: 0 });

    return {
      pesada: totalPesada,
      leve: totalLeve,
      maquinas: totalMaquinas,
      geral: {
        litros: totalPesada.litros + totalLeve.litros + totalMaquinas.litros,
        valor: totalPesada.valor + totalLeve.valor + totalMaquinas.valor,
        km: totalPesada.km + totalLeve.km
      }
    };
  }, [frotaPesada, frotaLeve, maquinas]);

  const dadosPizza = [
    { name: 'Frota Pesada', value: totais.pesada.valor, litros: totais.pesada.litros },
    { name: 'Frota Leve', value: totais.leve.valor, litros: totais.leve.litros },
    { name: 'Máquinas', value: totais.maquinas.valor, litros: totais.maquinas.litros },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  const top10Consumo = [...dadosCombinados]
    .sort((a, b) => b.litros - a.litros)
    .slice(0, 10);

  const exportarDados = () => {
    const csvContent = [
      ['RELATÓRIO DE CONSUMO DE COMBUSTÍVEL - DEZEMBRO 2024'],
      [''],
      ['RESUMO GERAL'],
      ['Total Gasto', `R$ ${totais.geral.valor.toFixed(2)}`],
      ['Total Litros', `${totais.geral.litros.toFixed(2)} L`],
      ['Total KM', `${totais.geral.km} km`],
      [''],
      ['FROTA PESADA'],
      ['Placa', 'KM Percorrido', 'Litros', 'Média km/L', 'Valor Total'],
      ...frotaPesada.map(v => [v.placa, v.kmPercorrido, v.litros, v.mediaEfetiva, v.valorTotal]),
      [''],
      ['FROTA LEVE'],
      ['Placa', 'KM Percorrido', 'Litros', 'Média km/L', 'Valor Total'],
      ...frotaLeve.map(v => [v.placa, v.kmPercorrido, v.litros, v.mediaEfetiva, v.valorTotal]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_combustivel_dezembro_2024.csv';
    link.click();
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-gray-100' : 'text-slate-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-slate-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-slate-200';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-50';

  return (
    <div className={`min-h-screen ${bgClass} p-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`${cardBg} rounded-lg shadow-lg p-6 mb-6`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>
                Dashboard de Consumo de Combustível
              </h1>
              <p className={textSecondary}>Relatório Mensal - Dezembro 2024 | UT. Maranhão</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportarDados}
                className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition-colors`}
              >
                <Download size={20} />
                Exportar CSV
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-200 hover:bg-slate-300'} rounded-lg transition-colors`}
                title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
              >
                {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-slate-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${cardBg} rounded-lg shadow p-5`}>
            <div className={`text-sm ${textSecondary} mb-1`}>Total Gasto</div>
            <div className="text-2xl font-bold text-blue-600">
              R$ {totais.geral.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div className={`${cardBg} rounded-lg shadow p-5`}>
            <div className={`text-sm ${textSecondary} mb-1`}>Total Litros</div>
            <div className="text-2xl font-bold text-green-600">
              {totais.geral.litros.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} L
            </div>
          </div>
          
          <div className={`${cardBg} rounded-lg shadow p-5`}>
            <div className={`text-sm ${textSecondary} mb-1`}>KM Percorrido</div>
            <div className="text-2xl font-bold text-purple-600">
              {totais.geral.km.toLocaleString('pt-BR')} km
            </div>
          </div>
          
          <div className={`${cardBg} rounded-lg shadow p-5`}>
            <div className={`text-sm ${textSecondary} mb-1`}>Veículos Ativos</div>
            <div className="text-2xl font-bold text-orange-600">
              {frotaPesada.length + frotaLeve.length}
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico de Pizza */}
          <div className={`${cardBg} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold ${textPrimary} mb-4`}>Distribuição de Custos por Frota</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPizza}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Resumo por Tipo */}
          <div className={`${cardBg} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold ${textPrimary} mb-4`}>Resumo por Tipo de Frota</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className={`text-sm ${textSecondary}`}>Frota Pesada</div>
                <div className={`text-lg font-bold ${textPrimary}`}>
                  {totais.pesada.litros.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} L
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  R$ {totais.pesada.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${textSecondary}`}>
                  {totais.pesada.km.toLocaleString('pt-BR')} km percorridos
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <div className={`text-sm ${textSecondary}`}>Frota Leve</div>
                <div className={`text-lg font-bold ${textPrimary}`}>
                  {totais.leve.litros.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} L
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  R$ {totais.leve.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${textSecondary}`}>
                  {totais.leve.km.toLocaleString('pt-BR')} km percorridos
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <div className={`text-sm ${textSecondary}`}>Máquinas</div>
                <div className={`text-lg font-bold ${textPrimary}`}>
                  {totais.maquinas.litros.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} L
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  R$ {totais.maquinas.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 10 Veículos */}
        <div className={`${cardBg} rounded-lg shadow-lg p-6 mb-6`}>
          <h2 className={`text-xl font-bold ${textPrimary} mb-4`}>Top 10 Veículos - Maior Consumo</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={top10Consumo}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e2e8f0'} />
              <XAxis 
                dataKey="placa" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                stroke={darkMode ? '#9ca3af' : '#64748b'}
              />
              <YAxis stroke={darkMode ? '#9ca3af' : '#64748b'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e2e8f0'}`,
                  color: darkMode ? '#f3f4f6' : '#1e293b'
                }}
                formatter={(value, name) => {
                  if (name === 'litros') return [`${value.toFixed(2)} L`, 'Consumo'];
                  return value;
                }}
              />
              <Legend />
              <Bar dataKey="litros" fill="#3b82f6" name="Litros Consumidos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela Detalhada */}
        <div className={`${cardBg} rounded-lg shadow-lg p-6`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className={`text-xl font-bold ${textPrimary}`}>Detalhamento por Veículo</h2>
            
            <div className="flex gap-3 flex-wrap">
              <select
                value={tipoFrota}
                onChange={(e) => setTipoFrota(e.target.value)}
                className={`px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-slate-300 text-slate-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="todas">Todas as Frotas</option>
                <option value="pesada">Frota Pesada</option>
                <option value="leve">Frota Leve</option>
              </select>

              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className={`px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-slate-300 text-slate-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="consumo">Ordenar por Consumo</option>
                <option value="eficiencia">Ordenar por Eficiência</option>
                <option value="custo">Ordenar por Custo</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${borderColor}`}>
                  <th className={`text-left py-3 px-4 text-sm font-semibold ${textSecondary}`}>Placa</th>
                  <th className={`text-left py-3 px-4 text-sm font-semibold ${textSecondary}`}>Tipo</th>
                  <th className={`text-right py-3 px-4 text-sm font-semibold ${textSecondary}`}>KM</th>
                  <th className={`text-right py-3 px-4 text-sm font-semibold ${textSecondary}`}>Litros</th>
                  <th className={`text-right py-3 px-4 text-sm font-semibold ${textSecondary}`}>Média (km/L)</th>
                  <th className={`text-right py-3 px-4 text-sm font-semibold ${textSecondary}`}>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {dadosCombinados.map((veiculo, index) => (
                  <tr key={index} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                    <td className={`py-3 px-4 font-medium ${textPrimary}`}>{veiculo.placa}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        veiculo.tipo === 'Pesada' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {veiculo.tipo}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right ${textSecondary}`}>
                      {veiculo.kmPercorrido?.toLocaleString('pt-BR')}
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${textPrimary}`}>
                      {veiculo.litros.toFixed(2)}
                    </td>
                    <td className={`py-3 px-4 text-right ${textSecondary}`}>
                      {veiculo.mediaEfetiva.toFixed(2)}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${textPrimary}`}>
                      R$ {veiculo.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCombustivel;