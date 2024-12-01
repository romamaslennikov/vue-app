export default function gtm(data) {
  window.dataLayer?.push({
    event: 'eventTracking',
    action: data[1],
    category: data[0],
    label: data[2],
  });
}
