
interface propFooter {
  className:string;
}

function Footer(props: propFooter) {

  return (
    <div className={`${props.className} h-15 flex justify-center`}>
      <p className={`p-2 text-gray-600`} >Desenvolvidor por wvll3f - 2024 </p>
    </div>
  )
}

export default Footer