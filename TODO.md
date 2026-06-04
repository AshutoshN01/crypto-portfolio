# TODO - CryptoDashboard -> Crypto Portfolio updates

- [ ] Rename app title/logo text from "CryptoDashboard" to "Crypto Portfolio" in Navbar/sidebar (AppShell + any other occurrences).
- [ ] Update PortfolioDetailPage:
  - [ ] Add Buy button + modal with coin dropdown, quantity, purchase price.
  - [ ] Add Sell button per holding + modal with quantity (validate <= owned).
  - [ ] Add Delete button per holding (already has delete via trash; convert to explicit Delete control).
  - [ ] Improve holdings table columns (Coin Name, Symbol, Quantity, Buy Price, Current Price, Profit/Loss).
  - [ ] Replace manual Add holding fields (CoinGecko ID/Symbol/Name) with dropdown from the provided popular coin list + quantity + buy price.
  - [ ] Ensure UI falls back to buy price when current price missing.
- [ ] Ensure totals recalculate immediately after Buy/Sell/Add/Delete using existing react-query mutations (invalidate queries).
- [ ] Fix TypeScript issues.
- [ ] Run `npm run build` in frontend and fix any build errors.
- [ ] Report modified files and changes; confirm build success.

