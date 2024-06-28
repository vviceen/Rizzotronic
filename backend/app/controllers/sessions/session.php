<link href="../public/output.css" rel="stylesheet">

<!-- component -->
<!-- Create by joker banny - copy and edit by luquitas -->

<div class="h-screen bg-indigo-100 flex justify-center items-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<form class="bg-white space-y-4 p-10 rounded-lg shadow-lg min-w-full" action="verificar.php" method="post">
			<h1 class="text-center text-2xl mb-6 font-bold font-sans">Form Register</h1>

			<div>
				<label class="text-gray-700 font-semibold block my-1 text-md" for="username">Username</label>
				<input class="w-full border border-indigo-300 px-4 py-2 rounded-md" type="text" name="username" placeholder="username" />
			</div>

			<div>
				<label class="text-gray-700 font-semibold block my-1 text-md" for="password">Password</label>
				<input class="w-full border border-indigo-300 px-4 py-2 rounded-md" type="text" name="password" placeholder="password" />
			</div>

			<div>
				<button type="submit" name="register" class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
				<button type="submit" name="login" class="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Login</button>
			</div>
		</form>
	</div>
</div>