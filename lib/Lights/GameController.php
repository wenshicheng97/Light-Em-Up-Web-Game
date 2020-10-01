<?php
/**
 * Main game controller. Handles post from the game page.
 * @author Charles B. Owen
 */

namespace Lights;

/**
 * Main game controller. Handles post from the game page.
 */
class GameController extends Controller {
	/**
	 * GameController constructor.
     * @param Lights $lights Lights object
     * @param array $post $_POST
     */
    public function __construct(Lights $lights, array $post) {
        parent::__construct($lights);

        $game = $lights->getGame();

		// Default will be to return to the game page
		$this->setRedirect("../game.php");

		if(isset($post['check'])) {
            $game->setChecking(true);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
        }

		// Clear any messages
		$lights->setMessage(null);

		// Handle clicks on cells
		if(isset($post['cell'])) {
			$s = explode(',', strip_tags($post['cell']));
			$row = $s[0];
			$col = $s[1];

			$game->click($row, $col);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
//			if($game->solved()) {
//				$this->setRedirect("../solved.php");
//				return;
//			}
		}

		//
		// Clearing logic
		//
		if($game->isClearing()) {
			if(isset($post['yes'])) {
				$game->clear();
			}

			$game->setClearing(false);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
		}

		if(isset($post['clear'])) {
			$game->setClearing(true);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
		}

		//
		// Solving logic
		//
		if($game->isSolving()) {
			if(isset($post['yes'])) {
				$game->solve();
			}

			$game->setSolving(false);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
		}

		if(isset($post['solve'])) {
			$game->setSolving(true);
            $view= new GameView($lights);
            $this->result=json_encode(['ok'=>true,'game'=>$view->present_body()]);
		}
	}

    public function getResult()
    {
        return $this->result;
    }

	private $result=null;
}