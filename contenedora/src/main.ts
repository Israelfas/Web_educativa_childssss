import './style.css'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null

const MODULOS = [
  { id: 'react', label: 'Matemáticas', src: '/react/' },
  { id: 'vue', label: 'Lengua con IA', src: '/vue/' },
  { id: 'angular', label: 'Inglés', src: '/angular/' },
]

function renderizar() {
  const token = localStorage.getItem('token')
  const usuario = localStorage.getItem('usuario')

  if (token) {
    renderApp(usuario)
  } else {
    renderLogin()
  }
}

function renderLogin() {
  document.getElementById('app')!.innerHTML = `
    <div id="login-view">
      <div class="card">
        <h1>DrawTale Edu</h1>
        <p>Inicia sesión para acceder a los módulos</p>
        <form id="login-form">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="tu@correo.com" required />

          <label for="password">Contraseña</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <button type="submit">Iniciar sesión</button>
          <p id="login-error" class="error"></p>
        </form>
      </div>
    </div>
  `

  document.getElementById('login-form')!.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = (document.getElementById('email') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement).value
    const errorEl = document.getElementById('login-error')!

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        errorEl.textContent = error.message
        return
      }
      const token = data.session?.access_token ?? ''
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', email)
    } else {
      if (email && password) {
        localStorage.setItem('token', 'mock-token-' + Date.now())
        localStorage.setItem('usuario', email)
      } else {
        errorEl.textContent = 'Ingresa credenciales válidas'
        return
      }
    }

    renderizar()
  })
}

function renderApp(usuario: string | null) {
  document.getElementById('app')!.innerHTML = `
    <div id="app-view">
      <header>
        <span class="logo">DrawTale Edu</span>
        <div class="user-info">
          <span>${usuario ?? ''}</span>
          <button id="logout-btn">Cerrar sesión</button>
        </div>
      </header>
      <nav id="menu">
        ${MODULOS.map((m) => `<button data-src="${m.src}">${m.label}</button>`).join('')}
      </nav>
      <iframe id="marco" src="${MODULOS[0].src}"></iframe>
    </div>
  `

  document.getElementById('app-view')!.style.display = 'flex'

  document.getElementById('logout-btn')!.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    if (supabase) supabase.auth.signOut()
    renderizar()
  })

  const marco = document.getElementById('marco') as HTMLIFrameElement
  document.querySelectorAll<HTMLButtonElement>('#menu button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#menu button').forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      marco.src = btn.dataset.src ?? ''
    })
  })

  ;(document.querySelector('#menu button') as HTMLButtonElement)?.classList.add('active')
}

renderizar()
