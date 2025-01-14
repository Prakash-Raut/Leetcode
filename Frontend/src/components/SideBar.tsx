function SideBar() {
	return (
		<div className="z-10 drawer">
			<input
				id="my-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>

			<div className="drawer-side">
				<label
					htmlFor="my-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
					{/* Sidebar content here */}
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
