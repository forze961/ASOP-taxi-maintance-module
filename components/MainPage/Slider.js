import Carousel from 'react-multi-carousel';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const cards = [
    {
        id: 1, name: 'Статистика', url: '/main/2', status: true,
    },
    {
        id: 2, name: 'Рухомий склад КПТ', url: '/main/3', status: true,
    },
    {
        id: 3, name: 'Турнікети КПТ', url: '/main/5', status: true,
    },
    {
        id: 5, name: 'Турнікети Метро', url: '/main/6', status: true,
    },
    {
        id: 6, name: 'Аларми', url: '/main/8', status: true,
    },
    {
        id: 7, name: 'Адміністрування', url: '/main/9', status: true,
    },
];

function CarouselBlock({ deviceType, classes }) {
    const { enqueueSnackbar } = useSnackbar();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };
    return (
        <>
            <Carousel
                /*
                swipeable={false}
                draggable={false}
                */
                responsive={responsive}
                ssr
                infinite
                containerClass="first-carousel-container container"
                deviceType={deviceType}
                renderButtonGroupOutside
                renderDotsOutside
                autoPlaySpeed={3000}
                autoPlay
            >
                {cards.map((card) => (
                    <Link href={card.status ? card.url : '#'}>
                        <Card
                            className={classes.card.id}
                            style={{ margin: '0 20px 0 50px', cursor: 'pointer' }}
                            onClick={() => { if (!card.status) { enqueueSnackbar('Функціонал у розробці.', { variant: 'warning' }); } }}
                        >
                            <CardMedia
                                className={classes.cardMedia}
                                image={`/images/carousel/${card.id}.png`}
                                title={card.name}
                            />
                            <CardActions>
                                <Button size="small" color="primary">
                                    {card.name}
                                </Button>
                                <img src="/images/carousel/arrow.png" style={{ maxHeight: 15 }} alt="allSuccess" align="right" />
                            </CardActions>
                        </Card>
                    </Link>
                ))}
            </Carousel>
        </>
    );
}

export default CarouselBlock;
