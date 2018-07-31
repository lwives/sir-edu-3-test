import PageContainer from './PageContainer'
import PageContainerQuemSomos from './PageContainerQuemSomos'
import PageContainerServico from './PageContainerServico'
import PageContainerContato from './PageContainerContato'
import PageContainerTermos from './PageContainerTermos'

export default {
    quemSomos: {
        path: 'quemsomos',
        pathWithoutParam: '/quemsomos',
        component: PageContainerQuemSomos
    },
    servico: {
        path: 'servico',
        pathWithoutParam: '/servico',
        component: PageContainerServico
    },
    contato: {
        path: 'contato',
        pathWithoutParam: '/contato',
        component: PageContainerContato
    },
    termos: {
        path: 'termos',
        pathWithoutParam: '/termos',
        component: PageContainerTermos
    },
    sobre: {
        path: 'sobre',
        pathWithoutParam: '/sobre',
        component: PageContainer
    }
}
