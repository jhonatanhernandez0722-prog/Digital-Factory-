"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Label from "@radix-ui/react-label";
import { useEffect, useState } from "react";

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
};

const whatsappNumber = "573003682415";

const menuItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Información", href: "#informacion" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Inscripción", href: "#inscripcion" },
];

const features = [
  "Sesiones guiadas y contenido práctico",
  "Networking con profesionales del sector",
  "Acceso a materiales y recursos exclusivos",
];

const eventImages = [
  {
    src: "/1.jpeg",
    alt: "Aprendices SENA reunidos durante una jornada de formación",
  },
  {
    src: "/2.jpg",
    alt: "Jóvenes talento SENA en un espacio de innovación",
  },
  {
    src: "/3.jpg",
    alt: "Equipo SENA durante una presentación grupal",
  },
  {
    src: "/4.jpg",
    alt: "Vista exterior del Nodo TIC en Barranquilla",
  },
];

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Información", href: "#informacion" },
  { label: "Inscripción", href: "#inscripcion" },
];

export default function Home() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (scrollDelta > 8 && currentScrollY > 120) {
        setIsHeaderVisible(false);
      } else if (scrollDelta < -8) {
        setIsHeaderVisible(true);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      nextErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Ingresa un correo válido.";
    }

    if (!formData.telefono.trim()) {
      nextErrors.telefono = "El teléfono es obligatorio.";
    }

    if (!formData.mensaje.trim()) {
      nextErrors.mensaje = "Escribe un mensaje o motivo de inscripción.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);

    const whatsappMessage = [
      "Hola, quiero inscribirme al Bootcamp Digital Factory 2026.",
      `Nombre: ${formData.nombre}`,
      `Correo: ${formData.email}`,
      `Telefono: ${formData.telefono}`,
      `Motivo de inscripcion: ${formData.mensaje}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setFormData(initialForm);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f5] text-[#1c1c1c]">
      <header className={`sticky top-0 z-50 bg-[#d61f2b] shadow-[0_8px_24px_rgba(86,8,15,0.18)] transition-transform duration-500 ease-in-out will-change-transform ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-10">
          <div className="flex items-center text-white">
            <img
              src="/Logo.png"
              alt="Logo SENA"
              className="h-12 w-14 rounded-md bg-white/10 p-1.5 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)] sm:h-14 sm:w-16"
            />
          </div>

          <NavigationMenu.Root>
            <NavigationMenu.List className="hidden items-center gap-8 md:flex">
              {menuItems.map((item) => (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="rounded-md px-2 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/90 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <a
            href="#inscripcion"
            className="rounded-full border border-white/45 bg-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/15 sm:px-5"
          >
            Inscribirme
          </a>
        </div>
      </header>

      <main id="inicio" className="relative flex flex-col overflow-hidden bg-[#ffffff] text-white">
        <section className="order-1 relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[radial-gradient(circle_at_78%_18%,rgba(244,211,94,0.25),transparent_18%),radial-gradient(circle_at_12%_82%,rgba(220,38,127,0.22),transparent_25%),linear-gradient(135deg,#321047_0%,#702c83_50%,#250733_100%)] px-5 pb-12 pt-10 lg:px-10 lg:pb-16">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(rgba(244,211,94,0.85)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_65%)]" />
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full border border-[#f4d35e]/15 shadow-[0_0_0_30px_rgba(244,211,94,0.025)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="pt-6">
              <div className="mb-7 inline-flex rounded-full border border-white/70 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-700 shadow-sm">
                Bootcamp industrial 2026
              </div>

              <h1 className="mx-auto max-w-2xl text-center text-[3.3rem] font-black uppercase leading-[1.02] tracking-[-0.06em] text-white sm:text-[4.2rem] lg:text-[6.5rem]">
                <span className="mb-3 block text-white">BOOTCAMP</span>
                <span className="mb-3 block whitespace-nowrap text-white">DIGITAL FACTORY</span>
                <span className="block text-3xl text-white sm:text-4xl lg:text-5xl">2026</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                Conecta empresas y talento SENA para transformar retos reales de la industria en soluciones apoyadas en Inteligencia Artificial, automatización y tecnologías digitales.
              </p>

              <div className="mt-10 grid gap-3 border-t border-white/25 pt-6 md:grid-cols-3">
                <div className="rounded-xl bg-white p-4 shadow-[0_12px_24px_rgba(25,3,38,0.12)]">
                  <p className="text-3xl font-black text-[#1d1d1d]">22 y 23</p>
                  <p className="mt-1 text-sm text-[#4b4b4b]">de septiembre <br /> 2026</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-[0_12px_24px_rgba(25,3,38,0.12)]">
                  <p className="text-3xl font-black text-[#1d1d1d]">8:00 a.m.</p>
                  <p className="mt-1 text-sm text-[#4b4b4b]">a 6:00 p.m.</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-[0_12px_24px_rgba(25,3,38,0.12)]">
                  <p className="text-3xl font-black text-[#1d1d1d]">Nodo TIC</p>
                  <p className="mt-1 text-sm text-[#4b4b4b]">Cra. 54 # 68-80 <br /> Barranquilla</p>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-4xl font-black uppercase tracking-[-0.06em] text-white">
                  ¡Vive la experiencia!
                </p>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative h-[min(76vw,420px)] w-[min(76vw,420px)] overflow-hidden rounded-full border-[8px] border-white bg-[#f7ecec] shadow-[0_0_80px_rgba(214,31,43,0.28)] sm:border-[10px]">
                <div
                  className="absolute inset-0 opacity-95"
                  style={{
                    backgroundImage: "url('/Fondo.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(0.75) contrast(1.05) brightness(0.85)",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(48,7,77,0.1),rgba(29,3,47,0.34)),radial-gradient(circle_at_34%_20%,rgba(244,211,94,0.14),transparent_35%)]" />
              </div>
            </div>
          </div>
        </section>

        <section id="informacion" className="order-2 relative bg-[#ffffff] px-5 py-20 text-[#1e1b2d] lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d61f2b]">Información</p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#19151b] sm:text-4xl">
                Una experiencia para innovar con impacto real.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "¿Qué es?",
                  text: "Un espacio de aprendizaje intensivo para explorar la transformación digital aplicada a la industria y la productividad.",
                },
                {
                  title: "¿Para quién?",
                  text: "Dirigido a estudiantes, aprendices, profesionales, empresarios y comunidades tecnológicas interesadas en avanzar con innovación.",
                },
                {
                  title: "¿Qué aprenderás?",
                  text: "Herramientas de IA, automatización, análisis de datos, productividad digital y soluciones con foco industrial.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-xl border border-[#e8e2e4] bg-[#fcfbfa] p-7 shadow-[0_10px_24px_rgba(31,20,26,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(31,20,26,0.08)]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fde6e8] text-xl font-black text-[#d61f2b]">
                    ✓
                  </div>
                  <h3 className="text-xl font-black text-[#19151b]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#514e68]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="order-3 bg-[#f8f7f5] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d61f2b]">Talento SENA</p>
                <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#19151b] sm:text-4xl">
                  Personas que convierten las ideas en acción.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#5d5660]">
                Una comunidad que aprende, colabora y crea soluciones para los retos reales de la industria.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
              <figure className="group relative min-h-[360px] overflow-hidden rounded-xl bg-[#321047] md:min-h-[520px]">
                <img
                  src={eventImages[0].src}
                  alt={eventImages[0].alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160225]/85 to-transparent p-6 pt-20">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Talento que inspira</p>
                  <p className="mt-2 text-xl font-black text-white">Aprender también es construir comunidad.</p>
                </div>
              </figure>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                {eventImages.slice(1).map((image, index) => (
                  <figure key={image.src} className={`group relative min-h-[220px] overflow-hidden rounded-xl bg-[#321047] ${index === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160225]/45 to-transparent" />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="order-5 bg-[#f8f7f5] px-5 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d61f2b]">Beneficios</p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.05em] text-[#1d1d1d] sm:text-4xl">
              Lo que vivirás en Digital Factory.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature} className="rounded-xl border border-[#e8e2e4] bg-white p-6 shadow-[0_10px_24px_rgba(31,20,26,0.05)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d61f2b] text-lg font-black text-white">
                  0{index + 1}
                </div>
                <p className="text-base leading-7 text-[#2a2a2a]">{feature}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section id="inscripcion" className="order-4 border-y border-[#e8e2e4] bg-[#ffffff] px-5 py-16 text-[#1e1b2d] lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#d61f2b]">Inscripción</p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#19151b] sm:text-4xl">
                Inscríbete y sé parte del cambio.
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-[#514e68]">
                Registra tus datos y asegura tu participación en el bootcamp más innovador del año.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-xl border border-[#e8e2e4] bg-[#fcfbfa] p-6 shadow-[0_18px_36px_rgba(31,20,26,0.07)] sm:p-7" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label.Root htmlFor="nombre" className="mb-2 block text-sm font-semibold text-[#2e2a42]">
                    Nombre completo
                  </Label.Root>
                  <input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.nombre)}
                    className="w-full rounded-xl border border-[#dad4ef] bg-[#f7f5ff] px-3 py-2.5 text-[#1e1b2d] outline-none transition focus:border-[#d61f2b] focus:ring-2 focus:ring-[#f9d1d5]"
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-[#d61f2b]">{errors.nombre}</p>}
                </div>

                <div className="sm:col-span-1">
                  <Label.Root htmlFor="telefono" className="mb-2 block text-sm font-semibold text-[#2e2a42]">
                    Teléfono
                  </Label.Root>
                  <input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.telefono)}
                    className="w-full rounded-xl border border-[#dad4ef] bg-[#f7f5ff] px-3 py-2.5 text-[#1e1b2d] outline-none transition focus:border-[#d61f2b] focus:ring-2 focus:ring-[#f9d1d5]"
                    placeholder="300 123 4567"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-[#d61f2b]">{errors.telefono}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Label.Root htmlFor="email" className="mb-2 block text-sm font-semibold text-[#2e2a42]">
                    Correo electrónico
                  </Label.Root>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    className="w-full rounded-xl border border-[#dad4ef] bg-[#f7f5ff] px-3 py-2.5 text-[#1e1b2d] outline-none transition focus:border-[#d61f2b] focus:ring-2 focus:ring-[#f9d1d5]"
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-[#d61f2b]">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Label.Root htmlFor="mensaje" className="mb-2 block text-sm font-semibold text-[#2e2a42]">
                    Mensaje o motivo de inscripción
                  </Label.Root>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.mensaje)}
                    className="min-h-28 w-full rounded-xl border border-[#dad4ef] bg-[#f7f5ff] px-3 py-2.5 text-[#1e1b2d] outline-none transition focus:border-[#d61f2b] focus:ring-2 focus:ring-[#f9d1d5]"
                    placeholder="Cuéntanos qué te interesa del programa..."
                  />
                  {errors.mensaje && <p className="mt-1 text-sm text-[#d61f2b]">{errors.mensaje}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#d61f2b] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#b7101d]"
              >
                Enviar inscripción
              </button>

              {submitted && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  ¡Gracias! Tu inscripción fue enviada correctamente.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-red-200 bg-[#d61f2b] py-10 text-white/90">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3 lg:px-10">
          <div>
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-white">SENA</h3>
            <p className="max-w-xs text-sm leading-6">
              Digital Factory es un espacio de innovación para transformar retos del sector productivo con tecnología, talento y creatividad.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-white">Navegación</h3>
            <div className="flex flex-col gap-2 text-sm">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-white">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Nodo TIC, Barranquilla</li>
              <li>🕘 22 y 23 de septiembre</li>
              <li>📧 digitalfactory@sena.edu.co</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 px-6 pt-5 text-sm text-white/60 lg:px-10">
          © 2026 SENA Digital Factory. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
