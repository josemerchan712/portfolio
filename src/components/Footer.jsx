import { useTranslation } from '../i18n/useTranslation';

export function Footer() {
  const t = useTranslation();

  return (
    <footer>
      <span>© 2026 José María Merchán Martos</span>
      <span>{t.footer.tagline}</span>
    </footer>
  );
}
