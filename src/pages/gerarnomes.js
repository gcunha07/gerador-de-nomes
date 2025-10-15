import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdicionarNome from '@/components/AdicionarNome'
import EditarProduto from '@/components/EditarProduto'
import { carregarProdutosAPI, eliminarProdutoAPI } from '@/services/api'

export default function Produtos() {
	const [produtos, setProdutos] = useState([])
	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [produtoToEdit, setProdutoToEdit] = useState(null)

	useEffect(() => {
		carregarProdutos()
	}, [])

	async function carregarProdutos() {
		try {
			const data = await carregarProdutosAPI()
			setProdutos(data)
		} catch (error) {
			alert('Erro ao carregar nomes')
		}
	}

	async function eliminarProduto(id) {
		if (confirm('Tens a certeza que queres eliminar este nome?')) {
			try {
				await eliminarProdutoAPI(id)
				setProdutos(produtos.filter(p => p._id !== id))
			} catch (error) {
				alert('Erro ao eliminar nome')
			}
		}
	}

	function handleEditProduto(produto) {
		setProdutoToEdit(produto)
		setShowEditModal(true)
	}

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Gerador de Nomes</h1>

				</div>
				<div className="">
					<button onClick={() => setShowAddModal(true)} className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
						Adicionar Nome
					</button>
					<button onClick={() => setShowAddModal(true)} className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
						Adicionar Apelido
					</button>
				</div>

			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-100">
						<tr>

							<th className="py-3 px-4 text-left font-semibold text-gray-700">Nome</th>
							<th className="py-3 px-4 text-left font-semibold text-gray-700">Apelido</th>

						</tr>
					</thead>
					<tbody>
						{produtos.map(produto => (
							<tr key={produto._id} className="border-b hover:bg-gray-50">
								<td className="py-3 px-4 text-gray-900">{produto._id}</td>
								<td className="py-3 px-4 text-gray-900 font-medium">{produto.nome}</td>
								<td className="py-3 px-4 text-blue-600 font-bold">€{produto.preco}</td>
								<td className="py-3 px-4">
									<div className="flex space-x-2">
										<Link href={`/produto/${produto._id}`} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
											Ver
										</Link>
										<button onClick={() => handleEditProduto(produto)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
											Editar
										</button>
										<button onClick={() => eliminarProduto(produto._id)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
											Eliminar
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modals */}
			<AdicionarProduto
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				onSuccess={carregarProdutos}
			/>

			<EditarProduto
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
				onSuccess={carregarProdutos}
				produto={produtoToEdit}
			/>
		</div>
	)
}
