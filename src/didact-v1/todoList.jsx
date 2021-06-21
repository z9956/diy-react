import { render, Component, createElement } from './didact';
/** @jsx createElement */

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					content: '待办1',
					id: 0,
				},
				{
					content: '待办2',
					id: 1,
				},
			],
		};
	}

	handleDelete(index) {
		const { list } = this.state;

		list.splice(index, 1);
		this.setState({ list });
	}

	handleAdd(e) {
		if (e.keyCode !== 13) return;

		const { list } = this.state;
		let { value: content } = e.target;

		content = content.trim();
		if (!content?.length) {
			return alert('请输入有效内容');
		}

		const id = Math.ceil(Math.random() * 1000);
		const detail = {
			id,
			content,
		};

		list.unshift(detail);
		this.setState({ list });

		const $content = document.querySelector('.content');
		$content.value = '';
	}

	render() {
		const { title } = this.props;
		const { list } = this.state;

		return (
			<div>
				<h3>{title}</h3>

				<p>
					请输入内容:{' '}
					<input
						className="content"
						type="text"
						onKeyDown={(e) => this.handleAdd(e)}
					/>
				</p>
				<ul>
					{list &&
						list.map((item, index) => {
							return (
								<li key={item.id}>
									<span>{item.content}</span>
									<button
										style="cursor: pointer"
										type="submit"
										onClick={() => this.handleDelete(index)}
									>
										delete
									</button>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}

render(<TodoList title={'todo-list'} />, document.getElementById('root'));
