import SocialGroup from './social_group'

const IndexMain = () => (
  <div className="d-flex justify-content-center align-items-center flex-column" style={{height: '100vh',}}>
    <h1 style={{color: 'white',}}>JIE</h1>
    <h3 style={{ width: '50%', color: 'white', }}>
      Self-learning software and electrical engineering through research &
      development.
    </h3>
    <SocialGroup />
  </div>
)

export default IndexMain
