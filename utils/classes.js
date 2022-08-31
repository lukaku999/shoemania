import color from "./color";

const classes = {
    section: {
        marginTop: 1,
        marginBottom: 1
    },
    main: {
        marginTop: '6rem',
        minHeight: '80vh'
    },
    smallText: {
        fontSize: '15px'
    },
    footer: {
        backgroundColor: '#203040',
        color: '#ffffff',
        marginTop: '5rem'
    },
    appbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#ffffff',
            marginLeft: 1
        }
    },
    toolbar: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    card: {
        textTransform:' capitalize',
        borderRadius: '30px',
        
    },
    profileImage: {
        borderRadius: '100rem', 
        height: '3rem', 
        width: '3rem'

    },
    availableColor: {
        color: 'green'
    },
    unavailableColor: {
        color: 'red'
    },
    quantityTextField: {
        maxWidth: '6rem',
        minWidth: '5rem'
    },
    textField: {
        backgroundColor: color.primaryColor
    },
    fullWidth: {
        width: '100%'
    },
    sort: {
        marginRight: 1
    },
    visible: {
        display: 'initial'
    },
    hidden: {
        display: 'none'
    },
    searchForm: {
        border: '1px solid #ffffff',
        backgroundColor: '#ffffff',
        borderRadius: 1
    },
    searchInput: {
        paddingLeft: 1,
        color: '#000000',
        '& ::placeholder': {
            color: '#606060'
        }
    },
    searchButton: {
        backgroundColor: color.primaryColor,
        padding: 1,
        borderRadius: '0 5px 5px 0',
        '& span': {
            color: '#000000'
        }
    }
    
}

export default classes 